import React, { useEffect, useState } from 'react'
import './UpdateSchedule.css'
import axios from 'axios';
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import editIcon from "../../Assets/Images/edit-icon.png";

export default function UpdateSchedule() {

  var [flights, setFlights] = useState([]);
  var [airports, setAirports] = useState([]);
  var [schedules,setSchedules]=useState([])
  var [flightNumber,setFlightNumber]=useState();
  var [scheduleId,setScheduleId]=useState();
  var [departureTime, setDepartureTime] = useState();
  var [arrivalTime, setArrivalTime] = useState();

  const token=sessionStorage.getItem('token')

  var [displaySchedule,setDisplaySchedule]=useState(true)
  var [displayUpdateOptions,setDisplayUpdateOptions]=useState(false)
  
  var [displayUpdateFlight,setDisplayUpdateFlight]=useState(true)  
  var [displayUpdateDateTime,setDisplayUpdateDateTime]=useState(false)

  
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const minDateTime = currentDate.toISOString().slice(0, 16);

  function getDate(date){
    const formattedDate = date.toLocaleDateString(); 
    const formattedTime = date.toLocaleTimeString();

    return { formattedDate, formattedTime };
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const httpHeader = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .get("http://localhost:5256/api/Flight", httpHeader)
      .then(function (response) {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    const token=sessionStorage.getItem('token')
    const httpHeader={
      headers:{'Authorization':'Bearer '+token}
  }
      axios.get("http://localhost:5256/api/Schedule",httpHeader)
                .then(function(response){
                    setSchedules(response.data)
                })
                .catch(function(err){
                    console.log(err)
                })
  },[])


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

  const handleFlightNumberChange = (e) => {
    setFlightNumber(e.target.value);
  };
  const handleDepartureTimeChange = (e) => {
    setDepartureTime(e.target.value);
  };
  const handleArrivalTimeChange = (e) => {
    setArrivalTime(e.target.value);
  };


  function UpdateScheduleFlight(){
    if(!flightNumber){
      alert("Select Flight")
      return 
    }
    var updateDetails={}
    updateDetails.scheduleId=scheduleId
    updateDetails.flightNumber=flightNumber
    var RequestOptions={
      method : 'Put',
      headers : {'Content-Type':'Application/json',
      'Authorization':'Bearer '+token},
      body : JSON.stringify(updateDetails)
    }

    fetch("http://localhost:5256/api/Schedule/UpdateScheduledFlight",RequestOptions)
    .then(res=>res.json)
    .then(res=>{console.log(res)
    alert("Updated flight for the Schedule")})
    .catch((err)=>{
      console.log(err)
    })
  }

  function UpdateScheduleDate(){
    if(departureTime==arrivalTime){
      alert("Departure and arrival time cannot be same")
      return
    }
    var updateDetails={}
    updateDetails.scheduleId=scheduleId
    updateDetails.departureTime=departureTime
    updateDetails.arrivalTime=arrivalTime
    var RequestOptions={
      method : 'Put',
      headers : {'Content-Type':'Application/json',
      'Authorization':'Bearer '+token},
      body : JSON.stringify(updateDetails)
    }

    fetch("http://localhost:5256/api/Schedule/UpdateScheduledTime",RequestOptions)
    .then(res=>res.json)
    .then(res=>{console.log(res)
    alert("Updated Time for the Schedule")})
    .catch((err)=>{
      console.log(err)
    })
  }
  

  function DisplayUpdate(scheduleId){
    setScheduleId(scheduleId)
    setDisplayUpdateOptions(true)
    setDisplaySchedule(false)
  }
  function Cancel(){
    setDisplayUpdateOptions(false)
    setDisplaySchedule(true)
  }

  function DisplayUpdateDate(){
    setDisplayUpdateFlight(false)
    setDisplayUpdateDateTime(true)
  }
  function DisplayUpdateFlight(){
    setDisplayUpdateFlight(true)
    setDisplayUpdateDateTime(false)
  }

  return (
    <div className='update-schedule-div'>

{displaySchedule && <div className='schedule-div'>        
        {schedules.map((schedule,index)=>
        <div key={index} className='schedule-list-div'>
          <div className='schedule-flight-detail'>
            <div><b>Flight Number :</b> {schedule.flightId}</div>
            <div><b>Airline :</b> {schedule.flight.airline}
            <img
                src={getAirlineImage(schedule.flight.airline)}
                className="airline-logo"
              />
            </div>
          </div>
          <div className='schedule-route-detail'>
          <div className='schedule-source-detail'>
            <div><b>Source Airport :</b> {schedule.route.sourceAirport.city}</div>
            <div><b>Departure :</b> {getDate(new Date(schedule.departure)).formattedDate} {getDate(new Date(schedule.departure)).formattedTime}</div>
            </div>
            <div className='schedule-destination-detail'>
            <div><b>Destination Airport :</b>{schedule.route.destinationAirport.city}</div>
            <div><b>Arrival :</b> {getDate(new Date(schedule.arrival)).formattedDate} {getDate(new Date(schedule.arrival)).formattedTime}</div>
            </div>
            <img src={editIcon} onClick={()=>DisplayUpdate(schedule.id)} className='edit-icon'/>
            </div>
        </div>
        )}
    </div>}


      {displayUpdateOptions && <div className='update-schedule-options'>
        <div className='update-option-btn'>
            <div className='btn1' onClick={DisplayUpdateFlight}>Update Flight</div>
            <div className='btn1'onClick={DisplayUpdateDate}>Update DateTime</div>
        </div>
        {displayUpdateFlight && <div className='update-schedule-flight'>
        <label htmlFor="flight-number">
            <b>Flight Number : </b>
          </label>
          <select
            className="select-destination-airport"
            onChange={handleFlightNumberChange}
          >
            <option value="0">--Select flight--</option>
            {flights.map((flight) => (
              <option key={flight.flightNumber} value={flight.flightNumber}>
                {flight.flightNumber}
              </option>
            ))}
          </select>
          <button className='update-schedule-FLight-btn' onClick={UpdateScheduleFlight}>Update Flight</button>
          <button className='update-schedule-FLight-btn' onClick={Cancel}>Cancel</button>
        </div>}

        {displayUpdateDateTime && <div className='update-schedule-dateTime'>
        <div className="departure-time-div">
          <label htmlFor="departure-time">
            <b>Departure Time : </b>
          </label>
          <input
            type="datetime-local"
            value={departureTime}
            onChange={handleDepartureTimeChange}
            min={minDateTime}
          />
        </div>

        <div className="departure-time-div">
          <label htmlFor="departure-time">
            <b>Arrival Time :</b>
          </label>
          <input
            type="datetime-local"
            value={arrivalTime}
            onChange={handleArrivalTimeChange}
            min={minDateTime}
          />
          
        </div>
          <button className='update-schedule-FLight-btn' onClick={UpdateScheduleDate}>Update Flight</button>
          <button className='update-schedule-FLight-btn' onClick={Cancel}>Cancel</button>
        </div>}
      </div>}
    </div>
  )
}
