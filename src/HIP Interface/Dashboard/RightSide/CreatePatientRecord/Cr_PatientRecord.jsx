import React, { useEffect, useState } from "react"
import "./Cr_PatientRecord.css"
import Select from 'react-select'



export default function CreatePatientRecord() {
    let DisplayText = document.querySelector(".PatientProblemRecord_view")

    const [PRCreator, SetPRCreator] = useState({})
    const [IsLoading, SetIsLoading] = useState();
    const [IsLoaded, SetIsLoaded] = useState(false);

    function OnHandleChange(e) {
        const { name, value } = e.target
        SetPRCreator(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handlechange(selectedOptions) {
        SetPRCreator(prev => ({
            ...prev,
            "medical_severity": selectedOptions.value
        }))
    }

    function Putdata(e) {
        e.preventDefault();
        DisplayText.classList.add("Display_none")
        const HealthCare = JSON.parse(sessionStorage.getItem("BharatSevahealthCare"))
        SetIsLoaded(true)
        fetch(`http://localhost:5000/api/v1/healthcare/createpatientproblem`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                "Authorization": `Bearer ${HealthCare.token}`
            },
            body: JSON.stringify(PRCreator)
        })
            .then((data) => data.json())
            .then(res => {
                SetIsLoading(res.message)
            })
            .catch((err) => {
                // alert(err)
                SetIsLoading(err.message)
            })
            .finally(() => {
                SetIsLoaded(false)
                DisplayText.classList.remove("Display_none")
            })
    
    }

    const options = [
        { label: "Dangerous - 9/8", value: "Dangerous"},
        { label: "High - 7/6", value: "High" },
        { label: "Mid  - 5/4", value: "Mid" },
        { label: "Semi-Mid - 3/2", value: "Semi-Mid" },
        { label: "Low - 1/0", value: "Low" },
    ]

    return (
        <>
            <div className="PatientProblemRecord">
                <div className="PatientProblemRecordCreator">
                    <h2>Create Patient Record</h2>

                    <form onSubmit={Putdata}>

                        <label>Health ID</label>
                        <input type="number" name="health_id" onChange={OnHandleChange} required></input><br></br>

                        <label>Medical Severity</label>
                        <Select className="SelectOptions" options={options} name="medical_severity" onChange={handlechange} required></Select>

                        <label>Issue</label>
                        <textarea onChange={OnHandleChange} name="p_problem" required></textarea><br></br>

                        <label>Description</label>
                        <textarea onChange={OnHandleChange} name="description" required></textarea><br></br>

                        <button id="CreateRecordBtn">{IsLoaded ? "Validating...." : "Create"}</button>
                    </form>

                    <p className="WarningCr_patient"><strong>Note : </strong> Only One Record Can Be Created at a Time!</p>
                </div>
            </div>

            <div className="PatientProblemRecord_view Display_none">
                <p>{IsLoading}</p>
            </div>
        </>
    )
}