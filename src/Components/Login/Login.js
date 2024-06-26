import React, { useState } from "react";
import "./Login.css";
import userImg from "../../Assets/Images/user.png";
import key from "../../Assets/Images/key.png";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "./Images/image.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchFlightResultSlice from "../../SearchFlightResultSlice";


export default function Login() {
  const navigate = useNavigate();
  var [Username, setUsername] = useState('');
  var [Password, setPassword] = useState('');
  var [userDetails, setUserDetails] = useState([]);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const validateUsername = (username) => {
    if(!username)
    {
      setUsernameError("Please enter username");
      return false;
    }
    else if (/^[^a-zA-Z0-9]/.test(username)) {
      setUsernameError('Username should not start with a special character.');
      return false;
    } else if (/^\d/.test(username)) {
      setUsernameError('Username should not start with a digit.');
      return false;
    }
     else 
     {
      setUsernameError('');
      return true;
    }
  };

  const validatePassword = (password) => {
    if(!password)
    {
       setPasswordError("Please enter password");
       return false;
    }
      
      setPasswordError("");
      return true;

  };
  var user = {};
  var Login = (e) => {
    if (validateUsername(Username) && validatePassword(Password)) {
      setUsernameError("");
      setPasswordError("");
}
else {
 setFormError("Enter all required fields.")
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
        toast(`Login success - ${res.username}. Click here to Continue`, {
          onClick: () => navigate("/searchFlightResult")});

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
        if(validateUsername(Username) && validatePassword(Password))
        {
          setFormError("Invalid Credentials ");
        }
      });
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-div">
          <h3></h3>
          <h3></h3>
          <h3>Welcome Back</h3>
          
          <div className="login-img"><img src={loginImage} alt="Login Image" /></div>
          <form>
          
            <div className="username-div">
              <h2> </h2>
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
            <span style={{ color: 'red' }}>{usernameError}</span>
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
            <span style={{ color: 'red' }}>{passwordError}</span>
            <h6 className="forgot-password" onClick={()=>navigate('/UpdatePassword')}>forgot password?</h6>
            <input type="submit" value="Login" id="login-btn" onClick={Login} />
            <span style={{ color: 'red' }}>{formError}</span>
            <h6 className="register-user" style={{ color: 'blue', cursor: 'pointer' }} onClick={()=>navigate('/registerUser')}>Sign Up as Customer</h6>
            <h6 className="register-user" style={{ color: 'blue', cursor: 'pointer' }} onClick={()=>navigate('/register')}>Sign Up as Flight Owner</h6>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
