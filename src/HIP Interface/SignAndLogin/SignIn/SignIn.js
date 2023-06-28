import "./SignIn.css"
import { useEffect, useState } from "react";



export default function SignIN() {

    const [FormData, SetFormData] = useState({
        hip_number: "",
        hip_license: "",
        email: "",
        password: ""
    })
    const [IsLoaded, SetIsLoaded] = useState()
    const [Statustxt, SetStatustxt] = useState()

    function OnChange(e) {
        const { name, value } = e.target
        SetFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function LoginHealthCare(e) {
        e.preventDefault();
        SetIsLoaded(true)
        try {
            let res = await fetch('http://localhost:5000/api/v1/healthcareauth/login', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(FormData)
            })
            const response = await res.json()
            if (res.ok) {
                sessionStorage.setItem("BharatSevahealthCare", JSON.stringify(response))
                SetStatustxt("Login Successful")
            } else {
                SetStatustxt(response.message)
            }
            SetIsLoaded(false)
        } catch (err) {
            SetStatustxt(err.message)
        }
    }


    return (
        <>
            <div className="LoginMessageHealthCare">
                <p>{Statustxt}</p>
            </div>

            <div className="LoginPageContainer">
                <div className="HealthCareLoginUpperTxt">
                    <p><span>Note :</span> You Need To Register Your Self before Login.</p>
                </div>

                <div className="LoginForHealthCare_rightSide DisplayFlexjustifyAlignitem">

                    <div className="HealthCareLoginFormContainer">

                        <div className="LoginformHeadertxt">
                        </div>



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

                            <input type="submit" id="LoginBtn" value={IsLoaded ? "Validating..." : "Login"} maxLength="30" required />

                        </form>
                        <div className="NotRegisteredRedirectbtn">
                            <p>Not Registered ? <span>Register Here</span></p>
                        </div>

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
        </>
    )
}



