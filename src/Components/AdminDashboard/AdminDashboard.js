import React from 'react'
import './AdminDashboard.css'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
    
  var username=sessionStorage.getItem('username')
  var navigate=useNavigate()

  return (
    <div>
       <div className="background-img" id="background-img">
    <img src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?cs=srgb&dl=pexels-pixabay-62623.jpg&fm=jpg" className="sky-img"/>
    <h1>Hello {username}</h1>
  </div>
  <div className="fun-div" id="fun-div">
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageRoute")}>
        <img src="https://cdn-icons-png.freepik.com/512/4283/4283136.png" className="fun-img"/>
        <h4>Manage Route</h4>
      </div>
    </div>
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate("/admin/manageUser")}>
        <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" className="fun-img"/>
        <h4>Manage Users</h4>
      </div>
    </div>
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate('/flightOwner/manageBooking')}>
      <img src="https://cdn-icons-png.flaticon.com/512/4406/4406665.png" className="fun-img"/>
      <h4>Manage Bookings</h4>
    </div>
    </div>
  </div>
    </div>
  )
}
