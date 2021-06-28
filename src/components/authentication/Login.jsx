import React, {useState} from 'react';
import {useAuth, useFirebase} from '../../Context'
import { Link, useHistory } from "react-router-dom";
import './Login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [formErrorPassword, setFormErrorPassword] = useState(false)
  const [formErrorEmail, setFormErrorEmail] = useState(false)


  const history = useHistory()
  const firebase = useFirebase()
  const {setUser} = useAuth()

  const handleLogin = (e) =>{
    e.preventDefault();
    ( formErrorEmail || formErrorPassword) ? 
    (alert('Field cannot be empty')) :
    (firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential)=>{
      setUser(userCredential.user.displayName)
      alert('Logged in')
      history.push('/')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        setError('Wrong password');
      } else {
        console.log(errorMessage);
      }
    }))   
  }
  const handlePassword= (e) =>{
    (e.target.value.length === 0) ? (setFormErrorPassword(true)) : (setFormErrorPassword( false))
    setPassword(e.target.value)
    
  }
  const handleEmail= (e) =>{
    (e.target.value.length === 0) ? (setFormErrorEmail(true)) : (setFormErrorEmail(false))
    setEmail(e.target.value)
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
            onChange={handleEmail}
          />
          <p>{formErrorEmail && 'Field cannot be empty'}</p>
          <label htmlFor="lname">Password</label>
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={handlePassword}
          />
          <p>{error} {formErrorPassword && 'Field cannot be empty'}</p>
        </form>
        <div className="button-wrapper">
          <button onClick={handleLogin}>Login</button>
        </div>
        
      </div>
  );
}

export default Login;
