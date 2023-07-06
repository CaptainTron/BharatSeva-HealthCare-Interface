import "./HomePage.css"
import Register from "../../SignAndLogin/Register/Register"
import SignIN from "../../SignAndLogin/SignIn/SignIn"
import DashComponents from "../DashboardComponents"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"

export default function HomePage() {

    const route = createBrowserRouter(createRoutesFromElements(
        <>
            <Route path="/login" element={<SignIN />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<DashComponents />} />
        </>

    ))

    return (
        <>
        <RouterProvider router={route}/>
        </>
    )

}