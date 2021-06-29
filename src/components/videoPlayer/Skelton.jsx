import { useContext} from 'react'
import {SocketContext} from '../../Context'
import './Skelton.css'

function Skelton() {

    const{callRecieverName,isCallReciever,call} = useContext(SocketContext)

    return (
        <div className="skelton-container">
        <img src={`https://ui-avatars.com/api/?name=${isCallReciever ? call.name :callRecieverName}&background=0add8c&color=ffffff`} alt="img" />
      </div>
    )
}

function ProfileInfo() {
    const{callRecieverName,isCallReciever,call} = useContext(SocketContext)
    

    return (
        <div className="profile-info">
        <img src={`https://ui-avatars.com/api/?name=${isCallReciever ? call.name :callRecieverName}&background=0add8c&color=ffffff`} alt="img" />
        <h2>{isCallReciever ? call.name : callRecieverName}</h2>
    </div>
    )
}




export {Skelton, ProfileInfo }
