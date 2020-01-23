import { RELOAD_PLAYER } from '../constants';
import jwt_decode from 'jwt-decode';
import { JwtPayload } from '../../../backend/authentication/helpers';

export const reloadPlayer = () => {
    const token = localStorage.getItem('jwt_token');
    let player_id = undefined;
    
    if(token) {
        const decoded = jwt_decode(token) as JwtPayload;
        player_id = decoded.player_id
    }

    return {
        type: RELOAD_PLAYER,
        payload: {
            player_id
        }
    }
};
