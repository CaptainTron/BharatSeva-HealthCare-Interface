import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import "./Home.css"

export default function Home() {
    var uuid = require('uuid-random');
    const [hip, Sethip] = useState();
    const [stats, Setstats] = useState();
    const [IsLimit, SetLimit] = useState(false);

    const HealthCare = JSON.parse(sessionStorage.getItem("BharatSevahealthCare"))


    const FetcheDetails_Stats = async () => {
        try {
            let res = await fetch(`http://localhost:5000/api/v1/healthcaredetails/stats`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${HealthCare.token}`
                }
            })
            let data = await res.json()
            if (res.ok) {
                Setstats(data.stats)

            } else if (res.status === 405) {
                alert("Request Limit Reached!")
                SetLimit(true)
            }
            else {
                alert("Something Went Wrong!")
            }
        } catch (err) {
            alert("Could Not Connect To Server!")
        }

    }
    const FetcheDetails = async () => {
        try {
            let res = await fetch(`http://localhost:5000/api/v1/healthcaredetails/getdetails`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${HealthCare.token}`
                }
            })
            let data = await res.json()
            if (res.ok) {
                Sethip(data.HealthCare)
                console.log(res)
            } else if (res.status === 405) {
                SetLimit(true)
            } else {
                alert("Something Went Wrong!")
            }
        } catch (err) {
            alert("Could Not Connect To Server!")
        }

    }

    useEffect(() => {
        FetcheDetails_Stats(),
            FetcheDetails()
    }, [])


    let Hipsarrays;
    let hipTotalRecords = [];

    if (hip && stats) {
        Hipsarrays = (
            <ul key={uuid()} className="HomeContainer_UL Home_ContainerUL">
                <li><p>HealthCare ID: </p>{hip.healthcareId} (Unique ID to Identity You on this Platform)</li>
                <li><p>Name: </p>{hip.healthcareName}</li>
                <li><p>Landmark: </p>{hip.address.landmark}</li>
                <li><p>City: </p>{hip.address.city}</li>
                <li><p>State: </p>{hip.address.state}</li>
                <li><p>Country: </p>{hip.address.country}</li>
                <li><p>Availability: </p>{hip.availability}</li>
                <li><p>Total Facilities: </p>{hip.total_facilities}</li>
                <li><p>Total MBBS Doc. :</p>{hip.total_mbbs_doc}</li>
                <li><p>Total Workers: </p>{hip.total_worker}</li>
                <li><p>Date Of Registration: </p>{hip.dateOfRegistration}</li>
                <li><p>No. of Beds: </p>{hip.no_of_beds}</li>
                <li><p>Ambulance Facilities: </p>Yes</li>
            </ul>
        )
        hipTotalRecords = (
            <ul key={uuid()} className="HomeContainer_UL Health_ServicesRecords_UL">
                <li><p>Records Created: </p>{stats.RecordsCreated}</li>
                <li><p>Bio Data Created: </p>{stats.HealthID_Created}</li>
                <li><p>Records Viewed: </p>{stats.RecordsViewed}</li>
                <li><p>BioData Viewed: </p>{stats.Biodata_Viewed}</li>
            </ul>

        )
    }




    return (
        <>
            {IsLimit && <Navigate to="/bharatseva_healthcare/login" replace={true} />}
            {hip && stats ? (<div className="HomeContainer">
                <div>

                    <h2>About Me 🏥</h2>
                    <hr></hr>
                    <div className="AboutMe ">
                        {Hipsarrays}
                    </div>

                    <div className="Health_Services">
                        <h2>Total Records</h2>
                        <hr></hr>
                        <div className="Health_ServicesRecords Healthcontainerbox">
                            {hipTotalRecords}
                        </div>
                    </div>

                </div>
            </div>) : <h3> Loading....</h3>}
        </>
    )
}