import React, { FormEvent } from "react";
import InputField from "../InputField/InputField";
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import './AuthorizationForm.scss'
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router-dom";

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

type AuthFormState = {
    error: string,
    login: string,
    password: string
};

interface AuthFormProps extends RouteComponentProps {}

class AuthorizationForm extends React.Component<AuthFormProps, AuthFormState> {
    constructor(props: AuthFormProps) {
        super(props);
        this.state = {
            login: "",
            password: "",
            error: ""
        };
    }

    onFormSubmit(event: FormEvent): void {
        event.preventDefault();

        const userData = {
            login: this.state.login,
            password: this.state.password
        };
        
        axios.post('/api/auth/login', userData)
            .then(res => {
                if (res.data.error) {
                    this.setState({
                        error: res.data.error
                    })
                } else if(res.data.jwt_token) {
                    this.setState({ error: '' });
                    localStorage.setItem('jwt_token', res.data.jwt_token);
                    location.href = '/lobby';
                    // this.props.history.push('/lobby');
                }
            })
            .catch(() => {
                this.setState({
                    error: 'Oh noes! Something went wrong. Try to reboot your device.'
                })
            });
    }

    render() {
        const {classes}: any = this.props;

        return (
            <form onSubmit={(event) => { this.onFormSubmit(event) }}>
                <div className="AuthorizationForm-InputFields">
                    <InputField fieldType='login' onValueUpdate={(value) => {this.setState({login: value})}}/>
                    <InputField fieldType='password' onValueUpdate={(value) => {this.setState({password: value})}}/>
                </div>
                <div className="AuthorizationForm-Error">{this.state.error}</div>
                <a href='#'>
                    <div className='AuthorizationForm-ForgotPassword'>Forgot password?</div>
                </a>
                <div className="AuthorizationForm-ButtonContainer">
                    <Button className={classes.button} type='submit'>
                        Sign In
                    </Button>
                </div>
            </form>
        );
    }
}

export default withStyles(styles)(withRouter(AuthorizationForm));
