import React, { useState, useContext,useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext,useAuth, useFirebase } from '../../Context';
import { ImWhatsapp } from "react-icons/im";
import { FiVideo,FiCopy } from "react-icons/fi";
import { useHistory } from 'react-router-dom';



import './Sidebar.css'

const Sidebar = ({ children }) => {
  const { me,setName,callUser,setRecieverId,call} = useContext(SocketContext);
  const firebase = useFirebase()
  const {user,setUser,setUserSigned} = useAuth()
  const [idToCall, setIdToCall] = useState('');
  const history =useHistory()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((result)=>{
      if(result){
        setUser(result.displayName)
        setName(result.displayName)
        setUserSigned(true)
      }else{
        setUserSigned(false)
        history.push('/signup')
      }
    })
  }, [])

  const handleChange =(e)=>{
    setIdToCall(e.target.value)
    setRecieverId(e.target.value);
  }


  const handleClick = ()=>{
    callUser();
    history.push('/meeting')
  }



  return (
    <div className='wraper'>
      <div className='container-1'>
        <h2>New call</h2>
        <div className="calling">
          <input type="text" value={idToCall} onChange={handleChange} placeholder='Enter the ID to call'/>
          <button className='buttons' onClick={handleClick} ><FiVideo className='icon'/> Call</button>
        </div>
        
      </div>
      <div className='container-2'>
        <h2>Share Your ID</h2>
        <div className="button-wrapper">
          <div className="button-wrapper-wrapper">
              <CopyToClipboard text={me}>
                <button className='buttons'>
                  <FiCopy className='icon'/>
                   <a> Copy Your ID</a>
                </button>
              </CopyToClipboard>
            </div>
            <div className="button-wrapper-wrapper">
              <CopyToClipboard text={me}>
                <button className='buttons'>
                  <ImWhatsapp className='icon'/>
                  <a href={`whatsapp://send?text=${me}`} data-action="share/whatsapp/share"  
                  target="_blank" style={{textDecoration:'none',color:'white'}}> Share to WhatsApp </a>   
                </button>
              </CopyToClipboard>
            </div>
          </div> 
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
