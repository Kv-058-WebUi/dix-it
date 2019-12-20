import SocketIO from "socket.io";

interface Message {
    id: number,
    creator: string,
    content: string
    timestamp: string,
}

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

        function chatMessage(msg: Message) {
                console.log('chat msg received');
                console.log(msg);
                client.broadcast.to('some room').emit('new chat msg', msg);
        }
    }

}