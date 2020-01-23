import SocketIO from "socket.io";
import { JwtPayload } from "../authentication/helpers";
import { RoomPlayer } from "../entities/RoomPlayers";
import { Room } from "../entities/Room";
import { getRepository, In } from "typeorm";
import { RoomStatus } from "../entities/RoomStatus";
import welcomeDict from '../helpers/chat-welcome-dictionary';
import { Card } from "../entities/Card";
import * as reduxActions from '../../frontend/redux/constants';
import { Player } from "../entities/Player";
import { ROOM_STATUSES, RoomData, turnTimeMs, shuffle } from "../../common/helpers";

interface Message {
    id: number,
    creator: string,
    content: string
    timestamp: string,
    isBotMessage: boolean,
}

interface cardMessage {
    card_id: number;
    card_path: string;
}

interface roundCard {
    card: cardMessage,
    player: GamePlayer,
    voters: Array<GamePlayer>
}

interface GamePlayer {
    socketId: string,
    points: number,
    jwtData: JwtPayload,
    cards: Array<Card>,
    inGame: boolean,
    color: string,
}

interface Game {
    roundCards: Array<roundCard>,
    deck: Array<Card>,
    room: Room,
    players: Array<GamePlayer>,
    chat: Array<Message>,
    storyteller?: GamePlayer,
}

async function getRoomStatusRecordByCode(code: number): Promise<RoomStatus> {
    const roomStatusRepository = getRepository(RoomStatus);

    let statusRecord = await roomStatusRepository.findOne({ code });
    if (!statusRecord) {
        statusRecord = roomStatusRepository.create({ code, status: ROOM_STATUSES[code] });
        await roomStatusRepository.save(statusRecord);
    }
    return statusRecord;
}

function mapPlayer(player: GamePlayer) {
    return {
        img: '/images/avatars/' + player.jwtData.profile_picture,
        score: player.points,
        name: player.jwtData.nickname,
        player_id: player.jwtData.player_id,
        inGame: player.inGame,
        color: player.color
    }
}

const PLayerColors: Array<string> = [
    'red',
    'blue',
    'teal',
    'purple',
    'yellow',
    'orange',
    'green'
];

const delayBetweenRoundsMs = 6000;

export default class SocketController {
    private socket!: SocketIO.Server;
    private games: Array<Game> = [];
    private onlineUsersCounter: number = 0;
    private timer?: NodeJS.Timeout;

    private getGameByClient(client: SocketIO.Socket): Game | undefined {
        const game = this.games.find(game => {
            return game.players.some(player => player.socketId === client.id)
        });
        return game;
    }

    private onChatOpen(client: SocketIO.Socket) {
        const game = this.getGameByClient(client);
        if (game) {
            client.emit('chatHistory', game.chat);
        }
    }

    private generateChatBotMessage(player: GamePlayer, type: string): Message {
        let msg: Message = {
            id: 0,
            creator: 'ChatBot',
            timestamp: new Date(Date.now()).toISOString(),
            content: '',
            isBotMessage: true
        };

        if (type === 'welcome') {
            let seed = Math.floor(Math.random() * welcomeDict.length);
            msg.content = welcomeDict[seed].split('[!!{username}!!]').join(player.jwtData.nickname) + ' 😜';
        } else if (type === 'bye') {
            msg.content = player.jwtData.nickname + ' has left the game. 😔';
        }
        return msg;
    }

    private updatePlayers(game: Game) {
        const payload = {
            players: game.players.map(mapPlayer)
        };
        this.socket.to(game.room.room_code).emit(reduxActions.UPDATE_PLAYERS, payload);
    }

    private updateUsersCounter() {
        this.socket.emit(reduxActions.UPDATE_USER_COUNTER, { onlineUsersCounter: this.onlineUsersCounter })
    }

