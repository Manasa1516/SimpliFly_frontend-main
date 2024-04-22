import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './GetRoute.css'

export default function GetRoute() {

    var [routes,setRoutes]=useState([])

    useEffect(() => {
      const token=sessionStorage.getItem('token')
    const httpHeader={
      headers:{'Authorization':'Bearer '+token}
  }
      axios.get("http://localhost:5256/api/Route",httpHeader)
                    .then(function(response){
                        setRoutes(response.data)
                        console.log(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                      })
                    },[]);

  return (
    <div className='route-div'>
        {routes.map((route,index)=>
        <div key={index} className='route-list-div'>
            <div><b>RouteId :</b> {route.id}</div>
            <div><b>Source Airport :</b> {route.sourceAirport.name}, {route.sourceAirport.city}</div>
            <div><b>Destination Airport :</b> {route.destinationAirport.name}, {route.destinationAirport.city}</div>
        </div>
        )}
    </div>
  )
}
