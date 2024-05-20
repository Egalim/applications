import { Children } from 'react'
import './App.css'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Auth from './entry/Auth'
import Reg from './entry/Reg'
import Account from './Account'
import Admin from './Admin'
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <Outlet />
      </>,
    children: [
      {
        path: "/",
        element: <Auth />
      },
      {
        path: "/reg",
        element: <Reg />
      },
      {
        path: "*",
        element: <Navigate to={"/"} />
      }

    ]
  }
])

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Account />
      }
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [{
      path: "/",
      element: <Admin />
    }]
  }
])

function App() {
  const id = localStorage.getItem("userId")
  const role = localStorage.getItem("role")

  return (
    id ?
    role === 1?
    <RouterProvider router={authRouter} />:
    <RouterProvider router={adminRouter} />:
      <RouterProvider router={router} />
  )
}

export default App
