import React, { useState } from "react";
import Profile from "../Profile/Profile";
import "./UserAccount.css";
import CustomerBooking from "../CustomerBookings/CustomerBooking";
import rightArrow from '../../Assets/Images/right-arrow.png'
import leftArrow from '../../Assets/Images/left-arrow.png'
import CustomerBookingHistory from "../CustomerBookings/CustomerBookingHistory";
import CancelledBookings from "../GetCancellBookingCustomer/GetCancelBooking";
import Footer from "../Footer/Footer";

export default function UserAccount() {
  var [profile, setProfile] = useState(true);
  var [bookings, setBookings] = useState(false);
  var [bookingsHistory, setBookingHistory] = useState(false);
  var [cancelledBookings, setCancelledBookings] = useState(false); // Add state for CancelledBookings

  var userRole = sessionStorage.getItem("role");

  var [isCustomer, setIsCustomer] = useState(userRole === "customer");
  var [isFlightOwner, setIsFlightOwner] = useState(userRole === "flightOwner");
  var [isAdmin, setIsAdmin] = useState(userRole === "admin");

  function DisplayOptions() {
    var sidebar = document.getElementById("account-sidebar");
    var mainContainer = document.getElementById("container-main");
    sidebar.style.display = "flex";
    mainContainer.style.display = "none";
  }
  function DisplayMain() {
    var sidebar = document.getElementById("account-sidebar");
    var mainContainer = document.getElementById("container-main");
    sidebar.style.display = "none";
    mainContainer.style.display = "flex";
  }

  return (
    <div>
      <div className="container-body">
        <div className="sidebar account-sidebar" id="account-sidebar">
          <div className="sidebar-container">
            <div className="more-profile-option">
              <img src={leftArrow} className="right-arrow" onClick={DisplayMain} />
            </div>
            <div
              className="sidebar-option custom-sidebar-option"
              onClick={() => {
                setProfile(true);
                setBookings(false);
                setBookingHistory(false);
                setCancelledBookings(false); // Ensure CancelledBookings is set to false
              }}
            >
              Profile
            </div>

            {isCustomer && (
              <div
                className="sidebar-option"
                onClick={() => {
                  setProfile(false);
                  setBookings(true);
                  setBookingHistory(false);
                  setCancelledBookings(false); // Ensure CancelledBookings is set to false
                }}
              >
                Bookings
              </div>
            )}
            {isCustomer && (
              <div
                className="sidebar-option"
                onClick={() => {
                  setProfile(false);
                  setBookings(false);
                  setBookingHistory(true);
                  setCancelledBookings(false); // Ensure CancelledBookings is set to false
                }}
              >
                Bookings History
              </div>
            )}
            {isCustomer && (
              <div
                className="sidebar-option"
                onClick={() => {
                  setProfile(false);
                  setBookings(false);
                  setBookingHistory(false);
                  setCancelledBookings(true); // Set CancelledBookings to true
                }}
              >
                Cancelled Bookings
              </div>
            )}
          </div>
        </div>
        <div className="container-main" id="container-main">
          <div className="more-profile-option">
            <img src={rightArrow} className="right-arrow" onClick={DisplayOptions} />
          </div>
          {profile && (
            <div className="get-User get-User-div ">
              <Profile />
            </div>
          )}
          {bookings && <div className="get-bookings"><CustomerBooking /></div>}
          {bookingsHistory && <div className="get-bookings-history"><CustomerBookingHistory /></div>}
          {cancelledBookings && <div className="get-cancelled-bookings"><CancelledBookings /></div>} {/* Render CancelledBookings if cancelledBookings state is true */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

