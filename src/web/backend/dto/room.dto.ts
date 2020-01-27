import CreatePlayerDto from "./player.dto";
import CreateRoomStatusDto from "./roomStatus.dto";

export default class CreateRoomDto {
    public name!: string;
    public max_players!: number;
    public creator_id!: CreatePlayerDto;
    public is_private!: boolean;
    public password?: string;
    public status!: CreateRoomStatusDto;
}