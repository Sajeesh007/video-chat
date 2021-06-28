import React, { useContext } from 'react';
import { SocketContext,useAuth } from '../../Context';
import Subtitles from './Subtitles';
import MyVideo from './MyVideo'
import './Video.css'

export default function UserVideo({width,height}) {
  const {userVideo,userMicOn,call,userVideoOn,myVideo} = useContext(SocketContext);


  {console.log(userVideoOn)}
  {console.log(userMicOn)}

  return (
    <div className='user-video-container'>
      {/* <div className="my-video-draggable">
        <video ref={myVideo} playsInline muted autoPlay />
       
      </div> */}

      <div className="profile-info">
          <img src={`https://ui-avatars.com/api/?name=${call.name}&background=0add8c&color=ffffff`} alt="img" />
          <h2>{call.name}</h2>
      </div>
      <video className={userVideoOn ? 'user-video-hide' : 'user-video' } playsInline {...userMicOn ? {muted : true} : {}}ref={userVideo} autoPlay width={`${width}%`} height={`${height}%`}
        style={{  
          width:`${width}%`,
          height:`${height}%`,
        }}
        > 
        </video>
        <Subtitles/>
    </div> 
    )
}


