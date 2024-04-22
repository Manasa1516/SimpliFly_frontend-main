import React, { useState } from "react";
import "./Login.css";
import background from "../../Assets/Images/plane.jpg";
import userImg from "../../Assets/Images/user.png";
import key from "../../Assets/Images/key.png";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  var [Username, setUsername] = useState('');
  var [Password, setPassword] = useState('');
  var [userDetails, setUserDetails] = useState([]);
  var user = {};
  var Login = (e) => {
    if(!Username || !Password){
      alert("Please enter username and password")
      return;
    }
    e.preventDefault();
    user.Username = Username;
    user.Password = Password;
    user.role = "";
    user.token = "";
    user.ownerId = "";
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch("http://localhost:5256/api/User/Login", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("username", res.username);
        sessionStorage.setItem("role", res.role);
        alert("Login success - " + res.username);

        if (sessionStorage.getItem("role") == "flightOwner") {
          var getRequestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const params = new URLSearchParams({
            username: res.username,
          });

          fetch(
            `http://localhost:5256/api/FlightOwner?${params.toString()}`,
            getRequestOptions
          )
            .then((response) => response.json())
            .then((response) =>
              sessionStorage.setItem("ownerId", response.ownerId)
            )
            .catch((err) => console.log(err));

          navigate("/flightOwner/home");
        } else if (sessionStorage.getItem("role") == "customer") {
          console.log("here");
          var getRequestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const params = new URLSearchParams({
            username: res.username,
          });

          fetch(
            `http://localhost:5256/api/users/GetCustomerByUsername?${params.toString()}`,
            getRequestOptions
          )
            .then((response) => response.json())
            .then((response) =>
              sessionStorage.setItem("userId", response.userId)
            )
            .catch((err) => console.log(err));

          navigate(-1);
        } else {
          var getRequestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const params = new URLSearchParams({
            username: res.username,
          });

          fetch(
            `http://localhost:5256/api/admin/dashboard/GetAdminByUsername?${params.toString()}`,
            getRequestOptions
          )
            .then((response) => response.json())
            .then((response) =>
              sessionStorage.setItem("adminId", response.adminId)
            )
            .catch((err) => console.log(err));

          navigate("/admin/home");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid username or password")
      });
  };

  return (
    <div>
      <div className="login-page">
        <img src={background} className="background-img" />
        <div className="login-div">
          <h3>Log into your account</h3>
          <form>
            <div className="username-div">
              <img src={userImg} />
              <input
                type="text"
                id="username-input"
                placeholder="Enter your username"
                className="login-inputs"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="password-div">
              <img src={key} />
              <input
                type="password"
                id="password-input"
                placeholder="Enter your password"
                className="login-inputs"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" id="login-btn" onClick={Login} />
            <h6 className="forgot-password" onClick={()=>navigate('/updatePassword')}>forgot password</h6>
          </form>
          <p className="register-text">
            Don't have account, register as-<br/>
            <span id="registerhere-text">
              <button className='register-option-btn' onClick={()=>navigate('/registerUser')}>Customer</button>
              <button className='register-option-btn' onClick={()=>navigate('/register')}>FlightOwner</button>
              <button className='register-option-btn' onClick={()=>navigate('/registerAdmin')}>Admin</button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
