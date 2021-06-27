import React, { useContext } from 'react';
import { SocketContext } from '../../Context';

export default function MyVideo({width,height}) {
    const {myVideo,micOn,videoOn} = useContext(SocketContext);
    
    return (
        <div className="my-video-container" style={{position:'relative'}}>
            <video className='my-video' playsInline muted ref={myVideo} autoPlay width={`${width}px`} height={`${height}px`}
                    style={{
                        width:`${width}px`,
                        height:`${height}px`,
                    }}
            >
            </video>
             

        </div>      
    )
}

 
