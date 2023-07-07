import { Navigate, Outlet } from "react-router-dom";


export default function IsAuthenticated() {

    try {
        const HealthCare = JSON.parse(sessionStorage.getItem("BharatSevahealthCare"))
        if (HealthCare.IsAuthenticated) {
            return (
                <>
                    <Navigate to='/bharatseva_healthcare/dashboard' />
                    <Outlet />
                </>
            )
        }
    } catch (err) {
        alert("Your Session Expired! Please Login!")
        return <Navigate to='/bharatseva_healthcare/login' />

    }
    return (<Outlet />)
}