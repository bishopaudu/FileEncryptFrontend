import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FileTable from './FileTable.jsx'
import FileUpload from './FileUpload.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
  },
  {
    path:'FileTable',
    element:<FileTable/>,
  },
  {
    path:'/FileUpload/:user',
    element:<FileUpload/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
