import React, { useState } from 'react'
import'./ManageBookings.css'
import GetBookings from '../GetBookings/GetBookings'

export default function ManageBooking() {
    const [booking,setBooking]=useState(true)
  const [cancelBooking,setCancelBooking]=useState(false)

  return (
    <div>
      <div className="container-body">
        <div className="sidebar manage-booking-sidebar">
            <div className="sidebar-container">
            <div className="sidebar-options booking-btn-div" onClick={()=>{
              setBooking(true);
              setCancelBooking(false);
            }}>
                Get Bookings
            </div>
            <div className="sidebar-options cancel-booking-btn-div" onClick={()=>{
              setBooking(false);
              setCancelBooking(true);
            }}>
                Cancel Bookings
            </div>
        </div>
        </div>
        <div className="container-main">
            {booking && <div className="get-bookings">
                <GetBookings/>
            </div>}
            {cancelBooking && <div className="cancel-bookings">
            </div>}
        </div>
      </div>
    </div>
  )
}
