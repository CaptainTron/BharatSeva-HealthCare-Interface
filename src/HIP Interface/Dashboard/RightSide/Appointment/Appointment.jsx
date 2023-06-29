import { useEffect, useState } from "react"
import "./Appointment.css"



export default function Appointment() {

    const [Fetched, SetFetched] = useState()
    const [IsFetched, SetIsFetched] = useState({
        IsFetched: true,
        IsGood: true
    })

    async function fetchdata() {
        const HealthCare = JSON.parse(sessionStorage.getItem("BharatSevahealthCare"))
        SetIsFetched((p) => ({ ...p, IsFetched: false }))
        try {
            let response = await fetch(`http://localhost:5000/api/v1/healthcaredetails/healthcare/appointment`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${HealthCare.token}`
                }
            })
            let res = await response.json()
            if (response.ok) {
                SetFetched(res.appointments)
                SetIsFetched((p) => ({ ...p, IsFetched: true }))
            }
        } catch (err) {
            alert("Could Not Connect To Server")
            SetIsFetched((p) => ({ ...p, IsGood: false, IsFetched: true }))
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])

    let Appoinments, i = 0
    if (Fetched) {
        Appoinments = Fetched.length ? Fetched.map((data) => (
            <div className="AppointContainer">
                <p key={i++}><span>Status :</span>{new Date().toISOString().split('T')[0] > data.appointment_date ? <span className="CompletedApp">Completed</span> : <span className="UpcomingApp">Upcoming</span>}</p>
                <p key={i++}><span>Patient Name :</span>{data.name}</p>
                <p key={i++}><span>Health ID :</span>{data.health_ID}</p>
                <p key={i++}><span>Appointment Date :</span>{data.appointment_date}</p>
                <p key={i++}><span>Appointment Time :</span>{data.appointment_time}</p>
                <p key={i++}><span>Department :</span>{data.department}</p>
                <p key={i++}><span>User Note :</span>{data.note}</p>
            </div>
        )) : (<p className="UpcomingApp">No Appointments Till Now</p>)
    }




    return (<>
        <div className="appointmentSectionOutercontainer">
            <div className="BharatSevaHealthCareAppointmentContainer">
                <h2>Appointment Section</h2>
                <p>This Section List Your Appointment With Your Patient</p>
                <hr></hr>

                <div className="AppointmentSection">
                    {IsFetched.IsFetched ? (IsFetched.IsGood ? Appoinments : (<p className="NotConnected">Could Not Connect To Server...🙄</p>)) : (<p className="CompletedApp">Loading...</p>)}
                </div>
            </div>
        </div>
    </>)
}