import { useEffect, useState } from "react"
import "./ViewRecord.css"



export default function ViewRecord() {

    const [PatientData, SetPatientData] = useState()
    const [Fetched, SetFetched] = useState({
        IsFetched: false,
        IsGood: true,
        Isavailable: false
    })
    async function GetPatientData(HID) {

        const HealthCare = JSON.parse(sessionStorage.getItem("BharatSevahealthCare"))
        SetFetched((p) => ({ ...p, IsFetched: true }))
        try {
            let res = await fetch(`http://localhost:5000/api/v1/healthcare/getpatientrecords?healthId=${HID}`, {
                method: "GET",
                headers: {
                    'content-type': "application/json",
                    "Authorization": `Bearer ${HealthCare.token}`
                }
            })
            let response = await res.json()
            if (res.ok) {
                SetPatientData(response)
                SetFetched((p) => ({ ...p, Isavailable: true }))
            } else {
                // alert(response.status)
                SetFetched((p) => ({ ...p, Isavailable: false, IsGood: false }))

            }
        } catch (err) {
            alert(err)
        }
        SetFetched((p) => ({ ...p, IsFetched: false }))
    }
    let Patient_data = Fetched.Isavailable ? PatientData.HealthUser.map((data) => (
        <div className="ViewPatient_Re">
            <div><p>Issue:</p><p>{data.p_problem}</p></div>
            <div><p>Description:</p><p>{data.description}</p></div>
            <div><p>Date:</p><p>{data.Created_At}</p></div>
            <div><p>HealthCare:</p><p>{data.healthcareName}</p></div>
            <div><p>Medical Severity:</p><p>{data.medical_severity}</p></div>
        </div>
    )) : (<p>Result Will Show Here...</p>)

    function CallVR(e) {
        if (e.which == 13) {
            GetData()
        }
    }


    function GetData() {
        if (((document.getElementById("HID_input").value).toString().length) === 10) {
            GetPatientData(document.getElementById("HID_input").value)
            return;
        }
        alert("Enter Correct Health ID To Fetch")
    }
    
    return (
        <>
            <div className="ViewPR">
                <h2>View Patient Record</h2>

                <div className="ViewPR_inputHID">
                    <label>Enter Patient Health ID</label>
                    <input id="HID_input" type="number" name="HID" placeholder="Enter Health ID" onKeyUp={CallVR} />
                    <div className="SearchIcon" onClick={GetData}><i className="fa-solid fa-magnifying-glass"></i></div>

                </div>

                <div className="FetchedPatientRecords">
                    {Fetched.IsFetched ? (<p>Loading...</p>) : (Fetched.Isavailable ? Patient_data : Fetched.IsGood ? Patient_data : (<p>No Result Found....</p>))}
                </div>

            </div>
        </>
    )
}


