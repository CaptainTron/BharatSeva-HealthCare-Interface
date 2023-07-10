import { useEffect, useState } from "react"
import "./ViewRecord.css"
import Select from "react-select"



export default function ViewRecord() {
    var uuid = require('uuid-random');


    function DisplayRecords(data) {
        return (
            <ul key={uuid()} className="ViewPatient_Re">
                <li><p>Issue :</p><p>{data.p_problem}</p></li>
                <li><p>Description :</p><p>{data.description}</p></li>
                <li><p>Date :</p><p className="PatientRecordDate">{data.Created_At}</p></li>
                <li><p>HealthCare :</p><p>{data.healthcareName}</p></li>
                <li><p>Medical Severity :</p><p className={data.medical_severity === "Dangerous" ? `redLabel` : ""}>{data.medical_severity}</p></li>
            </ul>
        )
    }
    const [PatientData, SetPatientData] = useState()
    const [Filter, SetFilter] = useState([])
    const [Fetched, SetFetched] = useState({
        IsFetched: false,
        IsGood: true,
        Isavailable: false,
        Filtered: false,
        IsRedirect: false
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
                SetPatientData(response.HealthUser)
                SetFetched((p) => ({ ...p, Isavailable: true }))
            }

            else if (res.status === 405) { SetFetched((p) => ({ ...p, IsRedirect: true })) }

            else {
                SetFetched((p) => ({ ...p, Isavailable: false, IsGood: false }))
            }
        } catch (err) {
            alert(err)
        }
        SetFetched((p) => ({ ...p, IsFetched: false }))
    }

    function FilterMedicalS(e) {
        const { label } = e
        if (Fetched.Isavailable) {
            const Value = (PatientData.filter((data) => label === data.medical_severity))
            SetFilter(Value.map((data) => DisplayRecords(data)))
            SetFetched((p) => ({ ...p, Filtered: true }))
        }
    }
    let Patient_data = Fetched.Isavailable ? PatientData.map((data) => DisplayRecords(data)) : (<p>Patient Records Will Show Here...</p>)

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

    const FilterOption = [{ "label": "Dangerous" }, { "label": "High" }, { "label": "Semi-mid" }, { "label": "Low" }]


    return (
        <>
            {Fetched.IsRedirect && (<Navigate to='/bharatseva_healthcare/login' replace={true} />)}
            <div className="ViewPR">
                <h2>View Patient Record</h2>

                <div className="ViewPR_inputHID">
                    <label>Enter Patient Health ID</label>
                    <input id="HID_input" type="number" name="HID" placeholder="Enter Health ID" onKeyUp={CallVR} />
                    <div className="SearchIcon" onClick={GetData}><i className="fa-solid fa-magnifying-glass"></i></div>

                    <Select id="FilterPatientRecords" options={FilterOption} onChange={FilterMedicalS} />
                    <div className={Fetched.Filtered ? "bgblue SearchIcon" : "SearchIcon"} onClick={() => SetFetched((p) => ({ ...p, Filtered: false }))}>Clear Filter</div>

                </div>

                <div className="FetchedPatientRecords">
                    {Fetched.IsFetched ? (<p>Loading...</p>) : (Fetched.Isavailable ? (Fetched.Filtered ? (Filter.length ? Filter : (<p className="redLabel">No Result Found!</p>)) : Patient_data) : Fetched.IsGood ? Patient_data : (<p>No Result Found....</p>))}
                    {/* {PatientData} */}
                </div>

            </div>
        </>
    )
}


