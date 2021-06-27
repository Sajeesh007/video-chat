import React, { useContext,useRef,useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import { SocketContext } from '../../Context';
import {drawRect} from './Draw'

export default function Canvas({width,height}) {
    const {userVideo,} = useContext(SocketContext);
    const canvasRef = useRef(null);

    // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
   
    const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel123.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
      
    }, 16.7);
  }

  const detect = async (net) => {
    // Check data is available
    if (
      typeof userVideo.current !== "undefined" &&
      userVideo.current !== null && userVideo.current.readyState === 4
    ) {
      // Get Video Properties
      const video = userVideo.current;
      const videoWidth = userVideo.current.videoWidth
      const videoHeight = userVideo.current.videoHeight
      
      // Set video widt
      userVideo.current.width = videoWidth;
      userVideo.current.height = videoHeight;

  
      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      
      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640,480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)

      const boxes = await obj[1].array()
      const classes = await obj[2].array()
      const scores = await obj[4].array()
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)}); 

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)
      
    }
  };

  useEffect(()=>{
    runCoco()
  }, []);

    return (
        <div>
            <canvas ref={canvasRef} width={`${width}%`} height={`${height}%`}
                  style={{
                    position: 'absolute',
                    textAlign: "center",
                    zIndex: '20',
                    left:0,
                    bottom :'110px',
                    objectFit: 'fill',
                    width:`${width}%`,
                    height:`${height}%`,
                    top:'0px',
                    right:'0px',      
                  }}
                />
        </div>
    )
}

