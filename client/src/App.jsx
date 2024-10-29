import React from 'react'
import "./App.css";
import  {createBrowserRouter, RouterProvider } from "react-router-dom"
import User from './Components/getUser/User';
import Add from './Components/addUser/Add';
import Edit from './Components/updateUser/Edit';
const App = () => {
  const route=createBrowserRouter([{
    path:"/",
    element:<User/>,
  },
  {
    path:"/add",
    element:<Add/>,
  },
  {
    path:"/edit/:id",
    element:<Edit/>,
  },
])
  return (
    <div>
      <RouterProvider router={route}>
      
      </RouterProvider>
    </div>
  )
}

export default App
