import React, { useContext,useEffect} from 'react';
import { SocketContext } from '../../Context';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './Subtitles.css'

export default function Subtitles() {
  const { sendMessage, messages } = useContext(SocketContext);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();


  useEffect(()=>{
    SpeechRecognition.startListening({ continuous: true})
  }, []);


  return(
    <div className='subtitles-container'>
      <p className='my-subtitles' onChange={()=>sendMessage(transcript)} >
              {transcript }
      </p>
      <p className='user-subtitles' >
        {'>>'+messages}
      </p>
    </div>
  )

}


