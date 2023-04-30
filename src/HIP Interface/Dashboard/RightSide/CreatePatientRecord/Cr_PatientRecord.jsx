import React from "react"
import "./Cr_PatientRecord.css"
import Select from 'react-select'



export default function CreatePatientRecord() {


    
    const options=[
        { value: "High" , label: "High"},
        { value: "Mid" , label: "Mid"},
        { value: "Low" , label: "Low"},
    ]
    return (
        <>
            <div className="PatientProblemRecord">
                <form>
                    <label>Health ID</label>
                    <input type="number" /><br></br>

                    <label>Problem</label>
                    <textarea rows="41" cols="110"></textarea> <br></br>

                    <label>Description</label>
                    <textarea></textarea><br></br>


                    <label>Medical Severity</label>
                    <Select options={options} className="SelectPatientProblem"/><br></br>
                </form>
            </div>
        </>
    )
}