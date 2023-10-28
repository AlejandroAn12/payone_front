
import { Manager, Socket } from "socket.io-client";
import { environment } from "src/environments/environments";

export const connectToServer = () => {
  const manager = new Manager(environment.server_socket);

  const socket = manager.socket('/');
  addListenners(socket);
};

const addListenners = (socket: Socket) => {
  // const serverStatusLabel = document.querySelector('#server-status')!;

    socket.on('connect', () => {
        console.log('SERVIDOR ONLINE');
    // serverStatusLabel.innerHTML = 'connected';
  });

    socket.on('disconnect', () => {
        console.log('SERVIDOR OFFLINE');
      
    // serverStatusLabel.innerHTML = 'disconnected';
  });
};
