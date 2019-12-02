import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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


const useStyles = makeStyles(theme => ({
  paper: {
    background: "#24272E",
    borderRadius: 20,
    boxShadow: '0px 0px 20px #BDC3D1',
    padding: 30,
    minWidth: 430
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ModalDefault(props: DialogProps) {
  const classes = useStyles();

  const [amount, setAmount] = React.useState('5');
  const [labelWidth] = React.useState(0);

  const handleChange = (event: any) => {
    setAmount(event.target.value);
  };

  return (
    <Dialog {...props} classes={{ ...classes }}>
      <CreateRoomPopup>
        {props.children}
        <label className='create-room-popup__label' htmlFor='room-name'>Room name:</label>
        <input type='text' className='create-room-popup__text-field' id='room-name' />
        <div className='create-room-popup__line-wrapper'>
          <label htmlFor='player-amount'
            className='create-room-popup__label'>Amount of players:</label>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="player-amount"
              id="demo-simple-select-outlined"
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
