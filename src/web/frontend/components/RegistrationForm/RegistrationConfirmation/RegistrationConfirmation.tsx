import React, {Component} from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import './RegistrationConfirmation.scss'


export default class RegistrationConfirmation extends React.Component {
    render() {
        return (
            <div className="RegistrationConfirmation">
                <DoneOutlineIcon style={{ fontSize: "48px"}}/>
                <br/>
                Thank you for the registration! Please check your email!
            </div>
        );
    }
}
