import './App.css';
import HomePage from './HIP Interface/Dashboard/HomePage/HomePage';
import Register from './HIP Interface/SignAndLogin/Register/Register';
import SignIN from './HIP Interface/SignAndLogin/SignIn/SignIn';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from "react-router-dom"

function App() {
  // <RouterProvider router={route} />

  return (
    <HomePage/>
  );
}

export default App;
