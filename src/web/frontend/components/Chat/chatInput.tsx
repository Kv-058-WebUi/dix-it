import React from 'react';
import './chat.scss';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

interface InputProps {
    onSubmit: any,
    value: string,
    onChange: any,
}

export default class ChatInput extends React.Component<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return (
            <div className='input-area'>
                <form onSubmit={this.props.onSubmit}>
                    <input id='newMessage' inputMode='text' placeholder='Type a message...' required
                           value={this.props.value} onChange={this.props.onChange}
                    />
                    <button type='submit'>
                        SEND<KeyboardArrowRightIcon id='arrowIcon'/>
                    </button>
                </form>
            </div>
        )
    }
}