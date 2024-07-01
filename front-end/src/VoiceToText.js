import { useEffect, useState } from 'react';
import './VoiceToText.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const VoiceToText=()=>{
    const [socket, setSocket] = useState(null);
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    console.log("transcript =",transcript)

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
      console.log("receivedData =",receivedData); 
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

  useEffect(()=>{
    if (socket) {
        socket.send(JSON.stringify({ message: transcript}));
    }

  }, [transcript]);


    if (!browserSupportsSpeechRecognition) {
        return null
    }




    return(
        <>
        <div className='div-main'>
        <div className="containers">
            <h2>specch to text convter</h2>
            <br/>
            <p>A React hook that converts speech from the microphone to text and makes it available to your React
            components.</p>
     
        <div className="main-content">  {transcript} </div>


        <div className="btn-style">
            <button className='btn-sumit'>copy</button>
            <button onClick={startListening} className='btn-sumit'>start speech</button>
            <button onClick={SpeechRecognition.stopListening} className='btn-sumit'>stop speech</button>

        </div>

        </div>
        </div>

        </>
    )
}

export default VoiceToText;