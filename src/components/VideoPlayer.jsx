import React, { useContext,useRef,useEffect } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import * as tf from "@tensorflow/tfjs";
import { SocketContext } from '../Context';
import {drawRect} from "./utilities"; 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    position: "relative",
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classStyle = useStyles();
  const canvasRef = useRef(null);
  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
    //'https://tensorflowjsrealtimemodel123.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json'
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
    SpeechRecognition.startListening({ continuous: 'true',language: 'en-IN'})
  }, []);

  console.log(myVideo)
    const {
      startListening,
      stopListening,
      transcript,
      listening,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
    

  return(
    <Grid container className={classStyle.gridContainer}>
      
        <Paper className={classStyle.paper}>
          <Grid item xs={12} md={6}>
          {(callAccepted && !callEnded ) ? (
            <div>
              {console.log("hi")}
              <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
              <div>
              <button
                onClick={startListening}
                >start
              </button>
                {console.log(listening)}
                <video playsInline muted ref={userVideo} autoPlay 
                  style={{
                    display:'flex',
                    position: "relative",
                    textAlign: "center",
                    zIndex: 9,
                    width: 640,
                    height: 480,
                    right:'100 px'
                  }}
                >
                  
                </video>
                <p style={{backgroundColor:'#92a8d1'}}>
                  {'>'}{transcript}{console.log({transcript})}
                  </p>
                <canvas ref={canvasRef}
                  style={{
                    position: 'absolute',
                    textAlign: "center",
                    zIndex: 10,
                    right:'10px',
                    bottom :'10px'
                  }}
                />
              </div>
            </div>) : (
            <div>
              <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
              <button
                onClick={startListening}
                >start
              </button>
                {console.log(listening)}
                  <video playsInline muted ref={myVideo} autoPlay 
                    style={{
                      display:'flex',
                      position:'relative',
                      textAlign: "center",
                      zindex: 9,
                      width: 640,
                      height: 480,
                    }}
                  >
                  </video>
                  <p style={{backgroundColor:'#92a8d1'}}>
                  {'>'}{transcript}{console.log({transcript})}
                  </p>
            </div>)}
          </Grid>
        </Paper>
      

    </Grid>
  )

  // return (
  //   <Grid container className={classStyle.gridContainer}>
  //     {stream && (
  //       <Paper className={classStyle.paper}>
  //         <Grid item xs={12} md={6} style={{postion:'relative'}}>
  //           <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
  //           <video playsInline muted ref={myVideo} autoPlay 
  //           style={{
  //             display:'flex',
  //             position:'relative',
  //             textAlign: "center",
  //             zindex: 9,
  //             width: 640,
  //             height: 480,
  //           }}
  //           />
  //         </Grid>
  //       </Paper>
  //     )}
  //     {callAccepted && !callEnded && (
  //       <Paper className={classStyle.paper}>
  //         <Grid item xs={12} md={6}>
  //           <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
  //           <div>
  //           <video playsInline ref={userVideo} autoPlay 
  //           style={{
  //             display:'flex',
  //             position: "absolute",
  //             textAlign: "center",
  //             zIndex: 9,
  //             width: 640,
  //             height: 480,
  //             right:'80px'
  //           }}
  //           />
  //           <canvas ref={canvasRef}
  //           style={{
  //             position: "absolute",
  //             textAlign: "center",
  //             zIndex: 10,
  //             right:'80px'

  //           }}
  //           />
  //           </div>
  //         </Grid>
  //       </Paper>
  //     )}
  //   </Grid>
  // )
}

export default VideoPlayer;
