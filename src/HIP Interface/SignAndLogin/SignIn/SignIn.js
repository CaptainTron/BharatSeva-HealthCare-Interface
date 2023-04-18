import "./SignIn.css"
import { useEffect, useState } from "react";



export default function SignIN() {

    const [hipNumber, SethipNumber] = useState();
    const [lcenseNumber, SetlcenseNumber] = useState();
    const [Password, SetPassword] = useState();
    const [Email, SetEmail] = useState();


    function LoginHealthCare(e) {
        document.querySelector(".LoginMessageHealthCare").classList.add("DisplayNone")
        e.preventDefault();
        document.querySelector(".LoginMessageHealthCare").classList.remove("DisplayNone")
        
        
        
        fetch('http://localhost:5000/api/v1/hipAuth/login', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                "hip_number": hipNumber,
                "hip_license": lcenseNumber,
                "email": Email,
                "password": Password
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.message) {
                    document.querySelector(".LoginMessageHealthCare").classList.remove("DisplayNone")
                    document.querySelector(".LoginMessageHealthCare p").textContent = data.message
                    return;
                }
                document.querySelector(".LoginMessageHealthCare").classList.remove("DisplayNone")
                document.querySelector(".LoginMessageHealthCare p").textContent = "Login Successfull"
            })
            .catch((err) => {
                document.querySelector(".LoginMessageHealthCare").classList.remove("DisplayNone")
                document.querySelector(".LoginMessageHealthCare p").textContent = "Failed To Connect With Server"
            }
            )
            
            document.querySelector(".LoginMessageHealthCare p").textContent = "Validating..."
    }


    return (
        <>
            <div className="LoginMessageHealthCare DisplayNone">
                <p>Validating...</p>
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
                            <input type="number" placeholder="Health Care Number" maxLength="30" onChange={(e) => SethipNumber(e.target.value)} required />
                            <br></br>
                            <label>License Number :</label>
                            <input type="number" placeholder="License Number" maxLength="30" required onChange={(e) => SetlcenseNumber(e.target.value)} />
                            <br></br>
                            <label>Email :</label>
                            <input type="email" placeholder="Email" maxLength="30" required onChange={(e) => SetEmail(e.target.value)} />
                            <br></br>
                            <label>Password :</label>
                            <input type="password" placeholder="Password" maxLength="30" required onChange={(e) => SetPassword(e.target.value)} />

                            <input type="submit" id="LoginBtn" value="Login" maxLength="30" required />

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



