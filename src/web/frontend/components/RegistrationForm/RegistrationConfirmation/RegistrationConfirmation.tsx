import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './RegistrationConfirmation.scss'


export default class RegistrationConfirmation extends React.Component {
    render() {
        return (
            <div className="RegistrationConfirmation">
                <h1>Registration successful</h1>
                <CheckCircleOutlineIcon style={{ fontSize: "48px", margin: "30px 0"}}/>
                <br/>
                <p>Please check your email!</p>

            </div>
        );
    }
}
