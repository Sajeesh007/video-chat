import React, {useState} from 'react';
import {useAuth, useFirebase} from '../../Context'
import { Link, useHistory } from "react-router-dom";
import './Login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const firebase = useFirebase()
  const {setUser} = useAuth()

  const handleLogin = (e) =>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential)=>{
      setUser(userCredential.user.displayName)
      alert('logged in')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }).finally(()=>{
      history.push('/')
    })
  }

  return (
      <div className="login-container">
        <form className='form-wrapper'>
          <label htmlFor="fname">Email</label>
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
       
          <label htmlFor="lname">Password</label>
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </form>
        <div className="button-wrapper">
          <button onClick={handleLogin}>Login</button>
        </div>
        
      </div>
  );
}

export default Login;
