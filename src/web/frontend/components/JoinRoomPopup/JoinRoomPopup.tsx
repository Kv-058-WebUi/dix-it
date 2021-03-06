import React, { useEffect } from 'react';
import ModalWindow from "../ModalWindow/ModalWindow";
import './join-room-popup.scss';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import { RoomData } from '../../../common/helpers';
import { UserData } from '../UserProvider/UserProvider';

type JoinRoomPopupProps = {
  user: UserData | null;
  onJoinModalUpdate: (isClosed: boolean, room: RoomData) => void;
}

export default function JoinRoomPopup(props: JoinRoomPopupProps) {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [roomData, setRoomData] = React.useState<RoomData | undefined>(undefined);

  const formHeight = 'auto';
  const formWidth = '435px';
  const urlParams = useParams<{ room_code: string }>();
  const room_code = urlParams.room_code;

  useEffect(() => {
    axios.get(`/api/rooms/${room_code}`)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          const resData = response.data as RoomData;
          const waitingStatus = 2;

          if(resData.status_code !== waitingStatus) {
            setError('Game already started.');
          } else if(resData.active_players == resData.max_players) {
            setError('Room is filled.');
          } else {
            setRoomData(resData);

            const isCreator = props.user && (resData.creator.player_id === props.user.player_id);
            if(resData.is_private === false || isCreator) {
              props.onJoinModalUpdate(true, resData);
            }
          }
        }
      }).catch((error) => {
        console.log(error);
        setError('Oh Noes! Something went wrong :(');
      });
  }, [props.user]);

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    axios.post('/api/rooms/join', { room_code, password })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else if(roomData) {
            props.onJoinModalUpdate(true, roomData);
        }
      }).catch((error) => {
        console.log(error);
        setError('Oh Noes! Something went wrong :(');
      });
  }

  return (
    <ModalWindow
      modalWindowType='join-room'
      windowHeight={formHeight}
      windowWidth={formWidth}
      isContentCentered={false}>
      { roomData ?
      <React.Fragment>
        <div className="join-room-popup__room-name">{roomData.name}</div>
        <form action={`/game/${room_code}`} onSubmit={handleSubmit}>
          <label className={'join-room-popup__label'} htmlFor='room-password'>Password:</label>
          <input onChange={handlePassword} value={password} required type='password' className='join-room-popup__text-field' id='room-password' />
          <div className="join-room-popup__error">{error}</div>
          <div className="join-room-popup_btn-wrap">
            <input type="submit" name="#room_code" id="Submit" value="Join Room" className='join-room-popup__btn' />
            <Link to='/lobby'><button className='join-room-popup__btn'>Go to Lobby</button></Link>
          </div>
        </form>
      </React.Fragment>
      : (
        error ?
        <React.Fragment> 
          <div className="join-room-popup__error">{error}</div>
          <div className="join-room-popup_btn-wrap">
            <button onClick={()=>{location.href='/lobby'}} className='join-room-popup__btn'>Go to Lobby</button>
          </div>
        </React.Fragment>
        : '')
      }
    </ModalWindow>
  );
};

