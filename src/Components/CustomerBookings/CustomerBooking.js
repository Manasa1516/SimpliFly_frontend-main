import React, { useState } from 'react'
import './CustomerBooking.css'
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";

export default function CustomerBooking() {
  var [bookings,setBookings]=useState([])
  var userId=sessionStorage.getItem("userId")
  
  useState(() => {
    fetch(`http://localhost:5256/api/users/GetBookingByCustomerId?customerId=${userId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);        
        const pastBookings = res.filter(a => new Date(a.booking.schedule.departure) > new Date());
        const sortedBookings = pastBookings.sort((a, b) => new Date(b.booking.bookingTime) - new Date(a.booking.bookingTime));
        setBookings(sortedBookings);
      });
  });

  function getDate(date){
    const formattedDate = date.toLocaleDateString(); 
    const formattedTime = date.toLocaleTimeString();
    return { formattedDate, formattedTime };
  }
  function getTimeDifference(departure,arrival){
    const arrivalTime = new Date(arrival);
    const departureTime = new Date(departure);
    const timeDifference = arrivalTime - departureTime;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return hours+":"+minutes+" hours"
  }


  function CancelBooking(passengerBookingId){
    const confirmDelete = window.confirm(`Are you sure you want to cancel booking?`);
        if(confirmDelete){
        
          const token=sessionStorage.getItem('token')
          var RequestOption={
              method : 'DELETE',
              headers : {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              }
            }

            fetch(`http://localhost:5256/api/users/CancelBookingByPassenger?passengerId=${passengerBookingId}`,RequestOption)
              .then(res=>res.json())
              .then(res=>{
                  console.log(res);
                  alert('Booking cancelled successfully');
              })
              .catch(err => {
                  console.error('Error:', err);
                  alert('Error canceling booking.');
                });

        }
console.log(passengerBookingId);
  }

  const getAirlineImage = (airline) => {
    airline = airline.toLowerCase();
    switch (airline) {
      case "indigo":
        return indigo;
      case "air india":
        return airIndia;
      case "vistara":
        return vistara;
      default:
        return indigo;
    }
  };

  return (
    <div className='bookings-div'>
      <div className='get-bookings-div'>
        {bookings.map((booking, index) => (
        <div key={index} className="booking-list-div">
          <div className='booking-schedule-details'>
           <div className="booking-flight-detail">
            <img
                src={getAirlineImage(booking.booking.schedule.flight.airline)}
                className="airline-logo"
              />
              <div>
            <p className="-bookingflight-details">{booking.booking.schedule.flight.airline}</p>
            <p className="booking-flight-details">{booking.booking.schedule.flightId}</p>
            </div>
            </div>
            <div className="flight-source">
            <p className="flight-details">{booking.booking.schedule.route.sourceAirport.city}</p>
            <p className="flight-details">{getDate(new Date(booking.booking.schedule.departure)).formattedTime}</p>
            </div >
            <p className="time-diff">{getTimeDifference(booking.booking.schedule.departure,booking.booking.schedule.arrival)}</p>
            <div className="flight-destination">
            <p className="flight-details">{booking.booking.schedule.route.destinationAirport.city}</p>
            <p className="flight-details">{getDate(new Date(booking.booking.schedule.arrival)).formattedTime}</p>
            </div>
            <div className='delete-user-btn' onClick={()=>CancelBooking(booking.id)}>X</div>
            </div>
            <div className='date-seat-div'>
              <div>Departure Date : <b>{getDate(new Date(booking.booking.schedule.departure)).formattedDate}</b></div>
              <div>Seat : <b>{booking.seatDetail.seatNumber} ({booking.seatDetail.seatClass})</b></div>
            </div>
            <div className='booking-passenger-details'>
                <div>Passenger name : <b>{booking.passenger.name}</b></div>
                <div>Age : <b>{booking.passenger.age}</b></div>
                <div>Booking Date : <b>{getDate(new Date(booking.booking.bookingTime)).formattedDate}</b></div>
            </div>
        </div>))}
      </div>
    </div>
  )
}
