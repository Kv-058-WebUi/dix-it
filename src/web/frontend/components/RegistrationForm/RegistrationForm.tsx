import React from "react";
import InputField from "../InputField/InputField";
import './RegistrationForm.scss'
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import SocialLoginBar from "../SocialLoginBar/SocialLoginBar";
import ModalWindow from "../ModalWindow/ModalWindow";

const styles = () => ({
    button: {
        background: 'linear-gradient(45deg, #F27A54 30%, #A154F2 90%)',
        borderRadius: 25,
        border: 0,
        color: 'white',
        height: 48,
        width: 185,
        '&:hover': {
            boxShadow: '0px 0px 30px #EC7760',
        }
    },
});

class RegistrationForm extends React.Component {

    render() {
        const {classes}: any = this.props;
        const formHeight = '560px';
        const formWidth = '350px';
        return (
            <ModalWindow
                modalWindowType='register'
                windowHeight={formHeight}
                windowWidth={formWidth}
                isContentCentered={true}>
                <div className='RegistrationForm-ControlButtons'>Sign Up Sign In</div>
                <div className="RegistrationForm-InputFields">
                    <InputField fieldType='username'/>
                    <InputField fieldType='email'/>
                    <InputField fieldType='password'/>
                </div>
                <div className="RegistrationForm-ButtonContainer">
                    <Button className={classes.button}>
                        Create account
                    </Button>
                </div>
                <SocialLoginBar/>
            </ModalWindow>
        );
    };
}

export default withStyles(styles)(RegistrationForm);
