import { useEffect, useState } from "react"
import { Navigate, redirect } from "react-router-dom";
import "./Appointment.css"



export default function Appointment() {
    var uuid = require('uuid-random');
    const [Fetched, SetFetched] = useState()
    const [IsFetched, SetIsFetched] = useState({
        IsFetched: true,
        IsGood: true,
        Directed: false
    })

    async function fetchdata() {
        const HealthCare = JSON.parse(sessionStorage.getItem("BharatSevahealthCare"))
        SetIsFetched((p) => ({ ...p, IsFetched: false }))
        try {
            let response = await fetch(`http://bharatsevaplus-env.eba-buh5payn.ap-south-1.elasticbeanstalk.com/api/v1/healthcaredetails/healthcare/appointment`, {
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
            } else if (response.status === 405) {
                alert("Request Limit Reached!")
                SetIsFetched((p) => ({ ...p, Directed: true }))
                return
            }
            console.log(response)
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
            <div key={uuid()} className="AppointContainer">
                <p key={i++}><span>Status :</span>{new Date().toISOString().split('T')[0] > data.appointment_date ? <span className="CompletedApp">Completed</span> : <span className="UpcomingApp">Upcoming</span>}</p>
                <p key={i++}><span>Patient Name :</span>{data.name}</p>
                <p key={i++}><span>Health ID :</span>{data.health_ID}</p>
                <p key={i++}><span>Appointment Date :</span>{data.appointment_date}</p>
                <p key={i++}><span>Appointment Time :</span>{data.appointment_time}</p>
                <p key={i++}><span>Department :</span>{data.department}</p>
                <p key={i++}><span>User Note :</span><span id="UsernnoteAppointment">{data.note}sfsaf sakfjsa fsklafj safjsafkljsaflsa fjskf slfslkfjsadf jskfsl afsfhwifjijfwiofjsdfj sdfjsoi</span></p>
            </div>
        )) : (<p className="UpcomingApp">No Appointments Till Now</p>)
    }




    return (<>
        {IsFetched.Directed && <Navigate to="/bharatseva_healthcare/login" replace={true} />}
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