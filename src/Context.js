import React, { createContext, useState, useRef, useEffect,useContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import firebase from './config'
import { useHistory } from 'react-router-dom';



const SocketContext = createContext();
const FirebaseContext = createContext(null)
const AuthContext = createContext(null)

export function useFirebase(){
  return useContext(FirebaseContext)
}
export function useAuth(){
  return useContext(AuthContext)
}



const socket = io('https://tie-appaudio.herokuapp.com/');
//const socket = io('http://localhost:5000');         

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [stream, setStream] = useState()
  const [name, setName] = useState('')
  const [call, setCall] = useState({})
  const [me, setMe] = useState('')
  const [messages,setMessages] = useState('')
  const [recieverId, setRecieverId] = useState('')
  
  const history =useHistory()

  const [user,setUser] = useState('')
  
  const [videoOn, setVideoOn] = useState(false)
  const [micOn, setMicOn] = useState(false)
  const [fullScreenOn,setFullScreenOn] = useState('')
  const [userSigned,setUserSigned] = useState('')
  

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((err)=>{
        console.log(err);
      })

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);
  

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    try{
      peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    })}
    catch(err){
      console.log(err);
    }

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: recieverId, signalData: data, from: me, name });
      console.log(recieverId);
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.replace('http://localhost:3000')

  }
  
  socket.on('recieve-message',(message) =>{
    setMessages(message)
  })
  const sendMessage = (transcript)=>{
      socket.emit('send-message',transcript,recieverId)

  }
  const recieveMessage = ()=>{
    socket.on('recieve-message',(message) =>{
      setMessages(message)
    })
  }
  recieveMessage(); 


  return (
    <FirebaseContext.Provider value={firebase}> 
      <AuthContext.Provider value={{user,setUser,userSigned,setUserSigned}}>
        <SocketContext.Provider value={{
          call,
          callAccepted,
          myVideo,
          userVideo,
          stream,
          name,
          setName,
          callEnded,
          me,
          callUser,
          leaveCall,
          answerCall,
          sendMessage,
          messages,
          micOn, 
          setMicOn,
          videoOn, 
          setVideoOn,
          fullScreenOn,
          setFullScreenOn,
          recieverId,
          setRecieverId,
        }}
        >
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
};

export { ContextProvider, SocketContext };
