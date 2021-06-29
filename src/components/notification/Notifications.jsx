import React, { useContext,useEffect } from 'react';
import { SocketContext } from '../../Context';
import './Notification.css'
import { MdCallReceived} from "react-icons/md";
import { useHistory } from 'react-router-dom';


const Notifications = () => {
  const { answerCall, call, callAccepted,setIsCallReciever,recieveCall,sendName} = useContext(SocketContext);
  const history =useHistory()

  const handleClick =()=>{
    answerCall()
    sendName()
    setIsCallReciever(true)
    recieveCall()
    history.push('/meeting')
  }

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
          <div className='notification-wrapper'>
            <h1>{call.name} is calling</h1>
            <button onClick={handleClick }>
              <MdCallReceived className='icon'/>
              Answer
            </button>
          </div>
        )} 
    </>
  );
};

export default Notifications;

