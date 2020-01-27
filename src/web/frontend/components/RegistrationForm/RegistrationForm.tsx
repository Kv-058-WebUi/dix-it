import React from "react";
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import axios from "axios";
import './RegistrationForm.scss'
import InputField from "../InputField/InputField";
import RegistrationConfirmation from "./RegistrationConfirmation/RegistrationConfirmation"

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

const RESPONSE_STATUS_SUCCESS = "success";
const RESPONSE_STATUS_ERROR = "error";

interface RegistrationFormProps {
    onPending: (value: boolean) => void;
}

interface RegistrationFormState {
    username: string,
    email: string,
    password: string,
    errorText: string,
    isRegistrationCompleted: boolean;
    isPending: boolean;
}

class RegistrationForm extends React.Component<RegistrationFormProps, RegistrationFormState> {
    constructor(props: RegistrationFormProps) {
        super(props);
        this.state = {username: "", email: "", password: "", errorText: "", isRegistrationCompleted: false, isPending: true};
    }

    onFormSubmit(event: any): void {
        this.setState({errorText: ""});
        event.preventDefault();
        if (this.formHasAllFieldsFilled()) {
            this.setPending(true);
            axios.post('/api/auth/register', {
                nickname: this.state.username,
                email: this.state.email,
                password: this.state.password
            }).then((response) => {
                this.handleServerResponse(response);
            }).catch((error) => {
                console.log(error);
                this.setState({errorText: 'Oh, snap! Something went wrong :('});
            }).finally(()=>{
                this.setPending(false);
            });
        }
    }

    setPending(isPending: boolean) {
        this.setState({isPending});
        this.props.onPending(isPending);
    }

    handleServerResponse(response: any): void {
        if (response.data.status === RESPONSE_STATUS_SUCCESS) {
            this.setState({isRegistrationCompleted: true});
            return;
        }
        if (response.data.status === RESPONSE_STATUS_ERROR) {
            const error = response.data.reason;
            this.setState({errorText: error});
        }
    }

    formHasAllFieldsFilled(): boolean {
        [this.state.username, this.state.email, this.state.password].forEach((item) => {
                if (item === "") return false;
            }
        );
        return true;
    }

    render() {
        const {classes}: any = this.props;

        return (
            <React.Fragment>
                {this.state.isRegistrationCompleted ? (
                    <RegistrationConfirmation />
                ) : (
                    <form onSubmit={(e) => {
                        this.onFormSubmit(e)
                    }}>
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
                        <div className="RegistrationForm-Error">{this.state.errorText}</div>

                        <div className="RegistrationForm-ButtonContainer">
                            <Button className={classes.button} type='submit'>
                                Create account
                            </Button>
                        </div>
                    </form>
                )}

            </React.Fragment>
        );
    };
}

export default withStyles(styles)(RegistrationForm);
