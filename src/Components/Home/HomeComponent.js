import React from "react";
import "./HomeComponent.css";
import plane from "../../Assets/Images/plane.png";
import PopularDestination from "../PopularDestination/PopularDestination";
import { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { addSearchFlight } from "../../SearchFlightSlice";
import { addSearchFlightResult} from '../../SearchFlightResultSlice'
import { useDispatch } from "react-redux";
import SearchedFlightResult from "../SearchedFlightResult/SearchedFlightResult";

export default function HomeComponent() {
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  const currentDateTime = new Date().toISOString().split('T')[0];
  var navigate=useNavigate()
  var dispatch = useDispatch();
    
  var [airports, setAirports] = useState([]);
  var[dateOfJourney,setDateOfJourney]= useState(new Date());
  var[Origin,setOrigin]=useState('');
  var[Destination,setDestination]=useState('');
  var[Adult,setAdult]=useState(1);
  var[Child,setChild]=useState(0);
  var[SeatClass,setSeatClass]=useState('economy')
  var[searchFlightDetails,setSearchFlightDetails]=useState()
  var searchFlightDetails={}

  const handleSeatClassChange = (e) => {
    setSeatClass(e.target.value);
  };

  var searchFlight = (e) => {
    if(Adult>5 || Child>5){
      alert("Enter adult and child value less than 5");
      return;
    }
    e.preventDefault();
    if (!Origin || !Destination || !dateOfJourney ){
      alert('Please fill in all required fields');
      return;
    }

    searchFlightDetails.dateOfJourney = dateOfJourney;
    searchFlightDetails.Origin = Origin;
    searchFlightDetails.Destination = Destination;
    searchFlightDetails.Adult=Adult;
    searchFlightDetails.Child=Child;
    searchFlightDetails.SeatClass=SeatClass;
  
    dispatch(addSearchFlight({
      dateOfJourney:dateOfJourney,
      Origin:Origin,
      Destination:Destination,
      Adult:Adult,
      Child:Child,
      SeatClass:SeatClass
      }
    ))

    var requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    const params = new URLSearchParams({
      dateOfJourney: searchFlightDetails.dateOfJourney,
      Origin: searchFlightDetails.Origin,
      Destination: searchFlightDetails.Destination,
      Adult:searchFlightDetails.Adult,
      Child:searchFlightDetails.Child,
      SeatClass:searchFlightDetails.SeatClass
    });

    fetch(`http://localhost:5256/api/Flight/SearchFlight?${params.toString()}`, requestOptions)
      .then(res => res.json())
      .then(res => {
          console.log(res);
          if(res.length===0){
            alert("No flights available")
            return            
          }
          else{
            setSearchFlightDetails(res);
            dispatch(addSearchFlightResult({ searchFlightResult: res }));
            navigate('/searchFlightResult')
          }         

        })
      .catch(err => console.log(err));
      
  }
  
    const handleFlightTypeChange = (e) => {
      setIsRoundtrip(e.target.id === 'roundtrip');
    };

    useState(() => {
      fetch("http://localhost:5256/api/Route/GetAirports")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setAirports(res);
        });
    });

  return (
    <div>
      <div className="home-main">
        <div className="home-left">
          <a className="navbar-brand" href="#">
            
          </a>
        </div>
        <div className="flight-search-container">
          <div className="booking-form-container">
            <form>
              <div className="source-destination-div">
                <div className="departure-div">
                  <label htmlFor="departure">Flying from</label>
                  <input
                    className="form-control"
                    type="text"
                    value={Origin}
                    onChange={(e)=>setOrigin(e.target.value)}
                    placeholder="City or airport"
                    id="departure"
                    list="itemList"
                    required
                  />
                  <datalist id="itemList">
                    {airports.map((airport)=>(
                      <option key={airport.id} value={airport.city}>
                      {airport.city}
                    </option>
                    ))}
                  </datalist>
                </div>
                <div className="arrival-div">
                  <label htmlFor="arrival">Flying to</label>
                  <input
                    className="form-control"
                    type="text"
                    value={Destination}
                    onChange={(e)=>setDestination(e.target.value)}
                    placeholder="City or airport"
                    id="arrival"
                    list="itemList"
                    required
                  />
                  <datalist id="itemList">
                    {airports.map((airport)=>(
                      <option key={airport.id} value={airport.city}>
                      {airport.city}
                    </option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="depart-date-div">
                <span className="departing-txt">Departure</span>
                <input className="form-control date-select" type="date" value={dateOfJourney} 
                onChange={(e)=>setDateOfJourney(e.target.value)} required min={currentDateTime}/>
              </div>
              {isRoundtrip && (
        <div className="return-date-div">
          <span className="departing-txt">Return </span>
          <input className="form-control date-select" type="date" required />
        </div>
      )}
              <div className="passenger-count-div">
                <div className='adult-div'>
                <span className="adult-passenger">Adult (18+)</span>
                  <input type="number" id="adultpassengerCount" value={Adult} name="passengerCount"  min="1" max="5" onChange={(e)=>setAdult(e.target.value)}/>
                </div>
                <div className='child-div'>
                <span className="child-passenger">Child(0-17)</span>
                  <input type="number" id="childpassengerCount" value={Child} name="passengerCount" min="0" max="5" onChange={(e) => setChild(e.target.value)} />
                </div>
              </div>
              <select className="seatClass" value={SeatClass} onChange={handleSeatClassChange}> 
                  <option value='economy'>Economy</option>
                  <option value='premiumEconomy'>Premium Economy</option>
                  <option value='businessClass'>Business Class</option>
                </select>
              <div className="form-btn">
                <button className="submit-btn show-flight-btn" type="submit" onClick={searchFlight}>
                  Show flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <PopularDestination/>
      <Footer/>
    </div>
  );
}
