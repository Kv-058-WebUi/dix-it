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

interface RegistrationFormProps {

}

interface RegistrationFormState {
    username: string,
    email: string,
    password: string
}

class RegistrationForm extends React.Component<RegistrationFormProps, RegistrationFormState> {
    constructor(props: RegistrationFormProps) {
        super(props);
        this.state = {username: "", email: "", password: ""};
    }

    onFormSubmit(event: any) {
        event.preventDefault();
        if (this.formHasAllFieldsFilled()) {
            // send post request with values
        }
    }

    formHasAllFieldsFilled() {
        Object.entries(this.state).forEach(
            ([stateName, stateValue]) => {
                if (stateValue === "") {
                    console.log(`${stateName} is not valid`);
                    return false;
                }
            }
        );
        return true;
    }

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
                <form onSubmit={(e) => {
                    this.onFormSubmit(e)
                }}>
                    <div className='RegistrationForm-ControlButtons'>Sign Up Sign In</div>
                    <div className="RegistrationForm-InputFields">
                        <InputField fieldType='username' onValueUpdate={(username) => {
                            this.setState({username: username})
                        }}/>
                        <InputField fieldType='email' onValueUpdate={(email) => {
                            this.setState({email: email})
                        }}/>
                        <InputField fieldType='password' onValueUpdate={(password) => {
                            this.setState({password: password})
                        }}/>
                    </div>
                    <div className="RegistrationForm-ButtonContainer">
                        <Button className={classes.button} type='submit'>
                            Create account
                        </Button>
                    </div>
                    <SocialLoginBar/>
                </form>
            </ModalWindow>
        );
    };
}

export default withStyles(styles)(RegistrationForm);
