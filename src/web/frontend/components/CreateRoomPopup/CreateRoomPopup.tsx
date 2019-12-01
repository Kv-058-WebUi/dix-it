import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './create-room-popup.scss';

class CreateRoomPopup extends React.Component {
  private root: HTMLElement | null;

  constructor(props: {}) {
    super(props);
    this.root = document.getElementById("root");
  }

  toggleModal() {
    if (this.root !== null) {
      this.root.classList.toggle('modal_active');
    }
  }

  componentWillMount() {
    this.toggleModal()
  }

  componentWillUnmount() {
    this.toggleModal();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

const useStyles = makeStyles({
  paper: {
    background: "#24272E",
    borderRadius: 20,
    boxShadow: '0px 0px 20px #BDC3D1',
    padding: 30,
    minWidth: 430
  },
});

export default function ModalDefault(props: DialogProps) {
  const classes = useStyles();

  return (
    <Dialog {...props} classes={{ ...classes }}>
      <CreateRoomPopup>
        {props.children}
        <label className='create-room-popup__label' htmlFor='room-name'>Room name:</label>
        <input type='text' className='create-room-popup__text-field' id='room-name' />
        <div className='create-room-popup__line-wrapper'>
          <label htmlFor='player-amount'
            className='create-room-popup__label'>Amount of players:</label>
          <div className='create-room-popup__player-amount-wrapper'>
            <select name='amount-of-players' id='player-amount'
              className='create-room-popup__player-amount-value'>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
            </select>
          </div>
        </div>
        <div className='create-room-popup__line-wrapper'>
          <label htmlFor='is-private' className='create-room-popup__label'>Private?</label>
          <div className='create-room-popup__is-private'>
            <input type='checkbox' name='is-private' id='is-private' value='is-private'
              className='create-room-popup__is-private-value' />
            <span className='create-room-popup__is-private-mark'></span>
          </div>
        </div>
        <label className='create-room-popup__label' htmlFor='room-password'>Password:</label>
        <input type='password' className='create-room-popup__text-field' id='room-password' />
        <Link to='/game' className='create-room-popup__btn'>Create Room</Link>
      </CreateRoomPopup>
    </Dialog>
  );
}
