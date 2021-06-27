import { useContext } from "react"
import Menu from "../components/videoPlayer/Menu"
import MyVideo from "../components/videoPlayer/MyVideo"
import UserVideo from "../components/videoPlayer/UserVideo"
import Canvas from "../components/videoPlayer/Canvas"
import { SocketContext } from "../Context"
import './Meeting.css'

export default function Meeting() {

  const { callAccepted,  callEnded,sendMessage, messages } = useContext(SocketContext)
 


  return (
    <div className='meeting-container'>
      <div className="video-wrapper">
      <div className="meeting-uservideo">
         <UserVideo width={100} height={100}/> 
         <Canvas width={100} height={100}/> 
       </div>
      </div>
      <div className="menu-wrapper">
        <Menu/>
      </div>
    </div>
  )
}
