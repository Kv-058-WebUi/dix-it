import React from 'react';
import './chat.scss';

export interface messageParams {
    id: number,
    creator: string,
    content: string
    timestamp: Date,
    displayCreator?: boolean,
    showArrow?: boolean,
}

export default class Message extends React.Component<messageParams> {
    constructor(props: messageParams) {
        super(props);
        this.state = {};
    }

    getTime() {
        let timestamp = this.props.timestamp;
        return timestamp.getHours() + ':' + timestamp.getMinutes();
    }

    getCurrentUserName() {
        return 'Not me';
    }

    render() {
        return (
            <div className={this.props.creator === this.getCurrentUserName() ?'message message_self' : 'message'}>
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