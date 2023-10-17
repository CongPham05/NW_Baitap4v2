import io from 'socket.io-client';

const socket = io('http://localhost:3000/events', { autoConnect: false, transports: ['websocket', 'polling', 'flashsocket'] });

export default socket;