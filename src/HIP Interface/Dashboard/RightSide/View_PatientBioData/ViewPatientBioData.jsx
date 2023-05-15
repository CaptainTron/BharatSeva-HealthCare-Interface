import { useEffect, useState } from "react"
import "./ViewPatientBioData.css"


export default function ViewPatientBioData() {

    const [Pat_BioData, SetPat_BioData] = useState()
    const [Isloading, SetIsloading] = useState(false)
    const [IsFetched, SetIsFetched] = useState(false)





    function GetPatientBioData(HID) {
        SetIsloading(true)
        fetch(`http://localhost:5000/api/v1/hip/patientBioData/patient/${HID}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDUxNjY3YzIyZWFhMGE3MDA3MmZjNDUiLCJuYW1lIjoiVmFpYmhhdiBIT3NwaXRhbCIsImlhdCI6MTY4MzA1NjI1MywiZXhwIjoxNjg1NjQ4MjUzfQ.ieVxas27BBOBkwjAPXA0cGMO-lx7kB-HQEg0t4TYLa0"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                SetPat_BioData(data.Data)
                console.log(data)
                SetIsFetched(true)
            })
            .catch((err) => {
                SetPat_BioData(null)
                alert(err)
                SetIsFetched(false)
                console.log(err)
            })
            .finally(() => {
                SetIsloading(false)
            })
    }


    function CallPBD(e) {
        if (e.key === 'Enter') {
            FetchDataPBD();
        }
    }

    function FetchDataPBD() {
        if (document.getElementById("HID_inputBIOData").value.toString().length == 10) {
            GetPatientBioData(document.getElementById("HID_inputBIOData").value)
            return;
        }
        alert("Enter Correct HealthID")
    }

    let Patient_Biodata
    if (Pat_BioData) {
        if ((Pat_BioData)) {
            //    Object.entries(Pat_BioData.Data).map(data =>
            // console.log(data[1]) 
            Patient_Biodata =
                (
                    <div className="ViewPatient_BiO PatientBioData">
                        <div className="ViewPatientDataContainer">

                        <div key={1}><p>HealthID:</p><p>{Pat_BioData.health_id}</p></div>
                        <div key={2}><p>Fname:</p><p>{Pat_BioData.fname}</p></div>
                        <div key={3}><p>Middle Name:</p><p>{Pat_BioData.middlename}</p></div>
                        <div key={4}><p>Lname:</p><p>{Pat_BioData.lname}</p></div>
                        <div key={5}><p>Sex:</p><p>{Pat_BioData.sex}</p></div>
                        <div key={6}><p>DOB:</p><p>{Pat_BioData.dob ? Pat_BioData.dob : "--/--"}</p></div>
                        <div key={7}><p>Blood Group:</p><p>{Pat_BioData.bloodgrp}</p></div>
                        <div key={8}><p>Siblings:</p><p>{Pat_BioData.sibling}</p></div>
                        <div key={9}><p>Weight:</p><p>{Pat_BioData.Weight}</p></div>
                        <div key={10}><p>BMI:</p><p>{Pat_BioData.BMI}</p></div>
                        <div key={11}><p>Twin:</p><p>{Pat_BioData.twin}</p></div>
                        <div key={12}><p>Primary From :</p><p>{Pat_BioData.Plocation}</p></div>
                        <div key={120}><p>Created By:</p><p>{Pat_BioData.createdBy}</p></div>
                        <div key={13}><p>Created At:</p><p>{Pat_BioData.createdAt}</p></div>
                        <div key={14}><p>Aadhar Number:</p><p>{Pat_BioData.aadharNumber}</p></div>
                        <div key={15}><p>Marriage Status:</p><p>{Pat_BioData.MarriageStatus}</p></div>
                        <div key={16}><p>Mobile Number:</p><p>{Pat_BioData.mobilenumber}</p></div>
                        <div key={17}><p>Email:</p><p>{Pat_BioData.email}</p></div>
                        <div key={18}><p>Father Name:</p><p>{Pat_BioData.fathername}</p></div>
                        <div key={19}><p>Mother Name:</p><p>{Pat_BioData.mothername}</p></div>
                        <div key={20}><p>Emergency Number:</p><p>{Pat_BioData.emergencynumber}</p></div>
                        </div>
                    </div>
                )

        }
    }else{
        Patient_Biodata = <p style={{color:"yellow"}}>No One Found With Given HealthID</p>
    }


    return (
        <>
            <div className="ViewPR">
                <h2>View Patient Bio Data</h2>

                <div className="ViewPR_inputHID">
                    <label>Enter Patient Health ID</label>
                    <input id="HID_inputBIOData" type="number" name="HID" placeholder="Enter Health ID" onKeyUp={CallPBD} />
                    <div className="SearchIcon" onClick={FetchDataPBD} ><i className="fa-solid fa-magnifying-glass"></i></div>

                </div>

                {Isloading ? "Loading..." :

                    IsFetched ? ( <div>{Patient_Biodata}</div> ) : "Records Will Show Up Here"

                }



            </div>
        </>
    )
}