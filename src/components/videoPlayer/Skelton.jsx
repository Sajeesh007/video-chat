import { useContext } from 'react'
import {SocketContext} from '../../Context'
import './Skelton.css'

function Skelton() {
    const{call,name} = useContext(SocketContext)
    return (
        <div className="skelton-container">
        <img src={`https://ui-avatars.com/api/?name=${call.name || 'hi'}&background=0add8c&color=ffffff`} alt="img" />
      </div>
    )
}

function ProfileInfo() {
    const{call,name} = useContext(SocketContext)
    return (
        <div className="profile-info">
        <img src={`https://ui-avatars.com/api/?name=${call.name || 'hi'}&background=0add8c&color=ffffff`} alt="img" />
        <h2>{call.name || 'hi'}</h2>
    </div>
    )
}




export {Skelton, ProfileInfo }
