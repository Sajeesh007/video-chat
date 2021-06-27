import React, { useContext } from 'react';
import { SocketContext,useAuth } from '../../Context';
import Subtitles from './Subtitles';
import MyVideo from './MyVideo'
import './Video.css'

export default function UserVideo({width,height}) {
  const {userVideo,micOn,call,videoOn,myVideo} = useContext(SocketContext);
  const {user}=useAuth()

  return (
    <div className='user-video-container'>
      {/* <div className="my-video-draggable">
        <video ref={myVideo} playsInline muted autoPlay />
       
      </div> */}
      <div className="profile-info">
          <img src={`https://ui-avatars.com/api/?name=${call.name}&background=0add8c&color=ffffff`} alt="img" />
          <h2>{call.name}</h2>
      </div>
      <video className={videoOn ? 'user-video-hide' : 'user-video' } playsInline {...micOn ? {muted : true} : {}}ref={userVideo} autoPlay width={`${width}%`} height={`${height}%`}
        style={{  
          width:`${width}%`,
          height:`${height}%`,
        }}
        > {console.log(userVideo)}
        </video>
        <Subtitles/>
    </div> 
    )
}


