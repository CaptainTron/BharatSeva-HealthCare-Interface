import { useEffect, useState } from "react"
import "./ViewRecord.css"



export default function ViewRecord() {

    const [PatientData, SetPatientData] = useState()
    const [Is_Fetched, SetIs_Fetched] = useState(false)
    const [IsShow, SetIsShow] = useState(false)

    function GetPatientData(HID) {
        fetch(`http://localhost:5000/api/v1/hip/patientgetdata/${HID}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem("HealthCare_TOKEN")}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                SetPatientData(data)
                console.log("Records Successfully Fetched")
            })
            .catch((err)=>{
                alert(err)
                SetIsShow(false)
            })
            .finally(() => {
                SetIs_Fetched(true)
            })

        
        fetch(`http://localhost:5000/api/v1/healthcare/firebase/RecordsViewed`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("HealthCare_TOKEN")}`,
                "health_id":`${localStorage.getItem("Health_Id")}`
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log("Records Views Updated")
        })


    }

    let Patient_data
    if ((PatientData)) {
        if (PatientData.details) {
            Patient_data = PatientData.details.map((data) => (
                <div className="ViewPatient_Re">
                    <div><p>Issue:</p><p>{data.p_problem}</p></div>
                    <div><p>Description:</p><p>{data.description}</p></div>
                    <div><p>Date:</p><p>{data.Created_At}</p></div>
                    <div><p>Medical Severity:</p><p>{data.medical_severity}</p></div>
                </div>
            ))
        }
    }

    let GetDetaDetails = (<p>Records will Show Here...</p>)

    function CallVR(e){
        if(e.which == 13){
            GetData()
        }
    }


    function GetData() {
        SetPatientData(null)
        SetIs_Fetched(false)
        if (((document.getElementById("HID_input").value).toString().length) === 10) {
            GetPatientData(document.getElementById("HID_input").value)
            SetIsShow(true)
            return;
        }
        SetIsShow(false)
        alert("Enter Correct Health ID To Fetch")
    }


    return (
        <>
            <div className="ViewPR">
                <h2>View Patient Record</h2>

                <div className="ViewPR_inputHID">
                    <label>Enter Patient Health ID</label>
                    <input id="HID_input" type="number" name="HID" placeholder="Enter Health ID" onKeyUp={CallVR}/>
                    <div className="SearchIcon" onClick={GetData}><i className="fa-solid fa-magnifying-glass"></i></div>

                </div>

                <div className="FetchedPatientRecords">

                {IsShow ?
                    (Is_Fetched ?
                        (
                            <div className="ViewRecordofPatient">
                               <p>
                                   { PatientData.details[0] ? (<p>Last Updated : {PatientData.details[0].Created_At}</p>)  :(<p style={{color: "yellow"}}>No One Found With Given Health ID</p>)}
                                   </p> 
                                
                                {Patient_data}
                            </div>
                        ) : <h3>Loading...</h3>)
                    : <p>{GetDetaDetails}</p>
                }
                </div>

            </div>
        </>
    )
}


