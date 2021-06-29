import React, { useContext } from 'react';
import { SocketContext,useAuth } from '../../Context';
import Subtitles from './Subtitles';
import MyVideo from './MyVideo'
import './Video.css'
import {ProfileInfo, Skelton} from './Skelton';

export default function UserVideo({width,height}) {
  const {userVideo,userMicOn,call,userVideoOn,myVideo} = useContext(SocketContext);

  return (
    <div className='user-video-container'>
      {/* <div className="my-video-draggable">
        <video ref={myVideo} playsInline muted autoPlay />
      </div> */}
      
      <video className={userVideoOn ? 'user-video-hide' : 'user-video'} playsInline muted={userMicOn} ref={userVideo} autoPlay width={`${width}%`} height={`${height}%`}
        style={{  
          width:`${width}%`,
          height:`${height}%`,
        }}
        /> 
        {(userVideoOn) && (
        <div style={{position:'absolute'}}>
        <Skelton/>
        </div>
      )}
        <Subtitles/>
    </div> 
    )
}


