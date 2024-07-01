import React, { useState, useEffect } from 'react';


const ReceivedText=()=>{
    const [socket, setSocket] = useState(null);
    const [receivedData, setReceivedData] = useState([])

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
        const Message = receivedData.massage
        const final = JSON.parse(Message)


        setReceivedData(final.message); 
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

    return(
        <>

<div className="main-content">  {receivedData} </div>

        </>
    )
}

export default ReceivedText