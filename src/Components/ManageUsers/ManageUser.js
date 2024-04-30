import React, { useState } from "react";
import "./ManageUser.css";
import GetUser from "../GetUser/GetUser";
import GetFlightOwner from "../GetFlightOwner/GetFlightOwner";
import useronline from "./Images/useronline.png";

export default function ManageUser() {
  const [getUser, setGetUser] = useState(true);
  const [getFlightOwner, setGetFlightOwner] = useState(false);
  const [removeUser, setRemoveUser] = useState(false);
  const [removeFlightOwner, setRemoveFlightOwner] = useState(false);

  return (
    <div>
      <div className="container-body">
        <div className="sidebar">
          <div className="sidebar-container">
          <div className="dashboard-heading">
            <img src={useronline} className="user-online" style={{ display: "block", height: "50%", width:"50%",marginBottom: "10px",marginLeft:"70px" }}/>
          <h2 style={{ fontSize: "20px", color: "white",textAlign: "center"}}>Dashboard</h2>
          </div>
            <div
              className="sidebar-option"
              onClick={() => {
                setGetUser(true);
                setGetFlightOwner(false);
                setRemoveUser(false);
                setRemoveFlightOwner(false);
              }}
            >
              Get Users
            </div>

            <div
              className="sidebar-option"
              onClick={() => {
                setGetUser(false);
                setGetFlightOwner(true);
                setRemoveUser(false);
                setRemoveFlightOwner(false);
              }}
            >
              Get FlightOwner
            </div>
          </div>
        </div>
        <div className="container-main">
          {getUser && (
            <div className="get-User">
              <GetUser />
            </div>
          )}
          {getFlightOwner && (
            <div className="get-flightOwner">
              <GetFlightOwner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
