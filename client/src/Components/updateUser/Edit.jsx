import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-hot-toast";
import "../addUser/Add.css";
const Edit = () => {

  const users={
    fname:"",
    lname:"",
    email:""
  }
  const {id}=useParams();
  const navigate=useNavigate();
  const [user, setUser]=useState(users);


  const inputChangeHandler=(e)=>{
    const {name, value}=e.target;
    setUser({...user, [name]:value});
  }
 useEffect(()=>{
   axios.get(`http://localhost:5000/api/getOne/${id}`)
   .then((res)=>{
    //  console.log(res);
    setUser(res.data);
   })
   .catch((err)=>{
    console.log(err);
   })
 }, [id]);
const submitForm=async(e)=>{
  e.preventDefault();
  await axios.put(`http://localhost:5000/api/update/${id}`, user)
  .then((res)=>{
   // console.log(res);
   toast.success(res.data.msg, {position:"top-right"}) 
   navigate("/");
}).catch(err => console.log(err));
}
  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>

      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
    <div className="inputGroup">
        <label htmlFor="fname">First Name:</label>
        <input type="text" value={user.fname} onChange={inputChangeHandler} name="fname" id="fname"  autoComplete='off' placeholder='First Name...'/>
        </div>
        <div className="inputGroup">
        <label htmlFor="lname">Last Name:</label>
        <input type="text" value={user.lname} onChange={inputChangeHandler} name="lname" id="lname"  autoComplete='off' placeholder='Last Name...'/>
    </div> 
    <div className="inputGroup">
        <label htmlFor="email">Email:</label>
        <input type="email" value={user.email} onChange={inputChangeHandler} name="email" id="email"  autoComplete='off' placeholder='Email...'/>
       </div>
      

       <div className="inputGroup">

        <button type="submit">UPDATE USER</button>
       </div>
          
      </form>
    </div>
  )
}

export default Edit
