import React, { useEffect, useState } from 'react';
import "./User.css";
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
const User = () => {

  const [users, setUsers]=useState([]);
useEffect(()=>{
  const fetchData = async()=>{
   const respomse= await axios.get("http://localhost:5000/api/getAll")
     setUsers(respomse.data);
  }
  fetchData();
}, [])


const deleteUser= async(userId)=>{
 await axios.delete(`http://localhost:5000/api/delete/${userId}`)
 .then((res)=>{
      console.log(res);
      setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
      // console.log(res);
      toast.success(res.data.msg, {position:"top-right"})
 }).catch((err)=>{
  console.log(err);
 })
}
  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>Add User</Link> 

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>Sr. nO.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {
            users.map((user, index)=>{
              return(
                <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className='actionButtons'>
                    <button onClick={()=>{deleteUser(user._id)}}><i className="fa-solid fa-trash"></i></button> 
                    <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                </td>
            </tr>
              )
            } )
          }
           
        </tbody>
      </table>
    </div>
  )
}

export default User;
