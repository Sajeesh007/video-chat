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
  const [error, setError] = useState('')
  const [formErrorPassword, setFormErrorPassword] = useState(false)
  const [formErrorUsername, setFormErrorUsername] = useState(false)
  const [formErrorEmail, setFormErrorEmail] = useState(false)

  
  const handleSubmit = () =>{
    (formErrorUsername || formErrorEmail || formErrorPassword) ? 
    (alert('field cannot be empty')) :
    (firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
    .then((userCredential) => {
      userCredential.user.updateProfile({ displayName: username})
      setUser(username)
      alert('New account created. Now Log in to enjoy the experience')
      history.push('/login')
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          setError(true);
        } else {
          console.log(errorMessage);
        }
    }))
  }
  const handleClick = (e) =>{
    e.preventDefault();
    history.push('/login')
  }

  useEffect(() => {
    if(userSigned){
      history.push('/')
    }
  }, [])

  const handleUser= (e) =>{
    (e.target.value.length === 0) ? (setFormErrorUsername(true)) : (setFormErrorUsername( false))
    setUsername(e.target.value)
    
  }
  const handleEmail= (e) =>{
    (e.target.value.length === 0) ? (setFormErrorEmail(true)) : (setFormErrorEmail(false))
    setEmail(e.target.value)
  }
  const handlePassword= (e) =>{
    (e.target.value.length === 0) ? (setFormErrorPassword(true)) : (setFormErrorPassword(false))
    setPassword(e.target.value)

  }

  return (
    <div className="signup-container">
      <form className='form-wrapper'>
        <label htmlFor="uname">Username</label>
        <input
          className="input"
          type="text"
          id="uname"
          name="name"
          onChange={handleUser}
        />
          <p>{formErrorUsername&& 'Field cannot be empty'}</p>
        <label htmlFor="ename">Email</label>
        <input
          className="input"
          type="email"
          id="ename"
          name="email"
          onChange={handleEmail}
        />
          <p>{error && 'Email already in use' }{formErrorEmail && 'Field cannot be empty' }</p>
     
        <label htmlFor="lname">Password</label>
        <input
          className="input"
          type="password"
          id="lname"
          name="password"
          onChange={handlePassword}
        />
        <p>{formErrorPassword && 'Field cannot be empty' }</p>
      </form>

      <div className="button-wrapper">
        <button onClick={handleSubmit}>Signup</button>
        <p>Already have an account ?</p>
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
}
