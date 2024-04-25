import React, { useEffect, useState } from "react";
import "./UpdateFlight.css";
import axios from "axios";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

export default function UpdateFlight() {
  const [updateAirline,setUpdateAirline]=useState(true)
  const [updateSeats,setUpdateSeats]=useState(false)
  const [updateStatus,setUpdateStatus]=useState(false)


  var [flightNumber,setFlightNumber]=useState()
  var [airline,setAirline]=useState()
  var [seats,setSeats]=useState()
  var [status,setStatus]=useState()
  var [flights, setFlights] = useState([
    {
      airline: "",
      flightNumber: "",
      totalSeats: "",
      basePrice: "",
      status:"",
    },
  ]);
  
  const token=sessionStorage.getItem('token')

  var updateAirlineDetail={}
  var updateSeatsDetail={}
  var updateStatusDetail={}

  useEffect(() => {
    const token=sessionStorage.getItem('token')
    const httpHeader={
      headers:{'Authorization':'Bearer '+token}
  }
    axios
      .get("http://localhost:5256/api/Flight",httpHeader)
      .then(function (response) {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })},[]);

      const handleFlightNumberChange = (e) => {
        setFlightNumber(e.target.value);
      };

    var UpdateFlightAirline=(e)=>{
      if(!flightNumber || !airline){
        alert("Please enter the required details")
        return
      }
        e.preventDefault();
        updateAirlineDetail.flightNumber=flightNumber;
        updateAirlineDetail.airline=airline;
        console.log(updateAirlineDetail)

        var RequestOption={
            method : 'PUT',
            headers : {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body : JSON.stringify(updateAirlineDetail)
        }

        fetch("http://localhost:5256/api/Flight",RequestOption)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                alert('Flight airline update successfully');
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error updating flight.');
              });
    }

    var UpdateFlightSeats=(e)=>{
      if(!flightNumber || !seats){
        alert("Please enter the required details")
        return
      }
        e.preventDefault();
        updateSeatsDetail.flightNumber=flightNumber;
        updateSeatsDetail.totalSeats=parseInt(seats);
        console.log(updateSeatsDetail)

        var RequestOption={
            method : 'PUT',
            headers : {'Content-Type':'application/json',
            'Authorization':'Bearer '+token},
            body : JSON.stringify(updateSeatsDetail)
        }


        fetch("http://localhost:5256/api/Flight/UpdateTotalSeats",RequestOption)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                alert('Flight seats update successfully');
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error updating flight.');
              });
    }
    var UpdateFlightStatus=(e)=>{
      if(!flightNumber || !status){
        alert("Please enter the required details")
        return
      }
        e.preventDefault();
        updateStatusDetail.flightNumber=flightNumber;
        updateStatusDetail.Status=parseInt(status);
        console.log(updateStatusDetail)

        var RequestOption={
            method : 'PUT',
            headers : {'Content-Type':'application/json',
            'Authorization':'Bearer '+token},
            body : JSON.stringify(updateStatusDetail)
        }


        fetch("http://localhost:5256/api/Flight/UpdateStatus",RequestOption)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                alert('Flight status update successfully');
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error updating flight status.');
              });
    }
  return (
      <div className="update-flight-div">
        <div className="update-options-div">
          <div className="update-airline-btn" onClick={()=>{
            setUpdateAirline(true);
            setUpdateSeats(false);
            setUpdateStatus(false);
          }}>Update Airline</div>
          <div className="update-seats-btn" onClick={()=>{
            setUpdateAirline(false);
            setUpdateSeats(true);
            setUpdateStatus(false);
          }}>Update Seats</div>
          <div className="update-seats-btn" onClick={()=>{
            setUpdateAirline(false);
            setUpdateSeats(false);
            setUpdateStatus(true);
          }}>Update Status</div>
          
        </div>
        <div className="update-div">
          {updateAirline && <div className="update-airline">
                <form>
                    <div className="flightnumber-input-div">
                        <label htmlFor="flight-number" style={{ marginLeft: '150px' }} ><b>Flight Number :</b> </label>
                        <select
            className="select-destination-airport"
            onChange={handleFlightNumberChange}
          >
            <option value="0"style={{ marginLeft: '50px' }}>--Select flight--</option>
            {flights.map((flight) => (
              <option key={flight.flightNumber} value={flight.flightNumber}>
                {flight.flightNumber}
              </option>
            ))}
          </select>
                    </div>
                    <div className="airline-input-div">
                        <label htmlFor="airline"style={{ marginLeft: '150px' }}><b>Airline :</b> </label>
                        <input type="text" placeholder="Enter Airline" value={airline} onChange={(e)=>setAirline(e.target.value)}style={{ marginLeft: '-50px' }}/>
                    </div>
                    <button type='button' className='update-flight-btn' onClick={UpdateFlightAirline}>Update Flight</button>
                </form>
            </div>}
            {updateSeats && <div className="update-seats">
                <form>
                    <div className="flightnumber-input-div">
                        <label htmlFor="flight-number"style={{ marginLeft: '150px' }}><b>Flight Number :</b> </label>
                        <select
            className="select-destination-airport"
            onChange={handleFlightNumberChange}
          >
            <option value="0"style={{ marginLeft: '50px' }}>--Select flight--</option>
            {flights.map((flight) => (
              <option key={flight.flightNumber} value={flight.flightNumber}>
                {flight.flightNumber}
              </option>
            ))}
          </select>
                    </div>
                    <div className="seats-input-div">
                        <label htmlFor="seats"style={{ marginLeft: '150px' }}><b>Seats :</b> </label>
                        <input type="number" placeholder="Enter Seats" value={seats} onChange={(e)=>setSeats(e.target.value)}/>
                    </div>
                    <button type='button' className='update-flight-btn' onClick={UpdateFlightSeats}>Update Flight</button>
                </form>
            </div>}
            {updateStatus && <div className="update-status">
                <form>
                    <div className="flightnumber-input-div">
                        <label htmlFor="flight-number"style={{ marginLeft: '140px' }}><b>Flight Number :</b> </label>
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
                    </div>
                    <div className="status-input-div">
                        <label htmlFor="status"style={{ marginLeft: '150px' }}><b>Status :</b> </label>
                        <input type="number" placeholder="Enter Status" value={status} onChange={(e)=>setStatus(e.target.value)}style={{ marginLeft: '77px' }}/>
                    </div>
                    <button type='button' className='update-flight-btn' onClick={UpdateFlightStatus}>Update Flight</button>
                </form>
            </div>}
          </div>
      </div>
  );
}
