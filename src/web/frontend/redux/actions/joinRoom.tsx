import { JOIN_ROOM } from '../constants';
import { JwtPayload, RoomData } from '../../../common/helpers';

export const joinRoom = (room: RoomData, user: JwtPayload) => ({
    type: JOIN_ROOM,
    payload: {
        room,
        user
    }
});
