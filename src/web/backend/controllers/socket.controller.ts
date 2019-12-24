import SocketIO from "socket.io";

interface Message {
    id: number,
    creator: string,
    content: string
    timestamp: string,
}

// interface Word {
//     word: string
// }

export default class SocketController {


    public initializeSocket(socket: SocketIO.Server) {
        socket.on('connection', this.userConnection);
    }

    private userConnection(client: SocketIO.Socket) {
        console.log('a user connected');
        client.join('some room');

        client.on('game page open', () => {
            console.log('Game page open!! BE');
        });
        client.on('disconnect', () => {
            console.log('user disconnected');
        });
        client.on('send chat msg', chatMessage);
        client.on('New Word From StoryTeller', newWord);

        function chatMessage(msg: Message) { 
            console.log('chat msg received');
            console.log(msg);
            client.broadcast.to('some room').emit('new chat msg', msg);
        }
        function newWord (word: any ) {
            console.log('new word has been sended');
            console.log(word);
            client.broadcast.to('some room').emit('New Word From StoryTeller', word);
        }
    }

}