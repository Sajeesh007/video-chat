import './Header.css'
import React, { useContext} from 'react';
import {useAuth,useFirebase,SocketContext} from '../../Context'
import { FiLogOut } from "react-icons/fi";

export default  function Header() {

    const {user,userSigned}=useAuth()
    const firebase=useFirebase()
    const { name } = useContext(SocketContext)
  

    const handleClick = ()=>{
        firebase.auth().signOut().then((result) => {
            console.log(result);
          }).catch((error) => {
            console.log(error);
          });
    }
    return (
        <div className='header-container'>
            <h2>Video Chat</h2>

            {(userSigned)&&(
            <div className="items-wrapper">
                <div className="profile-pic">
                    <img src={`https://ui-avatars.com/api/?name=${user}&background=0add8c&color=ffffff`} alt="img" />
                </div>
                <h3>Welcome {name}</h3>
                <button onClick={handleClick}>
                    <FiLogOut className='icon'/>
                    Sign out
                </button>
            </div>)}

        </div>
    )
}


