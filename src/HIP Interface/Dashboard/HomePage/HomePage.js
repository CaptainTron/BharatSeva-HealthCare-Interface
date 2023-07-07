import "./HomePage.css"
import Register from "../../SignAndLogin/Register/Register"
import SignIN from "../../SignAndLogin/SignIn/SignIn"
import DashComponents from "../DashboardComponents"
import NotFound from "../NotFound"
import ErrorElements from "../ErrorElement"
import IsAuthenticated from "../../IsAuthenticated"

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"

export default function HomePage() {

    const route = createBrowserRouter(createRoutesFromElements(
        <>
            <Route path="/bharatseva_healthcare" errorElement={<ErrorElements />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<SignIN />} />
                <Route element={<IsAuthenticated />}>
                    <Route path="dashboard/*" element={<DashComponents />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </>

    ))

    return (
        <>
            <RouterProvider router={route} />
        </>
    )

}