import { useContext,useState,useEffect } from "react"
import Menu from "../components/videoPlayer/Menu"
import MyVideo from "../components/videoPlayer/MyVideo"
import UserVideo from "../components/videoPlayer/UserVideo"
import Canvas from "../components/videoPlayer/Canvas"
import { SocketContext } from "../Context"
import './Meeting.css'
import { useHistory } from "react-router-dom"
import { ProfileInfo } from "../components/videoPlayer/Skelton"

export default function Meeting() {

  const [callStarted, setCallStarted] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const { callAccepted,isCallReciever,recieveName} = useContext(SocketContext)
  const history = useHistory()
  
  useEffect(() => {
    history.push('/meeting')
  }, [callStarted])

  useEffect(() => {
    recieveName()
  }, [])

  const handleClick= ()=>{
    setCallStarted(true)
  }

  if(callAccepted){
    setTimeout(() => {
      setShowButton(true)
    }, 3000)
  }



  return (
    <div className='meeting-container'>
      <div className="video-wrapper">
          <div className={isCallReciever ? "meeting-uservideo"  : callStarted ? "meeting-uservideo" : "meeting-uservideo-hide" }>
            <ProfileInfo/>
            <UserVideo width={100} height={100}/> 
            <Canvas width={100} height={100}/> 
          </div>
          {!isCallReciever && (
          <div className={callStarted ? "ringing-hide" :"ringing"}>
            {(callAccepted && showButton)? <p>Call accepted</p> : <p>Ringing...</p> }
            {(callAccepted && !isCallReciever && showButton) && (<button className='ringing-button' onClick={handleClick}>Go to Call</button>)}
          </div>)}
      </div>
      <div className="menu-wrapper">
        <Menu/>
      </div>
    </div>
  )
}
