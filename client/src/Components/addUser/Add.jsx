import React, { useState } from 'react';
import "./Add.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
const Add = () => {
  const users={
    fname:"",
    lname:"",
    email:"",
    password:""
  }

 const [user, setUser]=useState(users);
const navigate=useNavigate();
const inputHandler =(e)=>{
const {name, value}=e.target;
  setUser({...user, [name]:value});
//   console.log(user);
}

const submitForm= async(e)=>{
   e.preventDefault();
   await axios.post("http://localhost:5000/api/create", user)
   .then((res)=>{
    // console.log(res);
    toast.success(res.data.msg, {position:"top-right"}) 
    navigate("/");
}).catch(err => console.log(err));
}
// const submitForm = async (e) => {
//     e.preventDefault();
//     try {
//        const res = await axios.post("http://localhost:5000/api/create", user);
//        console.log(res);
//        // Reset the form after successful submission
//        setUser (users);
//        // Optionally, you can show a success message to the user
//     } catch (err) {
//        console.log(err);
//        // Optionally, show an error message to the user
//     }
//  }


  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>

      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
    <div className="inputGroup">
        <label htmlFor="fname">First Name:</label>
        <input type="text" name="fname" id="fname" onChange={inputHandler} autoComplete='off' placeholder='First Name...'/>
        </div>
        <div className="inputGroup">
        <label htmlFor="lname">Last Name:</label>
        <input type="text" name="lname" id="lname"  onChange={inputHandler}  autoComplete='off' placeholder='Last Name...'/>
    </div> 
    <div className="inputGroup">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email"  onChange={inputHandler}  autoComplete='off' placeholder='Email...'/>
       </div>
       <div className="inputGroup">
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password"  onChange={inputHandler}  autoComplete='off' placeholder='Password...'/>
       </div>

       <div className="inputGroup">

        <button type="submit">ADD USER</button>
       </div>
          
      </form>
    </div>
  )
}

export default Add
