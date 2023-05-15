import "./CreatePatient.css"
import Select from 'react-select'
import { useState } from "react"

export default function CreatePatientD() {
    const Togglesuccesstxt = document.querySelector(".CreatePatient_viewAfterSuccess")
    const [SituationContainer, SetSituationContainer] = useState("");
    const [IsLoaded, SetIsLoaded] = useState(false);
    const [CPFormData, SetDPFormData] = useState({
        health_id: "",
        fname: "",
        middlename: "",
        lname: "",
        sex: "",
        createdBy: "",
        dob: "",
        bloodgrp: "",
        BMI: "",
        MarriageStatus: "",
        Weight: "",
        email: "",
        mobilenumber: "",
        aadharNumber: "",
        Plocation: "",
        sibling: "",
        twin: "",
        fathername: "",
        mothername: "",
        emergencynumber: ""
    })

    function OnChangeCPRData(e) {
        const { name, value } = e.target
        SetDPFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function OnChangeSelectPDC(e) {
        const { name, value } = e
        SetDPFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function PostFetchDataForPBD(e) {
        e.preventDefault();
        FetchDataForPBD();
    }

    function FetchDataForPBD() {
        Togglesuccesstxt.classList.add("Display_none")
        SetIsLoaded(true)
        fetch(`http://localhost:5000/api/v1/hip/createpatientbiodata`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDUxNjY3YzIyZWFhMGE3MDA3MmZjNDUiLCJuYW1lIjoiVmFpYmhhdiBIT3NwaXRhbCIsImlhdCI6MTY4MzA1NjI1MywiZXhwIjoxNjg1NjQ4MjUzfQ.ieVxas27BBOBkwjAPXA0cGMO-lx7kB-HQEg0t4TYLa0"
            },
            body: JSON.stringify(CPFormData)
        })
            .then((data) => data.json())
            .then((res) => {
                console.log("Response Goes Here", res);
                SetSituationContainer(res.message)
                alert(res.message)
            })
            .catch((err) => {
                console.log(err)
                alert(err.message)
                SetSituationContainer(err.message)
            })
            .finally(() => {
                Togglesuccesstxt.classList.remove("Display_none")
                SetIsLoaded(false)
            })
    }

    function clickmeTO() {
        Togglesuccesstxt.classList.toggle("DiplayCreate_ViewAfterSuccess")
    }

    const twin = [{ "label": "Yes", "value": "Yes", "name": "twin" }, { "label": "No", "value": "No", "name": "twin" }]
    const sibling = [{ "label": "Yes", "value": "Yes", "name": "sibling" }, { "label": "No", "value": "No", "name": "sibling" }]
    const sex = [{ "label": "☕", "value": "☕", "name": "sex" }, { "label": "😎", "value": "😎", "name": "sex" }, { "label": "🙄", "value": "🙄", "name": "sex" }]
    const Marriage = [{ "label": "Single", "value": "Single", "name": "MarriageStatus" }, { "label": "Dharti Ka Bhoj", "value": "Dharti Ka Bhoj", "name": "MarriageStatus" }]
    return (
        <>
            <div className="CreatePatientContainer">


                <div className="CreatePatient">
                    <h2>Create Patient Data</h2>
                    <div className="CreateContainer">
                        <form onSubmit={PostFetchDataForPBD} method="POST">
                            <label>Health ID</label><br></br>
                            <input type="text" className="PDContainer" name="health_id" placeholder="Health ID" onChange={OnChangeCPRData} required /><br></br>

                            <label>First Name</label><br></br>
                            <input type="text" className="PDContainer" name="fname" placeholder="First Name" required onChange={OnChangeCPRData} /><br></br>


                            <label>Middle Name</label><br></br>
                            <input type="text" className="PDContainer" name="middlename" placeholder="Middle Name" onChange={OnChangeCPRData} /><br></br>

                            <label>Last Name</label><br></br>
                            <input type="text" className="PDContainer" name="lname" placeholder="Last Name" required onChange={OnChangeCPRData} /><br></br>

                            <label>Sex</label><br></br>
                            <Select className="Siblings PDC" options={sex} onChange={OnChangeSelectPDC} ></Select>

                            <label>DOB</label><br></br>
                            <input type="date" className="PDContainer" name="dob" placeholder="DOB" required onChange={OnChangeCPRData} /><br></br>

                            <label>Blood Group</label><br></br>
                            <input type="text" className="PDContainer" name="bloodgrp" placeholder="Blood Group" required onChange={OnChangeCPRData} /><br></br>

                            <label>BMI</label><br></br>
                            <input type="text" className="PDContainer" name="BMI" placeholder="BMI" required onChange={OnChangeCPRData} /><br></br>

                            <label>Marriage Status</label><br></br>
                            <Select className="Siblings PDC" options={Marriage} name="Marriage Status" onChange={OnChangeSelectPDC} ></Select>

                            <label>Weight</label><br></br>
                            <input type="number" className="PDContainer" name="Weight" placeholder="Weight" required onChange={OnChangeCPRData} /><br></br>

                            <label>Email</label><br></br>
                            <input type="email" className="PDContainer" name="email" placeholder="Email" required onChange={OnChangeCPRData} /><br></br>

                            <label>Mobile Number</label><br></br>
                            <input type="number" className="PDContainer" name="mobilenumber" placeholder="Mobile Number" required onChange={OnChangeCPRData} /><br></br>

                            <label>Aaddhar Number</label><br></br>
                            <input type="number" className="PDContainer" name="aadharNumber" placeholder="Aaddhar Number" required onChange={OnChangeCPRData} /><br></br>

                            <label>Primary From</label><br></br>
                            <input type="text" className="PDContainer" name="Plocation" placeholder="Primary From" required onChange={OnChangeCPRData} /><br></br>

                            <label>Siblings ?</label><br></br>
                            <Select className="Siblings PDC" options={sibling} name="Siblings" onChange={OnChangeSelectPDC}></Select>

                            <label>Twin ?</label><br></br>
                            <Select className="Twin PDC" options={twin} name="Twin" onChange={OnChangeSelectPDC}></Select>

                            <label>Father Name</label><br></br>
                            <input type="text" className="PDContainer" name="fathername" placeholder="Father Name" required onChange={OnChangeCPRData} /><br></br>

                            <label>Mother Name</label><br></br>
                            <input type="text" className="PDContainer" name="mothername" placeholder="Mother Name" required onChange={OnChangeCPRData} /><br></br>

                            <label>Emergency Contact Number</label><br></br>
                            <input type="text" className="PDContainer" name="emergencynumber" placeholder="Emergency Number" required onChange={OnChangeCPRData} /><br></br>

                            <input type="submit" id="SubmitBtnPDC" value={IsLoaded ? "Validating.." : "Create"} />
                        </form>
                    </div>
                </div>

                <div className="CreatePatient_viewAfterSuccess DisplayFlexJustify Display_none">
                    <p style={{ color: "yellow" }}>{SituationContainer}</p>
                </div>
            </div>
        </>
    )
}