    private async joinRoom(client: SocketIO.Socket, payload: { room: RoomData, user: JwtPayload | null }) {
        const room_code = payload.room.room_code;
        let game = this.games.find(game => game.room.room_code === room_code);

        if (!game) {
            const room = await getRepository(Room).findOne({ room_code: room_code });

            if (room) {
                const deck = await getRepository(Card).find();
                game = {
                    room,
                    deck,
                    roundCards: [],
                    players: [],
                    chat: []
                };
                this.games.push(game);
            }
        }

        if (game && payload.user) {
            const gamePlayer = game.players.find(player => player.jwtData.player_id == payload.user?.player_id);
            const isInGame = gamePlayer !== undefined;

            if (gamePlayer && gamePlayer.socketId != client.id) {
                gamePlayer.socketId = client.id;
                gamePlayer.inGame = true;
                client.join(room_code);
            }

            if (!isInGame) {
                const player = {
                    points: 0,
                    cards: [],
                    jwtData: payload.user,
                    socketId: client.id,
                    inGame: true,
                    color: PLayerColors[game.players.length]
                };
                const joinMessage = this.generateChatBotMessage(player, 'welcome');

                client.join(room_code);
                game.players.push(player);
                game.chat.push(joinMessage);
                this.socket.to(game.room.room_code).emit('new chat msg', joinMessage);
            }
            this.updatePlayers(game);
            this.onChatOpen(client);
        }
    }

    private onDisconnect(client: SocketIO.Socket) {
        console.log('user disconnected');

        this.onlineUsersCounter--;
        this.updateUsersCounter();

        this.onLeaveGame(client);
    }

    private onLeaveGame(client: SocketIO.Socket) {
        const game = this.getGameByClient(client);

        if (game) {
            const gamePlayer = game.players.find(player => player.socketId === client.id);

            if (gamePlayer) {
                const message = this.generateChatBotMessage(gamePlayer, 'bye');

                game.players = game.players.filter(player => player !== gamePlayer);
                gamePlayer.inGame = false;
                game.chat.push(message);
                this.socket.to(game.room.room_code).emit('new chat msg', message);
                this.updatePlayers(game);

                const activePlayers = game.players.filter(player => player.inGame);

                if (activePlayers.length < 3 && game.room.status.code == ROOM_STATUSES.STARTED) {
                    this.endGame(game);
                }
            }
        }
    }

    private async endGame(game: Game) {
        const roomPLayerRepository = getRepository(RoomPlayer);

        this.socket.to(game.room.room_code).emit(reduxActions.GAME_OVER);

        game.room.status = await getRoomStatusRecordByCode(ROOM_STATUSES.FINISHED);
        await getRepository(Room).save(game.room);

        for (const player of game.players) {
            const playerRecord = await getRepository(Player).findOne({ player_id: player.jwtData.player_id });

            if (playerRecord) {
                await roomPLayerRepository.insert({
                    player_id: playerRecord,
                    room_id: game.room.room_id,
                    points: player.points
                });
            }
        }
    }

    private onRequestPlayers(client: SocketIO.Socket) {
        const game = this.getGameByClient(client);
        if (game) {
            this.updatePlayers(game);
        }
    }

    private onChatMessage(client: SocketIO.Socket, msg: Message) {
        const game = this.getGameByClient(client);

        if (game) {
            //IDDQD activated
            if (msg.content === 'iddqd') {
                game.chat = [];
                this.socket.to(game.room.room_code).emit('chatHistory', game.chat);
            } else if (msg.content === '/addbot') {
                const gamePlayer = game.players.find(player => player.socketId === client.id);
                const isCreator = gamePlayer && (gamePlayer.jwtData.player_id == game.room.creator_id.player_id);
                if (isCreator) {
                    this.addBot(game);
                }
            } else {
                game.chat.push(msg);
                client.broadcast.to(game.room.room_code).emit('new chat msg', msg);
            }
        }
    }

    private onWordSubmit(client: SocketIO.Socket, payload: { word: string }) {
        const game = this.getGameByClient(client);
        if (game) {
            this.socket.to(game.room.room_code).emit(reduxActions.UPDATE_WORD, payload);
            if (this.timer) {
                clearTimeout(this.timer);
                this.pickCardTurn(game);
            }
        }
    }

    private onCardSubmit(client: SocketIO.Socket, payload: { card: cardMessage }) {
        const game = this.getGameByClient(client);

        if (game) {
            const gamePlayer = game.players.find(player => player.socketId === client.id);

            if (gamePlayer) {
                game.roundCards.push({ card: payload.card, player: gamePlayer, voters: [] });
                gamePlayer.cards = gamePlayer.cards.filter(playerCard => playerCard.card_id != payload.card.card_id);
                this.socket.to(gamePlayer.socketId).emit(reduxActions.SET_HAND_CARDS, { handCards: gamePlayer.cards });
                this.socket.to(game.room.room_code).emit(reduxActions.SUBMITTED_CARDS_COUNTER, { submittedCardsCounter: game.roundCards.length });

                const activePlayers = game.players.filter(player => player.inGame);
                const isTurnComplete = game.roundCards.length === activePlayers.length;

                if (isTurnComplete && this.timer) {
                    clearTimeout(this.timer);
                    this.voteCardTurn(game);
                }
            }
        }
    }

