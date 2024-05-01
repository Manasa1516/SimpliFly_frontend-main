import React from 'react'
import './RegisteredSuccessfully.css'
import greenTick from '../../Assets/Images/green-tick.png'
import { useNavigate } from 'react-router-dom'

export default function RegisteredSuccessfully() {
  var navigate=useNavigate()

  function Login(){
    navigate('/login')
  }
  return (
    <div className='registration-body-div'>
      <div className='registration-msg-div'>
        <img src={greenTick} className='green-tick'/>
        <h3>Account Created Successflly</h3>
        <button onClick={Login} className="login-here-btn">Login</button>
      </div>
    </div>
  )
}
