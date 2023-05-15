import "./SignIn.css"
import { useEffect, useState } from "react";



export default function SignIN() {

    const [FormData, SetFormData] = useState({
        hip_number: "",
        hip_license: "",
        email: "",
        password: ""
    })
    const [IsLoaded, SetIsLoaded] = useState(false)
    const [Statustxt, SetStatustxt] = useState()

    function OnChange(e) {
        const { name, value } = e.target
        SetFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function LoginHealthCare(e) {
        e.preventDefault();


        SetIsLoaded(true)
        fetch('http://localhost:5000/api/v1/hipAuth/login', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(FormData)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                SetStatustxt(data.message)
            })
            .catch((err) => {
                console.log(err.message)
                SetStatustxt(data.message)
            }
            )
            .finally(() => {
                SetIsLoaded(false)
            })
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
                            <input type="number" placeholder="Health Care Number" name="hip_number" onChange={OnChange} required />
                            <br></br>
                            <label>License Number :</label>
                            <input type="number" placeholder="License Number" name="hip_license" required onChange={OnChange} />
                            <br></br>
                            <label>Email :</label>
                            <input type="email" placeholder="Email" maxLength="30" name="email" required onChange={OnChange} />
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



