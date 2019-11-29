import React from "react";
import './InputField.scss';
import {FieldType} from "./FieldType";
import InputValidator from "./InputValidator"

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {InputAdornment, TextField, Theme} from "@material-ui/core";
import {ThemeProvider, withStyles} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";


const inputBoxTheme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#A154F2'
        },
        text: {
            primary: '#E5E5E5',
            secondary: '#E5E5E5'
        },
        background: {
            default: '#24272E'
        }
    },
    typography: {
        fontFamily: "Roboto"
    }
});

const styles = () => ({
    root: {
        borderRadius: 25,
        borderColor: 'white',
        height: 58
    },
    eye: {
        cursor: 'pointer'
    }
});

interface InputFieldProps {
    fieldType: string
    classes: any
}

interface InputFieldState {
    error: boolean,
    helperText: string
    password?: string
    isPasswordVisible?: boolean
}

class InputField extends React.Component<InputFieldProps, InputFieldState> {
    constructor(props: InputFieldProps) {
        super(props);
        this.state = InputField.defaultState;
    }

    static defaultProps = {
        fieldType: ""
    };

    static defaultState = {
        error: false, helperText: "", showPassword: false
    };

    showPassword(): void {
        this.setState({isPasswordVisible: true});
    };

    hidePassword(): void {
        this.setState({isPasswordVisible: false});
    }

    //rerenders the component and shows helper text if input is invalid
    validateInput(isInputValid: (inputValue: string) => boolean, errorHelperText: string, event?: any) {
        const inputValue: string = event.target.value;

        if (!isInputValid(inputValue)) {
            this.setState({error: true, helperText: errorHelperText});
            return;
        }
        this.setState(InputField.defaultState);
    }

    getAttributesForUsernameField(InputProps: any) {
        return {
            label: "Username",
            type: "text",
            errorHelperText: "Username should have more than 1 character",
            isInputValid: InputValidator.isUsernameValid,
            InputProps: {
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircleIcon className="Icon"/>
                    </InputAdornment>
                ), ...InputProps
            }
        };
    }

    getAttributesForEmailField(InputProps: any) {
        return {
            label: "Email",
            type: "text",
            errorHelperText: "Not an email",
            isInputValid: InputValidator.isEmailValid,
            InputProps: {
                startAdornment: (
                    <InputAdornment position="start">
                        <MailOutlineIcon className="Icon"/>
                    </InputAdornment>
                ), ...InputProps
            }
        };
    }

    getAttributesForPasswordField(InputProps: any, isPasswordVisible: any, classes: any) {
        return {
            label: "Password",
            type: isPasswordVisible ? 'text' : 'password',
            errorHelperText: "Should contain minimum 8 characters, including 1 letter and 1 digit",
            isInputValid: InputValidator.isPasswordValid,
            InputProps: {
                endAdornment: (
                    <InputAdornment position="end">
                        <VisibilityIcon
                            className={classes.eye}
                            onMouseDown={this.showPassword.bind(this)}
                            onMouseUp={this.hidePassword.bind(this)}
                        />
                    </InputAdornment>
                ), ...InputProps
            }
        }
    }

    getAttributesForCurrentFieldType(fieldType: string): any {
        const {classes}: InputFieldProps = this.props;
        const {isPasswordVisible} = this.state;

        const InputProps = {
            classes: {
                notchedOutline: classes.root
            },
            className: classes.input
        };

        if (fieldType === FieldType.Username)
            return this.getAttributesForUsernameField(InputProps);
        if (fieldType === FieldType.Email)
            return this.getAttributesForEmailField(InputProps);
        if (fieldType === FieldType.Password)
            return this.getAttributesForPasswordField(InputProps, isPasswordVisible, classes);
    }

    render() {
        const {fieldType, classes}: any = this.props;
        const {
            label, InputProps, type,
            errorHelperText, isInputValid
        } = this.getAttributesForCurrentFieldType(fieldType);

        return (
            <div className="InputField">
                <ThemeProvider theme={inputBoxTheme}>
                    <TextField
                        label={label}
                        required
                        helperText={this.state.helperText}
                        onBlur={this.validateInput.bind(this, isInputValid, errorHelperText)}
                        error={this.state.error}
                        variant="outlined"
                        InputProps={InputProps}
                        InputLabelProps={{
                            className: classes.label
                        }}
                        type={type}
                    />
                </ThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(InputField);
