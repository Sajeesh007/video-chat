import React,{useState,useContext,useEffect} from "react";
import { FiVideo,FiVideoOff,FiMic,FiMicOff} from "react-icons/fi";
import { ImPhoneHangUp } from "react-icons/im";
import { SocketContext } from "../../Context";

import './Menu.css'


export default function Menu() {

  const {leaveCall,sendInfo,recieveInfo,userVideoOn,userMicOn,isCallReciever} = useContext(SocketContext)
  

  const [videoIcon, setVideoIcon] = useState(<FiVideo/>)
  const [micIcon, setMicIcon] = useState(<FiMic/>)
  const [videoOn, setVideoOn] = useState(false)
  const [micOn, setMicOn] = useState(false)
  
  
  const handleHangup = ()=>{
    leaveCall()
  }

  useEffect(() => {
    recieveInfo()
  }, [videoOn])

  useEffect(() => {
    recieveInfo()
  }, [micOn])


  const handleClick = (item)=>{
    switch(item){
      case 'v' :  if(videoOn){
                    setVideoOn(false)
                    setVideoIcon(<FiVideo/>)
                    micOn ? sendInfo({video :false,mic:true}) : sendInfo({video :false,mic:false}) 
                    
                  }else{
                    setVideoOn(true)
                    setVideoIcon(<FiVideoOff/>)
                    micOn ? sendInfo({video :true,mic:true}) : sendInfo({video :true,mic:false}) 
                  }
                  break
      case 'm'  : if(micOn){
                    setMicOn(false)
                    setMicIcon(<FiMic/>)
                    videoOn ? sendInfo({video :true,mic:false}) : sendInfo({video :false,mic:false}) 
                  }else{
                    setMicOn(true)
                    setMicIcon(<FiMicOff/>)
                    videoOn ? sendInfo({video :true,mic:true}) : sendInfo({video :false,mic:true}) 
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
      <div className="icon-red" onClick={handleHangup}>
        <ImPhoneHangUp style={{fontSize:'24px'}}/>
      </div>

    </div>
  )
}