    private onCardVote(client: SocketIO.Socket, payload: { card: cardMessage }) {
        const game = this.getGameByClient(client);

        if (game) {
            const gamePlayer = game.players.find(player => player.socketId === client.id);

            if (gamePlayer) {

                const gameCard = game.roundCards.find(roundCard => roundCard.card.card_id === payload.card.card_id);

                if (gameCard) {
                    gameCard.voters.push(gamePlayer);

                    const activePlayers = game.players.filter(player => player.inGame);
                    const votedPlayersCounter = game.roundCards.reduce((votes, card) => votes + card.voters.length, 0);
                    const isTurnComplete = activePlayers.length - 1 === votedPlayersCounter;

                    if (isTurnComplete && this.timer) {
                        clearTimeout(this.timer);
                        this.endRound(game);
                    }
                }
            }
        }
    }

    private async onStartGame(client: SocketIO.Socket) {
        const game = this.getGameByClient(client);
        const roomStatus = await getRepository(RoomStatus).findOne({ code: ROOM_STATUSES.STARTED });

        if (game && roomStatus) {
            game.room.status = roomStatus;
            await getRepository(Room).save(game.room);
            shuffle(game.deck);
            game.players.forEach(player => {
                const handCards = game.deck.splice(0, 6);
                player.cards = handCards;
                this.socket.to(player.socketId).emit(reduxActions.SET_HAND_CARDS, { handCards });
            });
            this.socket.to(game.room.room_code).emit(reduxActions.GAME_STARTED);
            this.startRound(game);
        }
    }

    private startRound(game: Game, skipped: boolean = false) {
        this.socket.to(game.room.room_code).emit(reduxActions.SET_ROUND_CARDS, { roundCards: [] });

        game.roundCards = [];

        if (!skipped) {
            game.players.forEach(player => {
                if (player.cards.length < 7) {
                    const card = game.deck.pop();
                    if (card) {
                        player.cards.push(card);
                        this.socket.to(player.socketId).emit(reduxActions.SET_HAND_CARDS, { handCards: player.cards });
                    }
                }
            });
        }

        if (!game.storyteller) {
            game.storyteller = game.players[0];
        } else {
            const storytellerIndex = game.players.findIndex(player => player === game.storyteller);
            game.storyteller = game.players[storytellerIndex + 1] ?
                game.players[storytellerIndex + 1] :
                game.players[0];
        }
        this.socket.to(game.room.room_code).emit(reduxActions.SUBMITTED_CARDS_COUNTER, { submittedCardsCounter: 0 });
        this.socket.to(game.room.room_code).emit(reduxActions.START_ROUND, { storyteller: mapPlayer(game.storyteller) });
        this.socket.to(game.room.room_code).emit(reduxActions.START_TIMER);

        this.timer = setTimeout(() => {
            this.pickCardTurn(game);
        }, turnTimeMs);
    }

    private pickCardTurn(game: Game) {
        this.socket.to(game.room.room_code).emit(reduxActions.STOP_TIMER);

        if (game.roundCards.length === 0) {
            return this.startRound(game, true);
        }

        this.socket.to(game.room.room_code).emit(reduxActions.SUBMITTED_CARDS_COUNTER, { submittedCardsCounter: 1 });
        this.socket.to(game.room.room_code).emit(reduxActions.TIME_TO_PICK);
        this.socket.to(game.room.room_code).emit(reduxActions.START_TIMER);

        this.timer = setTimeout(() => {
            this.voteCardTurn(game);
        }, turnTimeMs);
    }

