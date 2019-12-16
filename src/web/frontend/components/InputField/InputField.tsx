import React from "react";
import './InputField.scss';
import {FieldType} from "./FieldType";
import InputValidator from "./InputValidator"

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {InputAdornment, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";


const styles = () => ({
    root: {
        borderRadius: 25,
        backgroundColor: '#fff',
        maxWidth: 270,
        minWidth: 270,
        boxShadow: '0px 0px 15px #EC7760'
    },
    input: {
        color: '#000',
    },
});

interface InputFieldProps {
    fieldType: string
    onValueUpdate: (value: string) => void;
    classes: any
}

interface InputFieldState {
    inputValue: string,
    isValueInvalid: boolean,
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
        isValueInvalid: false, helperText: "", showPassword: false, inputValue: ""
    };

    showPassword(): void {
        this.setState({isPasswordVisible: true});
    };

    hidePassword(): void {
        this.setState({isPasswordVisible: false});
    }

    validateInput(isInputValid: (inputValue: string) => boolean, errorHelperText: string, event?: any): void {
        const inputText = event.target.value;
        if (!isInputValid(inputText)) {
            this.setState({isValueInvalid: true, helperText: errorHelperText});
            return;
        }
        this.setState({isValueInvalid: false, helperText: ""});
    }

    //don't send value to parent if it's invalid
    sendInputValueToParent(event: any): void {
        let fieldValue = event.target.value;
        if (this.state.isValueInvalid) {
            fieldValue = "";
        }
        this.props.onValueUpdate(fieldValue);
        this.setState({inputValue: fieldValue});
    }

    getAttributesForUsernameField(InputProps: any): any {
        return {
            type: "text",
            errorHelperText: "Username should contain only numbers and letters with length between 2 and 30",
            isInputValid: InputValidator.isUsernameValid,
            InputProps: {
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircleIcon className="Icon"/>
                    </InputAdornment>
                ),
                ...InputProps
            }
        };
    }

    getAttributesForEmailField(InputProps: any) {
        return {
            type: "text",
            errorHelperText: "Not an email",
            isInputValid: InputValidator.isEmailValid,
            InputProps: {
                startAdornment: (
                    <InputAdornment position="start">
                        <MailOutlineIcon className="Icon"/>
                    </InputAdornment>
                ),
                ...InputProps
            }
        };
    }

    getAttributesForLoginField(InputProps: any) {
        return {
            type: "text",
            errorHelperText: "Not an email or username",
            isInputValid: InputValidator.isLoginValid,
            InputProps: {
                startAdornment: (
                    <InputAdornment position="start">
                        <MailOutlineIcon className="Icon"/>
                    </InputAdornment>
                ),
                ...InputProps
            }
        };
    }

    getAttributesForPasswordField(InputProps: any, isPasswordVisible: any): any {
        return {
            type: isPasswordVisible ? 'text' : 'password',
            errorHelperText: "Should contain 8 to 50 characters, including 1 letter, 1 digit and 1 special character",
            isInputValid: InputValidator.isPasswordValid,
            InputProps: {
                endAdornment: (
                    <InputAdornment position="end">
                        <VisibilityIcon
                            className='InputField-Eye'
                            onMouseDown={this.showPassword.bind(this)}
                            onMouseUp={this.hidePassword.bind(this)}
                        />
                    </InputAdornment>
                ),
                ...InputProps
            }
        }
    }

    getAttributesForCurrentFieldType(fieldType: string): any {
        const {classes}: InputFieldProps = this.props;
        const {isPasswordVisible} = this.state;

        const InputProps = {
            classes: classes
        };

        if (fieldType === FieldType.Username)
            return this.getAttributesForUsernameField(InputProps);
        if (fieldType === FieldType.Email)
            return this.getAttributesForEmailField(InputProps);
        if (fieldType === FieldType.Password)
            return this.getAttributesForPasswordField(InputProps, isPasswordVisible);
        if (fieldType === FieldType.Login)
            return this.getAttributesForLoginField(InputProps);
    }

    capitalizeFirstChar(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    getPlaceholder(fieldType: FieldType): string {
        if (fieldType === FieldType.Login) {
            return 'Nickname or email';
        }
        
        return this.capitalizeFirstChar(fieldType);
    }

    render() {
        const {fieldType}: any = this.props;
        const {
            InputProps, type,
            errorHelperText, isInputValid
        } = this.getAttributesForCurrentFieldType(fieldType);

        return (
            <div className="InputField">
                <TextField
                    placeholder={this.getPlaceholder(fieldType)}
                    required
                    helperText={this.state.helperText}
                    onChange={(event) => this.validateInput(isInputValid, errorHelperText, event)}
                    onBlur={(event) => this.sendInputValueToParent(event)}
                    error={this.state.isValueInvalid}
                    variant="outlined"
                    InputProps={InputProps}
                    type={type}
                />
            </div>
        );
    }
}

export default withStyles(styles)(InputField);
