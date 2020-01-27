import * as express from 'express';
import { getRepository, getConnection, In } from 'typeorm';
import Controller from '../interfaces/controller.interface';
import { Room } from '../entities/Room';
import CreateRoomDto from '../dto/room.dto';
import { RoomStatus } from '../entities/RoomStatus';
import passport from 'passport';
import crypto from 'crypto';
import { RoomPlayer } from '../entities/RoomPlayers';
import { Player } from '../entities/Player';
import { uniqueNamesGenerator, Config as NamesConfig, adjectives, colors } from 'unique-names-generator';
import countries from '../helpers/countries-dictionary';
import { ROOM_STATUSES, RoomData, JwtPayload } from '../../common/helpers/';

export default class RoomController implements Controller {
    public path = '/rooms';
    public router = express.Router();
    private roomRepository = getRepository(Room);
    private roomStatusRepository = getRepository(RoomStatus);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllRooms);
        this.router.post(this.path, this.createRoom);
        this.router.get(`${this.path}/random`, this.randomRoom);
        this.router.get(`${this.path}/:room_code`, this.getRoomByCode);
        this.router.post(`${this.path}/join`, this.joinRoom);
    }

    private joinRoom = async (request: express.Request, response: express.Response) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (!err && !info) {
                const { room_code, password } = request.body;
                const room = await this.roomRepository.findOne({ room_code });

                if (!room) {
                    response.send({ error: 'Room not found.' });
                    return;
                } else if (room.is_private && room.password !== password) {
                    response.send({ error: 'Invalid password.' });
                    return;
                }

                getRepository(RoomPlayer).save({
                    room_id: room.room_id,
                    player_id: user.player_id,
                    points: 0
                });

                response.send();
            } else {
                response.send({ error: 'Invalid credentials.' });
            }
        })(request, response);
    };

    private createRoom = async (request: express.Request, response: express.Response) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (!err && !info) {
                let jwtPayload : JwtPayload = user;
                const room_seed = Math.random() + (new Date()).getMilliseconds();
                const room_code = crypto.createHash('md5')
                    .update(jwtPayload.nickname + room_seed)
                    .digest('hex');
                const postData: CreateRoomDto = {
                    ...request.body,
                    creator_id: jwtPayload.player_id,
                    status: 2,
                    room_code
                }; //Data from createRoom form
              
                // const status = "find by id"
              
                const newRoom = this.roomRepository.create(postData);
                await this.roomRepository.save(newRoom);
                response.send(newRoom);
            } else {
                response.send({ error: 'NO' });
            }
        })(request, response);
    };

    private randomRoom = async (request: express.Request, response: express.Response) => {
        passport.authenticate('jwt', { session: false }, async (err, user: JwtPayload, info) => {
            if (!err && !info) {
                const rooms = await this.roomRepository.find({ where: { status: 2, is_private: false } });
                let room_code: string;
                let availableRooms: Room[] = [];

                if(rooms.length > 0) {
                    const roomIds = rooms.map(room => room.room_id);
                    const roomsPlayers = await getRepository(RoomPlayer).find({ where: { room_id: In(roomIds) } });

                    availableRooms = rooms.filter(room => {
                        let roomPLayers = roomsPlayers.filter(roomPlayer => roomPlayer.room_id == room.room_id);
                        return roomPLayers.length < room.max_players;
                    });
                }

                if(availableRooms.length > 0) {
                    const roomIndex = Math.floor(Math.random() * rooms.length);
                    room_code = rooms[roomIndex].room_code;
                } else {
                    //if no available room found create a new one
                    const room_seed = Math.random() + (new Date()).getMilliseconds();
                    room_code = crypto.createHash('md5')
                        .update(user.nickname + room_seed)
                        .digest('hex');
                    const creator = await getRepository(Player).findOne({ player_id: user.player_id });
                    const roomStatus = await getRepository(RoomStatus).findOne({ code: ROOM_STATUSES.WAITING });

                    if (!creator || ! roomStatus) {
                        return;
                    }

                    const roomName = uniqueNamesGenerator({
                        dictionaries: [adjectives, countries],
                        separator: ' ',
                        length: 2,
                        style: 'capital'
                    });

                    const newRoom = this.roomRepository.create({
                        name: roomName,
                        max_players: 5,
                        creator_id: creator,
                        is_private: false,
                        status: roomStatus,
                        room_code
                    });

                    await this.roomRepository.save(newRoom);
                }
                response.send({ room_code });
            } else {
                console.log(err, info)
                response.send({ error: 'No luck. Try again :(' });
            }
        })(request, response);
    };

    private getAllRooms = async (request: express.Request, response: express.Response) => {
        const rooms = await this.roomRepository
            .find({ where: { status: 2 } });
        const beatyRooms: CreateRoomDto[] = rooms.map(room => {
            const { creator_id, name, room_code, max_players, is_private, status, room_id } = room;
            return Object.assign({}, { room_id, creator_id: { player_id: creator_id.player_id, nickname: creator_id.nickname }, name, room_code, max_players, is_private, status: { code: status.code } })
        });
        response.send(beatyRooms)
    };

    private getRoomByCode = async (request: express.Request, response: express.Response) => {
        const { room_code } = request.params;
        const room = await this.roomRepository.findOne({ room_code });

        if (!room) {
            response.send({ error: 'Room not found' });
            return;
        }

        const roomPlayers = await getRepository(RoomPlayer).find({ where: { room_id: room.room_id } });

        const roomData : RoomData = {
            room_code: room.room_code,
            name: room.name,
            max_players: room.max_players,
            active_players: roomPlayers.length,
            is_private: room.is_private,
            creator: {
                player_id: room.creator_id.player_id,
                nickname: room.creator_id.nickname
            },
            status_code: room.status.code
        };

        response.send(roomData)
    };

    private modifyRoom = async (request: express.Request, response: express.Response) => {
        const finished = await this.roomStatusRepository
            .createQueryBuilder('roomStatus')
            .where('roomStatus.code = :code', { code: 3 }) //status "finished"
            .getOne();

        await getConnection()
            .createQueryBuilder()
            .update(Room)
            .set({
                timestamp: new Date(),
                status: finished,
            })
            .where('room_id = :id', { id: request.params.id })
            .execute()
    }
}
