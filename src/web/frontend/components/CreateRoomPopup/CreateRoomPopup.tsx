import React from 'react';
import { Link } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme, createStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ModalWindow from "../ModalWindow/ModalWindow";
import './create-room-popup.scss';

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
  const [disabled, setDisabled] = React.useState(true);
  const [disabledText, setDisabledText] = React.useState(true);
  const [labelWidth] = React.useState(0);

  const handleChange = (event: any) => {
    setAmount(event.target.value);
  };

  const handleChecboxClick = () => {
    setDisabled(!disabled);
    setDisabledText(!disabledText);
  }

  return (
    <ModalWindow
      modalWindowType='create-room'
      windowHeight={formHeight}
      windowWidth={formWidth}
      isContentCentered={false}>
      <label className='create-room-popup__label' htmlFor='room-name'>Room name:</label>
      <input type='text' className='create-room-popup__text-field' id='room-name' />
      <div className='create-room-popup__line-wrapper'>
        <label htmlFor='player-amount'
          className='create-room-popup__label'>Amount of players:</label>
        <MuiThemeProvider theme={myTheme}>
          <FormControl variant="filled">
            <Select
              labelId="player-amount"
              value={amount}
              onChange={handleChange}
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
            className='create-room-popup__is-private-value' onClick={handleChecboxClick}/>
          <span className='create-room-popup__is-private-mark'></span>
        </div>
      </div>
      <label className={`create-room-popup__label ${disabledText ? "disabled" : ""}`} htmlFor='room-password'>Password:</label>
      <input type='password' className='create-room-popup__text-field' id='room-password' disabled={disabled}/>
      <Link to='/game' className='create-room-popup__btn'>Create Room</Link>

    </ModalWindow>
  );
};