    private voteCardTurn(game: Game) {
        const roundCards = game.roundCards.map(card => card.card);
        
        if (game.roundCards.length === 1) {
            const card = game.deck.pop();
            if (card && game.storyteller) {
                game.storyteller.cards.push(card);
                this.socket.to(game.storyteller.socketId).emit(reduxActions.SET_HAND_CARDS, { handCards: game.storyteller.cards });
                this.socket.to(game.room.room_code).emit(reduxActions.SET_ROUND_CARDS, { roundCards });
            }
            return this.endRound(game);
        }

        shuffle(roundCards);
        this.socket.to(game.room.room_code).emit(reduxActions.STOP_TIMER);
        this.socket.to(game.room.room_code).emit(reduxActions.SET_ROUND_CARDS, { roundCards });
        this.socket.to(game.room.room_code).emit(reduxActions.TIME_TO_VOTE);
        this.socket.to(game.room.room_code).emit(reduxActions.START_TIMER);

        this.timer = setTimeout(() => {
            this.endRound(game);
        }, turnTimeMs);
    }

    private endRound(game: Game) {
        const votes = game.roundCards.map(roundCard => {
            return {
                card: roundCard.card,
                voters: roundCard.voters.map(mapPlayer),
                player: mapPlayer(roundCard.player)
            }
        });
        const votedPlayersCounter = game.roundCards.reduce((votes, card) => votes + card.voters.length, 0);
        const onlyStorytellerPlayed = game.roundCards.length === 1 && game.storyteller;

        this.socket.to(game.room.room_code).emit(reduxActions.STOP_TIMER);
        this.socket.to(game.room.room_code).emit(reduxActions.SET_VOTES, { votes });

        if (votedPlayersCounter == 0 || game.roundCards.length === 1) {
            if (game.storyteller) {
                game.storyteller.points += 1;
            }
        } else {
            let storytellerCard = game.roundCards.find(card => card.player === game.storyteller);
            let correctFinds = storytellerCard ? storytellerCard.voters.length : 0;
            let storytellerLose = false;

            if (correctFinds == 0 || correctFinds == (game.players.length - 1)) {
                if (game.roundCards.length > 1 && votedPlayersCounter > 0) {
                    storytellerLose = true;
                }
            } else if (game.storyteller) {
                game.storyteller.points += 3;
            }

            game.players.forEach((player) => {
                const playerCard = game.roundCards.find(card => card.player === player);
                if (player !== game.storyteller && playerCard) {
                    player.points += playerCard ? playerCard.voters.length : 0;

                    if (storytellerLose) {
                        player.points += 2;
                    } else if (storytellerCard && storytellerCard.voters.includes(player)) {
                        player.points += 3;
                    }
                }
            });
        }

        this.updatePlayers(game);

        const playersWithNoCards = game.players.filter(player => player.cards.length === 0);
        const isEnoughCards = game.deck.length >= game.players.length;
        const isWinner = game.players.some(player => player.points >= 30);
        const isGameOver = isWinner || (playersWithNoCards.length > 0 && !isEnoughCards);

        setTimeout(() => {
            if (isGameOver) {
                this.endGame(game);
            } else {
                this.startRound(game);
            }
        }, delayBetweenRoundsMs);
    }

    private addBot(game: Game) {
        if(game.players.length < game.room.max_players) {
            //add bot
        }
    }

    public initializeSocket(socket: SocketIO.Server) {
        this.socket = socket;
        let context = this;
        
        socket.on('connection', (client: SocketIO.Socket) => {
            console.log('a user connected');

            client.on('disconnect', (payload) => { this.onDisconnect(client) });
            client.on(reduxActions.JOIN_ROOM, (payload) => { this.joinRoom(client, payload) });
            client.on(reduxActions.CHAT_OPEN, (payload) => { this.onChatOpen(client) });
            client.on(reduxActions.REQUEST_PLAYERS, (payload) => { this.onRequestPlayers(client) });
            client.on(reduxActions.SUBMIT_WORD, (payload) => { this.onWordSubmit(client, payload) });
            client.on(reduxActions.SUBMIT_CARD, (payload) => { this.onCardSubmit(client, payload) });
            client.on(reduxActions.VOTE_CARD, (payload) => { this.onCardVote(client, payload) });
            client.on(reduxActions.START_GAME, (payload) => { this.onStartGame(client) });
            client.on(reduxActions.LEAVE_ROOM, (payload) => { this.onLeaveGame(client) });
            client.on('send chat msg', (payload) => { this.onChatMessage(client, payload) });

            this.onlineUsersCounter++;
            this.updateUsersCounter();
        });
    }
}