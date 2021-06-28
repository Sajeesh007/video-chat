import React,{useState,useEffect,useContext} from 'react';
import {useFirebase,useAuth,SocketContext} from '../../Context'
import { useHistory } from 'react-router-dom';
import './Signup.css'

export default function Signup() {

  const firebase = useFirebase()
  const {setUser} = useAuth()
  const {userSigned} = useContext(SocketContext)
  const history =useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  
  const handleSubmit = () =>{
    firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
    .then((userCredential) => {
      userCredential.user.updateProfile({ displayName: username})
      setUser(username)
      alert('New account created. Now Log in to enjoy the experience')
    })
    .catch((error) => {
        console.log(error);
    }).finally(()=>{
      history.push('/login')
    })
  }
  const handleClick = (e) =>{
    e.preventDefault()
    history.push('/login')
  }

  useEffect(() => {
    if(userSigned){
      history.push('/')
    }
  }, [])


  return (
    <div className="signup-container">
      <form className='form-wrapper'>
        <label htmlFor="uname">Username</label>
        <input
          className="input"
          type="text"
          id="uname"
          name="name"
          onChange={(e)=>setUsername(e.target.value)}
        />
    
        <label htmlFor="ename">Email</label>
        <input
          className="input"
          type="email"
          id="ename"
          name="email"
          onChange={(e)=>setEmail(e.target.value)}
        />
     
        <label htmlFor="lname">Password</label>
        <input
          className="input"
          type="password"
          id="lname"
          name="password"
          onChange={(e)=>setPassword(e.target.value)}
        />
      </form>

      <div className="button-wrapper">
        <button onClick={handleSubmit}>Signup</button>
        <p>Already have an account ?</p>
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
}
