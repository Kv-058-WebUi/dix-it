import React from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import InputField from "../InputField/InputField";
import {Button} from "@material-ui/core";
import SocialLoginBar from "../SocialLoginBar/SocialLoginBar";
import {withStyles} from "@material-ui/styles";
import './AuthorizationForm.scss'


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

class AuthorizationForm extends React.Component {

    render() {
        const formHeight = '560px';
        const formWidth = '350px';
        const {classes}: any = this.props;
        return (
            <ModalWindow
                modalWindowType='signin'
                windowWidth={formWidth}
                windowHeight={formHeight}
                isContentCentered={true}>
                <div className="AuthorizationForm-InputFields">
                    <InputField fieldType='email'/>
                    <InputField fieldType='password'/>
                </div>
                <div className="AuthorizationForm-ButtonContainer">
                    <a href='#'>
                        <div className='AuthorizationForm-ForgotPassword'> Forgot password?</div>
                    </a>
                    <Button className={classes.button}>
                        Sign In
                    </Button>
                </div>

                <SocialLoginBar/>
            </ModalWindow>
        );
    }
}

export default withStyles(styles)(AuthorizationForm);
