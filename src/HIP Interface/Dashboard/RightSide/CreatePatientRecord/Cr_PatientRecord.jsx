import React, { useEffect, useState } from "react"
import "./Cr_PatientRecord.css"
import Select from 'react-select'



export default function CreatePatientRecord() {

    const [PRCreator, SetPRCreator] = useState({})
    const [IsLoading, SetIsLoading] = useState();
    const [IsLoaded, SetIsLoaded] = useState({
        IsLoaded: false,
        Issuetxtlimit: 20,
        Descriptiontxtlimit: 50
    });

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
        SetIsLoaded((p) => ({ ...p, IsLoaded: true }))
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
                SetIsLoaded((p) => ({ ...p, IsLoaded: false }))
                DisplayText.classList.remove("Display_none")
            })

    }

    const options = [
        { label: "Dangerous - 9/8", value: "Dangerous" },
        { label: "High - 7/6", value: "High" },
        { label: "Semi-Mid - 3/2", value: "Semi-mid" },
        { label: "Low - 1/0", value: "Low" },
    ]

    const Issuetxt = document.getElementsByName("p_problem")
    const Descripttxt = document.getElementsByName("description")

    function DescriptiontextLimit(e) {
        if ((Descripttxt[0].value.toString().length) <= 20) {
            SetIsLoaded((p) => ({ ...p, Descriptiontxtlimit: (50 - (Descripttxt[0].value.length)) }))
        }
    }
    function IssuetextLimit(e) {
        if ((Issuetxt[0].value.toString().length) <= 20) {
            SetIsLoaded((p) => ({ ...p, Issuetxtlimit: (20 - (Issuetxt[0].value.length)) }))
        }
    }

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
                        <textarea onChange={OnHandleChange}  name="p_problem" onKeyUp={IssuetextLimit} maxLength={20} required></textarea>
                        <p className="CreateRecordsTxtlimit">Length of Issue Should Not Be More Than {IsLoaded.Issuetxtlimit}</p>
                        <br></br>


                        <label>Description</label>
                        <textarea onChange={OnHandleChange}  onKeyUp={DescriptiontextLimit} name="description" maxLength={50} required></textarea>
                        <p className="CreateRecordsTxtlimit">Length of Description Should Not Be More Than {IsLoaded.Descriptiontxtlimit}</p>
                        <br></br>

                        <button id="CreateRecordBtn">{IsLoaded.IsLoaded ? "Validating...." : "Create"}</button>
                    </form>

                    <p className="WarningCr_patient"><strong>Note : </strong> Limited Number of Records Can Be Created !</p>
                </div>
            </div>

            <div className="PatientProblemRecord_view Display_none">
                <p>{IsLoading}</p>
            </div>
        </>
    )
}