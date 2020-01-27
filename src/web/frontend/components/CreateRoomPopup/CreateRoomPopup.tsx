import React from 'react';
import { Link } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme, createStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ModalWindow from "../ModalWindow/ModalWindow";
import './create-room-popup.scss';
import axios from "axios";
import UserProvider from '../UserProvider/UserProvider';
import { RoomData } from '../../../common/helpers';

export default function CreateRoomPopup() {

  const formHeight = 'auto';
  const formWidth = '435px';

  const myTheme = createMuiTheme({
    overrides: {
      MuiMenuItem: createStyles({
        root: {
          '&&:hover': {
            backgroundColor: 'pink',
            color: 'white'
          }
        },
      }),
      MuiSelect: createStyles({
        root: {
          backgroundColor: 'white',
          fontWeight: 'bold',
          '&&:focus': {
            backgroundColor: 'white',
          }
        },
        select: {
          borderRadius: 10,
          '&&:focus': {
            borderRadius: 10,
          }
        },
        icon: {
          color: 'black',
        },
        iconFilled: {
          right: 0,
        }
      }),
      MuiFilledInput: createStyles({
        root: {
          backgroundColor: 'transparent',
          '&&:hover': {
            backgroundColor: 'transparent',
          },
          '&$focused': {
            backgroundColor: 'transparent',
          }
        },
        input: {
          padding: '6px 9px'
        },
        underline: {
          '&&:after': {
            display: 'none'
          },
          '&&:before': {
            display: 'none'
          }
        }
      }),
      MuiList: createStyles({
        padding: {
          paddingTop: 0,
          paddingBottom: 0,
        }
      })
    }
  });

  const [amount, setAmount] = React.useState('5');
  const [roomName, setRoomName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [disabledText, setDisabledText] = React.useState(true);
  const [labelWidth] = React.useState(0);

  const handleSelectAmount = (event: any) => {
    setAmount(event.target.value);
  };

  const handleRoomName = (event: any) => {
    setRoomName(event.target.value);
  };

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleChecboxClick = () => {
    setDisabled(!disabled);
    setDisabledText(!disabledText);
    console.log(disabled);
  };

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    axios.post('api/rooms', {
      max_players: amount,
      name: roomName,
      is_private: !disabled,
      password: password,
    }).then((response) => {
      const roomData = response.data as RoomData;
      location.href = '/game/' + roomData.room_code;
      console.log(response)
    }).catch((error) => {
      console.log('error');
    });
  }


  return (
    <UserProvider.context.Consumer>{context => (
      <React.Fragment>
        {context.user && context.user.authenticated ? (
      <ModalWindow
        modalWindowType='create-room'
        windowHeight={formHeight}
        windowWidth={formWidth}
        isContentCentered={false}>
        <form action="/game" onSubmit={handleSubmit}>
          <label className='create-room-popup__label' htmlFor='room-name'>Room name:</label>
          <input onChange={handleRoomName} type='text' className='create-room-popup__text-field' id='room-name' value={roomName} required />
          <div className='create-room-popup__line-wrapper'>
            <label htmlFor='player-amount'
              className='create-room-popup__label'>Amount of players:</label>
            <MuiThemeProvider theme={myTheme}>
              <FormControl variant="filled">
                <Select
                  labelId="player-amount"
                  value={amount}
                  onChange={handleSelectAmount}
                  labelWidth={labelWidth}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
              </FormControl>
            </MuiThemeProvider>
          </div>
          <div className='create-room-popup__line-wrapper'>
            <label htmlFor='is-private' className='create-room-popup__label'>Private?</label>
            <div className='create-room-popup__is-private'>
              <input type='checkbox' name='is-private' id='is-private' value='is-private'
                className='create-room-popup__is-private-value' onClick={handleChecboxClick} />
              <span className='create-room-popup__is-private-mark'></span>
            </div>
          </div>
          <label className={`create-room-popup__label ${disabledText ? "disabled" : ""}`} htmlFor='room-password'>Password:</label>
          <input onChange={handlePassword} value={password} required type='password' className='create-room-popup__text-field' id='room-password' disabled={disabled} />
          <input type="submit" name="#roomhash" id="Submit" value="Create Room" className='create-room-popup__btn' />
        </form>
      </ModalWindow>)
      : (<ModalWindow
        modalWindowType='no-create-room'
        windowHeight={formHeight}
        windowWidth={formWidth}
        isContentCentered={false}>
        <span className="create-room-popup__unautorized-text">You must be logged in to be able to create a room!</span>
      </ModalWindow>)
      }</React.Fragment>
    )}</UserProvider.context.Consumer>
  );
};

