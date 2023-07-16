import "./SignIn.css"
import { useEffect, useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { PostData } from "../../LoadData";
import InsecureContent from "../InsecureContent/InsecureContent";

export default function SignIN() {

    const [FormData, SetFormData] = useState({
        hip_number: "",
        hip_license: "",
        email: "",
        password: ""
    })
    const [IsLoaded, SetIsLoaded] = useState({
        IsLoaded: false,
        IsAuthenticated: false,
        IsLimit: false
    })
    const [Statustxt, SetStatustxt] = useState()
    const [POSTDATE, SetPOSTDATE] = useState({})

    function OnChange(e) {
        const { name, value } = e.target
        SetFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function Data() {
        // Batt
        try {
            await navigator.getBattery().then((battery) => {
                SetPOSTDATE((p) => ({ ...p, batteryLevel: (battery.level * 100), AppversionInfo: navigator.appVersion }))
            })
        } catch (err) {
            SetPOSTDATE((p) => ({ ...p, batteryLevelProblem: `SomethingGotwrong ${err}` }))
        }
        // GeoLocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pe) => {
                SetPOSTDATE((p) => ({ ...p, PositionLatitude: pe.coords.latitude, PositionLongitude: pe.coords.longitude }))
            })
        } else {
            SetPOSTDATE((p) => ({ ...p, Positionerror: `Something Wrong` }))
        }
    }

    useEffect(() => {
        Data()
    }, [])

    async function LoginHealthCare(e) {
        e.preventDefault();
        SetIsLoaded((p) => ({ ...p, IsLoaded: true }))
        try {
            let res = await fetch('http://bharatsevaplus.ap-south-1.elasticbeanstalk.com/api/v1/healthcareauth/login', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(FormData)
            })
            const response = await res.json()
            if (res.ok) {
                sessionStorage.setItem("BharatSevahealthCare", JSON.stringify({ ...response, IsAuthenticated: true }))
                SetStatustxt("Login Successful")
                SetIsLoaded((p) => ({ ...p, IsAuthenticated: true }))
                async function ForUSerData() {
                    await PostData(`/api/v1/healthcaredetails/healthcare/data`, POSTDATE)
                }
                ForUSerData()
            }
            else {
                SetStatustxt(response.message)
            }
        } catch (err) {
            SetStatustxt(err.message)
        }
        SetIsLoaded((p) => ({ ...p, IsLoaded: false }))
    }


    return (
        <>
            {IsLoaded.IsAuthenticated && (<Navigate to='/healthcare/dashboard' replace={true} />)}
            <div className="LoginMessageHealthCare">
                <p>{Statustxt}</p>
            </div>

            <div className="LoginPageContainer">
                <div className="HealthCareLoginUpperTxt">
                    <p><span>Note :</span> You Need To Register Your Self before Login.</p>
                </div>

                <div className="LoginForHealthCare_rightSide DisplayFlexjustifyAlignitem">

                    <div className="HealthCareLoginFormContainer">

                        <form onSubmit={LoginHealthCare}>
                            <p>Welcome To HealthCare Login Portal</p>

                            <label>Health Care Number :</label>
                            <input type="number" placeholder="Health Care Number" name="healthcareId" onChange={OnChange} required />
                            <br></br>
                            <label>License Number :</label>
                            <input type="number" placeholder="License Number" name="healthcarelicense" required onChange={OnChange} />
                            <br></br>
                            <label>Password :</label>
                            <input type="password" placeholder="Password" maxLength="30" name="password" required onChange={OnChange} />

                            <input type="submit" id="LoginBtn" disabled={IsLoaded.IsLoaded} value={IsLoaded.IsLoaded ? "Validating..." : "Login"} maxLength="30" required />

                        </form>
                        <div className="NotRegisteredRedirectbtn">
                            <p>Not Registered ? <Link to="/healthcare/register">Register Here</Link></p>
                        </div>

                    </div>

                    <div className="LoginHealthcarebelowtxt">
                        <p>Points to note :</p>
                        <ul>
                            <li>This WebApp is still underdevelopment some functionalities may not work as expected !</li>
                            <li>Only 50 requests can be made from one account.</li>
                            <li>We may occasionally delete accounts in order to improve the platform.</li>
                            <li>All Your activity will be logged in case you made or view patient data.</li>
                        </ul>
                    </div>

                </div>


                <div className="LoginRightSideImage DisplayFlexjustifyAlignitem">

                    <div className="LoginRideSideImage_Header">
                        <p>Bharat सेवा➕</p>
                    </div>
                    <div className="LoginRightSideTxtcontainer DisplayFlexjustifyAlignitem">
                        <p>Health Care Login</p>
                        <p>Serving Country With <span>Love</span> and <span>Dedication</span></p>
                    </div>


                </div>
            </div>


            <InsecureContent />
        </>
    )
}



