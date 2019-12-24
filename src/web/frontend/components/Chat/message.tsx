import React from 'react';
import './chat.scss';

export interface messageParams {
    id: number,
    creator: string,
    content: string
    timestamp: string,
    displayCreator?: boolean,
    showArrow?: boolean,
    userName?: string,
}

export default class Message extends React.Component<messageParams> {
    constructor(props: messageParams) {
        super(props);
        this.state = {};
    }
    getTime(): string {
        const timestamp = new Date(this.props.timestamp);
        const leadingZero = (num: number) => `0${num}`.slice(-2);

        return [timestamp.getHours(), timestamp.getMinutes()]
                .map(leadingZero)
                .join(':');
    }

    isCurrentUserMessage(): boolean {
        return this.props.userName === this.props.creator;
    }

    render() {
        return (
            <div className={this.isCurrentUserMessage() ? 'message message_self' : 'message'}>
                <div className='message__container'>
                    <div className={
                        this.props.displayCreator ? 'message__info' : 'message__info message__info_hidden'
                    }>
                        <span className='message__creator'>
                            {this.props.displayCreator ? this.props.creator + ', ' : ''}
                        </span>
                        <span className='message__timestamp'>{this.getTime()}</span>
                    </div>
                    <div className={
                        this.props.showArrow ? 'message__content message__content_arrow' : 'message__content'
                    }>
                        <p>{this.props.content}</p>
                    </div>

                </div>
            </div>
        );
    }
};