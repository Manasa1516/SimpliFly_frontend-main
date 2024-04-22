import React, { useState } from 'react'
import './GetUser.css'
import axios from 'axios';

export default function GetUser() {
    var [users,setUsers]=useState([])

    useState(() => {
        const token=sessionStorage.getItem('token')
        const httpHeader={
          headers:{'Authorization':'Bearer '+token}
      }

        fetch("http://localhost:5256/api/admin/dashboard/Users/AllCustomers",httpHeader)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setUsers(res);
          });
      });

      const token=sessionStorage.getItem('token')
      function DeleteUser(username){
        const confirmDelete = window.confirm(`Are you sure you want to delete user ${username}?`);
        if(confirmDelete){
          var RequestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" ,
            'Authorization':'Bearer '+token},
          };
  
          fetch(`http://localhost:5256/api/admin/dashboard/DeleteUserByUsername?username=${username}`,RequestOptions)
          .then((res)=>res.json)
          .then((res)=>{console.log(res)})
          .catch((err) => {
            alert("Something went wrong");
          });
        }        
      }

  return (
    <div className='getuser-div'> 
      <div className='get-user-div'>
        {users.map((user, index) => (
        <div key={index} className="user-list-div">
            <div className='user-name-div user-row'><p>Name : </p>{user.name}</div>
            <div className='user-gender-div user-row'><p>Gender : </p>{user.gender}</div>            
            <div className='user-email-div user-row'><p>Email : </p>{user.email}</div>
            <div className='user-phone-div user-row'><p>Phone : </p>{user.phone}</div>
            <div className='delete-user-btn' onClick={()=>DeleteUser(user.username)}>X</div>
        </div>))}
      </div>
    </div>
  )
}
