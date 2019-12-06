import * as express from 'express';
import {getRepository, getConnection} from 'typeorm';
import Controller from '../interfaces/controller.interface';
import {Room} from '../entities/Room';
import CreateRoomDto from '../dto/room.dto';
import { RoomStatus } from '../entities/RoomStatus';

export default class RoomController implements Controller{
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
    }

    private createRoom = async (request: express.Request, response: express.Response) => {
        const postData: CreateRoomDto = request.body //Data from createRoom form
        // const status = "find by id"       
        const newRoom = this.roomRepository.create(postData);       
        await this.roomRepository.save(newRoom);
        response.send(newRoom);
    }

    private getAllRooms = async (request: express.Request, response: express.Response) => {
        const rooms = await this.roomRepository
        .find({where: {status: 2}})
        const beatyRooms: CreateRoomDto[] = rooms.map(room => {
            const {creator_id, name, max_players, is_private, status} = room;
            return Object.assign({}, {creator_id: {player_id: creator_id.player_id}, name, max_players, is_private, status: {code: status.code}})
        })  
        response.send(beatyRooms)
    }

    private modifyRoom = async (request: express.Request, response: express.Response) => {
        const finished = await this.roomStatusRepository
        .createQueryBuilder('roomStatus')
        .where('roomStatus.code = :code', {code: 3}) //status "finished"
        .getOne();

        await getConnection()
        .createQueryBuilder()
        .update(Room)
        .set({
            timestamp: new Date(),
            status: finished,
        })
        .where('room_id = :id', {id: request.params.id})
        .execute()
    }

}