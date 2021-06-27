import React,{useState,useContext} from "react";
import { FiVideo,FiVideoOff,FiMic,FiMicOff} from "react-icons/fi";
import { ImPhoneHangUp } from "react-icons/im";
import { RiFullscreenFill,RiFullscreenExitFill } from "react-icons/ri";
import { SocketContext } from "../../Context";

import './Menu.css'


export default function Menu() {

  const {videoOn,micOn,setVideoOn,setMicOn,fullScreenOn,setFullScreenOn,leaveCall,callAccepted,callEnded} = useContext(SocketContext)
  

  const [videoIcon, setVideoIcon] = useState(<FiVideo/>)
  const [micIcon, setMicIcon] = useState(<FiMic/>)
  const [fullScreenIcon, setFullScreenIcon] = useState(<RiFullscreenFill/>)
  
  
  const handleHangup = ()=>{
    leaveCall()
  }


  const handleClick = (item)=>{
    switch(item){
      case 'v' :  if(videoOn){
                    setVideoOn(false)
                    setVideoIcon(<FiVideo/>)
                  }else{
                    setVideoOn(true)
                    setVideoIcon(<FiVideoOff/>)
                  }
                  break
      case 'm'  : if(micOn){
                    setMicOn(false)
                    setMicIcon(<FiMic/>)
                  }else{
                    setMicOn(true)
                    setMicIcon(<FiMicOff/>)
                  }
                  break
      case 'f'  : if(fullScreenOn){
                    setFullScreenOn(false)
                    setFullScreenIcon(<RiFullscreenFill/>)
                  }else{
                    setFullScreenOn(true)
                    setFullScreenIcon(<RiFullscreenExitFill/>)
                  }
                  break
      default   : console.log('error');
    } 
    
  }

  return (
    <div className='menu-container'>
      <div className="icon" onClick={()=>handleClick('v')}>
        {videoIcon}
      </div>
      <div className="icon" onClick={()=>handleClick('m')}>
        {micIcon}
      </div>
      {/* <div className="icon" onClick={()=>handleClick('f')}>
        {fullScreenIcon}
      </div> */}

      {(callAccepted && !callEnded) &&(
      <div className="icon-red" onClick={handleHangup}>
        <ImPhoneHangUp style={{fontSize:'24px'}}/>
      </div>)}

    </div>
  )
}


