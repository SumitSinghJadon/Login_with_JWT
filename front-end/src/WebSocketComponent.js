import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/app/');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      notify(receivedData); 
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      socket.onopen = null;
      socket.onmessage = null;
      socket.onclose = null;
    };
  }, [socket]);

  const notify = (data) => {
    toast.info(
      <div>
        <p>Employ Name: {data.status.Employ_Name}</p>
        <p>Leave Request: {data.status.Title}</p>
      </div>
    );
  };

  return (
    <div class="p-4">
    <h1 class="text-lg font-semibold mb-4">WebSocket Messages</h1>
    <ToastContainer />
  </div>
  
  );
};

export default WebSocketComponent;

