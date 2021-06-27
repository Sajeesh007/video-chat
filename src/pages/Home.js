import './Home.css'
import Sidebar from '../components/notification/Sidebar'
import Notifications from '../components/notification/Notifications'
import Signup from '../components/authentication/Signup'
import Login from '../components/authentication/Login'
import MyVideo from '../components/videoPlayer/MyVideo'
import Header from '../components/other/Header'
import { SocketContext } from '../Context';
import { useContext } from 'react'


export default function Home({isHome,isSignup,isLogin}) {


    const {myVideo} = useContext(SocketContext)

    return (

        <>
            <div className='home-container'>
                <div className='header-wrapper'>
                    <Header/>
                </div>
                <div className='content-wrapper'>
                    <div className="sidebar">
                        {isHome ? <Sidebar/>
                        : isSignup ? <Signup/> : <Login/>
                        } 
                    </div>
                    <div className="videoplayer">
                        <video ref={myVideo} width={640} height={480} playsInline muted autoPlay/>
                    </div>
                </div>
                <div className="notification-footer">
                    <Notifications/>
                </div>
            </div>
        </>
    )
}

