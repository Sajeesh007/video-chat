import React,{useState,useContext} from "react";
import { FiVideo,FiVideoOff,FiMic,FiMicOff} from "react-icons/fi";
import { ImPhoneHangUp } from "react-icons/im";
import { RiFullscreenFill,RiFullscreenExitFill } from "react-icons/ri";
import { SocketContext } from "../../Context";

import './Menu.css'


export default function Menu() {

  const {leaveCall,sendInfo,recieveInfo} = useContext(SocketContext)
  

  const [videoIcon, setVideoIcon] = useState(<FiVideo/>)
  const [micIcon, setMicIcon] = useState(<FiMic/>)
  const [videoOn, setVideoOn] = useState(false)
  const [micOn, setMicOn] = useState(false)
  // const [fullScreenIcon, setFullScreenIcon] = useState(<RiFullscreenFill/>)
  
  
  const handleHangup = ()=>{
    leaveCall()
  }


  const handleClick = (item)=>{
    switch(item){
      case 'v' :  if(videoOn){
                    setVideoOn(false)
                    sendInfo({mic:false},{video:false})
                    recieveInfo()
                    setVideoIcon(<FiVideo/>)
                  }else{
                    setVideoOn(true)
                    sendInfo({mic:false},{video:true})
                    recieveInfo()
                    setVideoIcon(<FiVideoOff/>)
                  }
                  break
      case 'm'  : if(micOn){
                    setMicOn(false)
                    sendInfo({mic:false},{video:false})
                    recieveInfo()
                    setMicIcon(<FiMic/>)
                  }else{
                    setMicOn(true)
                    sendInfo({mic:true},{video:false})
                    recieveInfo()
                    setMicIcon(<FiMicOff/>)
                  }
                  break
      // case 'f'  : if(fullScreenOn){
      //               setFullScreenOn(false)
      //               setFullScreenIcon(<RiFullscreenFill/>)
      //             }else{
      //               setFullScreenOn(true)
      //               setFullScreenIcon(<RiFullscreenExitFill/>)
      //             }
      //             break
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
      <div className="icon-red" onClick={handleHangup}>
        <ImPhoneHangUp style={{fontSize:'24px'}}/>
      </div>

    </div>
  )
}


