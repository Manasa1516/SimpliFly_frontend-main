import React from 'react'
import './FlightOwnerHome.css'
import { useNavigate } from 'react-router-dom'

export default function FlightOwnerHome() {
  var navigate=useNavigate()
  var username=sessionStorage.getItem('username')
  return (
    <div>
      <div className="background-img" id="background-img">
    <img src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?cs=srgb&dl=pexels-pixabay-62623.jpg&fm=jpg" className="sky-img"/>
    <h1>Hello {username}</h1>
  </div>
  <div className="fun-div" id="fun-div">
    <div className="child-div">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageFlight")}>
        <img src="https://cdn-icons-png.flaticon.com/512/7893/7893979.png" className="fun-img"/>
        <h4>Manage Flights</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageRoute")}>
        <img src="https://cdn-icons-png.freepik.com/512/4283/4283136.png" className="fun-img"/>
        <h4>Manage Route</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageSchedule")}>
        <img src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png" className="fun-img"/>
        <h4>Manage Schedules</h4>
      </div>
    </div>
    <div className="child-div">
      <div className="owner-function" onClick={()=>navigate('/flightOwner/manageBooking')}>
      <img src="https://cdn-icons-png.flaticon.com/512/4406/4406665.png" className="fun-img"/>
      <h4>Manage Bookings</h4>
    </div>
    </div>
  </div>
    </div>
  )
}
