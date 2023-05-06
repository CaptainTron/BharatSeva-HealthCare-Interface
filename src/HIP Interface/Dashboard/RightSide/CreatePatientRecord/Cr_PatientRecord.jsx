import React, { useEffect, useState } from "react"
import "./Cr_PatientRecord.css"
import Select from 'react-select'



export default function CreatePatientRecord() {

    const [PRCreator, SetPRCreator] = useState({
        health_id: null,
        p_problem: null,
        description: null,
        medical_severity: null,
        HIP_name: "Vaibhav Hospital"
    })

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
        console.log(PRCreator)
        localStorage.setItem("HIPName", "VaibhavYadav")
        const HIPName = localStorage.getItem("HIPName")
        console.log(HIPName)
        fetch(`http://localhost:5000/api/v1/hip/createpatientproblem`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDUxNjY3YzIyZWFhMGE3MDA3MmZjNDUiLCJuYW1lIjoiVmFpYmhhdiBIT3NwaXRhbCIsImlhdCI6MTY4MzA1NjI1MywiZXhwIjoxNjg1NjQ4MjUzfQ.ieVxas27BBOBkwjAPXA0cGMO-lx7kB-HQEg0t4TYLa0"
            },
            body: JSON.stringify(PRCreator)
        })
            .then((data) => data.json())
            .then(res => {
                console.log(res)
                if (res.Message) {
                    alert(res.Message)
                    return
                }
                alert(res.status)
            })
    }

    const options = [
        { value: "High", label: "High" },
        { value: "Mid", label: "Mid" },
        { value: "Low", label: "Low" },
    ]



    return (
        <>
            <div className="PatientProblemRecord">
                <h2>Create Patient Record</h2>
                <form onSubmit={Putdata}>

                    <label>Health ID</label>
                    <input type="number" name="health_id" onChange={OnHandleChange}></input><br></br>

                    <label>Issue</label>
                    <textarea onChange={OnHandleChange} name="p_problem"></textarea><br></br>

                    <label>Description</label>
                    <textarea onChange={OnHandleChange} name="description"></textarea><br></br>

                    <label>Medical Severity</label>
                    <Select className="SelectOptions" options={options} name="medical_severity" onChange={handlechange}></Select>

                    <button type="submit">Create Record</button>

                </form>
            </div>
        </>
    )
}