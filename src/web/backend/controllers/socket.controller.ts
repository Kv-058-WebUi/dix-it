import SocketIO from "socket.io";
import { JwtPayload } from "../authentication/helpers";
import { RoomPlayer } from "../entities/RoomPlayers";
import { Room } from "../entities/Room";
import { getRepository } from "typeorm";
import { Player } from "../entities/Player";
import { RoomStatus } from "../entities/RoomStatus";
import welcomeDict from '../helpers/chat-welcome-dictionary'; 

interface Message {
    id: number,
    creator: string,
    content: string
    timestamp: string,
    isBotMessage: boolean,
}

interface GamePlayer {
    id: string,
    points: number,
    player: Player,
    jwtData: JwtPayload,
}
interface Game {
    room: Room,
    players: Array<GamePlayer>,
    chat: Array<Message>
}

const games: Array<Game> = [];

async function getDefaultGame(): Promise<Game> {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (games.length) {
                resolve(games[0]);
            }
        }, 100);
    });
}

function generateChatBotMessage(player: Player, type: string): Message {
    let msg: Message = {
        id: 0,
        creator: 'ChatBot',
        timestamp: new Date(Date.now()).toISOString(),
        content: '',
        isBotMessage: true
    };

    if (type === 'welcome') {
        let seed = Math.floor(Math.random() * welcomeDict.length);
        msg.content = welcomeDict[seed].split('[!!{username}!!]').join(player.nickname) + ' 😜';
    } else if (type === 'bye') {
        msg.content = player.nickname + ' has left the game. 😔';
    }
    return msg;
}
export default class SocketController {

    public initializeSocket(socket: SocketIO.Server) {
        socket.on('connection', this.userConnection);
    }

    private userConnection(client: SocketIO.Socket) {
        console.log('a user connected');

        client.on('game page open', async (user: JwtPayload | null) => {
            console.log('Game page open!! BE');

            if (!user) {
                return;
            }

            let game = games[0];

            if (!game) {

                let creator = await getRepository(Player).findOne({ player_id: user.player_id });

                if (!creator) {
                    return;
                }

                let roomStatus = getRepository(RoomStatus).create({ code: 1, status: 'awaiting players' });

                let room = getRepository(Room).create({
                    name: 'some room',
                    max_players: 7,
                    creator_id: creator,
                    is_private: false,
                    status: roomStatus
                });

                game = {
                    room,
                    players: [{ id: client.id, player: creator, points: 0, jwtData: user }],
                    chat: [generateChatBotMessage(creator, 'welcome')]
                };

                client.join(game.room.name);
                games.push(game);
            } else {
                client.join(game.room.name);

                let player = game.players.find(function (player) {
                    return player.id === client.id;
                })

                if (!player) {
                    let playerRecord = await getRepository(Player).findOne({ player_id: user.player_id });

                    if (!playerRecord) {
                        return;
                    }

                    game.players.push({ id: client.id, player: playerRecord, points: 0, jwtData: user });

                    let message = generateChatBotMessage(playerRecord, 'welcome');
                    game.chat.push(message);
                    client.emit('user entered', user);
                    client.broadcast.to(game.room.name).emit('user entered', user);
                    client.broadcast.to(game.room.name).emit('new chat msg', message);
                }
            }
        });
        client.on('chat open', async () => {
            let game = await getDefaultGame();
            client.emit('chatHistory', game.chat);
        });

        client.on('disconnect', async () => {
            console.log('user disconnected');

            let game = await getDefaultGame();

            let gamePlayer = game.players.find(function (player) {
                return player.id === client.id;
            })

            if (!gamePlayer) {
                return;
            }

            let message = generateChatBotMessage(gamePlayer.player, 'bye');
            game.chat.push(message);
            client.broadcast.to(game.room.name).emit('new chat msg', message);
            client.emit('user left', gamePlayer.jwtData);
            client.broadcast.to(game.room.name).emit('user left', gamePlayer.jwtData);
        });
        client.on('send chat msg', chatMessage);

        async function chatMessage(msg: Message) {
            console.log('chat msg received');
            console.log(msg);
            let game = await getDefaultGame();

            //IDDQD activated
            if(msg.content === 'iddqd') {
                game.players = [];
                game.chat = [];
                client.emit('chatHistory', game.chat);
                client.broadcast.to(game.room.name).emit('chatHistory', game.chat);
                return;
            }

            game.chat.push(msg);
            client.broadcast.to(game.room.name).emit('new chat msg', msg);
        }
    }

}