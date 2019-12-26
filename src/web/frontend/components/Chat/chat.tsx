import React, {SyntheticEvent} from 'react';
import './chat.scss';
import Message, {messageParams, BotMessage} from "./message";
import ChatInput from "./chatInput";
import {GamePageProps} from "../GamePage/gamepage";

interface ChatState {
    value: string,
    messages: messageParams[],
}

interface ChatProps extends GamePageProps{
    userName: string,
}

export default class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
            value: '',
            messages: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.handleChatHistory = this.handleChatHistory.bind(this);
    }

    componentDidUpdate() {
        const messageContainer = document.getElementsByClassName("chat__messages-area")[0];
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    componentDidMount() {
        this.props.socket.on('new chat msg', this.handleNewMessage);
        this.props.socket.on('chatHistory', this.handleChatHistory);
        this.props.socket.emit('chat open');
    }

    handleChatHistory(messages: Array<messageParams>) {
        this.setState({messages});
    }

    handleNewMessage(newMessage: messageParams) {
        this.setState({messages: [...this.state.messages, newMessage]});
    }

    renderMessages() {
        return (
            this.state.messages.map((message: messageParams, i) => {
                return (
                    message.isBotMessage ? <BotMessage key={i} {...message}/> :
                    <Message {...message } showArrow={this.showArrow(i)} displayCreator={this.displayCreator(i)} userName={ this.props.userName } key={i} />
                )
            })
        );
    }

    showArrow(index: number) {
        let messages = this.state.messages;
        if (!messages[index + 1]) {
            return true;
        }
        return messages[index].creator !== messages[index + 1].creator;
    }

    displayCreator(index: number): boolean {
        let messages = this.state.messages;
        if (!messages[index - 1]) {
            return true;
        }
        return messages[index - 1].creator !== messages[index].creator;
    }

    handleSubmit(event: SyntheticEvent): void {
        event.preventDefault();

        const message = {
            id: this.state.messages.length + 1,
            creator: this.props.userName,
            content: this.state.value,
            timestamp: new Date(Date.now()).toISOString(),
        };

        this.setState({
            messages: [...this.state.messages, message],
            value: '',
        });

        this.props.socket.emit('send chat msg', message);
        console.log('chat msg emitted');
    }


    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        console.log('handle change called');
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className='chat'>
                <div className='chat__messages-area'>
                    {this.renderMessages()}
                </div>
                <ChatInput value={this.state.value} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            </div>
        );
    }
};