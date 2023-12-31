import {io} from 'socket.io-client';
import React from 'react';
const SOCKET_URL = 'http://localhost:5000';
export const socket = io(SOCKET_URL, { transports: ['websocket'] });
socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

export const AppContext = React.createContext();