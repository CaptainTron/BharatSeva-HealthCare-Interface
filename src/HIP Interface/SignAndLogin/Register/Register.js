import { useState } from "react"
import "./Register.css"
import React from "react"
import { Link } from "react-router-dom"

export default function Register() {
    let PasswordStatus = document.querySelector("#RegisterPasswordStatus")
    let Disableback = document.querySelector(".RegisterOuterContainerHealthCare")


    // This is Showing Current status of Register page Register button is CLicked
    const [Status, SetStatus] = useState("Validating...")
    const [FormData, SetFormData] = useState()

    document.addEventListener('click', () => {
        // document.querySelector('.StatusAfterSubmitBtn').classList.add("DiplayNone")
        // document.querySelector('.HIP_RegisterContainer').classList.remove("DisplayOpacity")
        SetStatus("Validating...")
    })



    function OnclickChange(e) {
        const { name, value } = e.target
        SetFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    async function RegisterAPIGOESHere(e) {
        e.preventDefault();



        if (document.querySelector("#Registration_Password").value != document.querySelector("#Registration_CheckPassword").value) {
            PasswordStatus.textContent = "Password Do Not Match :("
            PasswordStatus.classList.remove("DiplayNone")
            PasswordStatus.style.color = "red";
            return;
        }
        PasswordStatus.classList.add("DiplayNone")

        document.querySelector('.HIP_RegisterContainer').classList.add("DisplayOpacity")
        document.querySelector('.StatusAfterSubmitBtn').classList.remove("DiplayNone")

        // Fetching Data From Backend Servers !!
        try {
            const response = await fetch('http://localhost:5000/api/v1/healthcareauth/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(FormData)
            })
            const data = await response.json()
            if (response.ok) {
                SetStatus("Registration Successfull! Please Login :)")
            } else if (response.status == 400) {
                SetStatus("Seems Like Anyne else already Registered With Given Email Or HealthCareID :(")
            } else {
                SetStatus(data.message)
                console.log(response);
            }
        } catch (err) {
            alert("Could Not Connect to Server...🙄")
        }
    }

    return (
        <>
            <div className="RegisterOuterContainerHealthCare">
                <div className="HIP_RegisterContainer DisplayFlexjustifyAlignitem">
                    <div className="RegisterLable">
                        <p>HealthCare Registration 🩺</p>
                        <p><span><strong>Note</strong></span> : After Successfull Registration <br></br> You have to Login for Dashboard.</p>
                    </div>
                    <div className="RegisterBox">
                        <p className="WelcomeGreetings">Welcome To Health Care Registration Portal</p>

                        <form onSubmit={RegisterAPIGOESHere}>
                            <label>Health Care Name :</label>
                            <input type="text" placeholder="Enter Health Care Name" name="healthcareName" onChange={OnclickChange} required />
                            <br></br>
                            <label>Health Care ID : <span className="HelptextinRegister">(HealthCare ID Should Be Unique)</span></label>
                            <input type="number" placeholder="Unique ID to Identify You" name="healthcareId" onChange={OnclickChange} required />
                            {/* <p className="HelptextinRegister">HealthCare ID Shoudl Be Unique</p> */}
                            <br></br>
                            <label>License Number :</label>
                            <input type="number" placeholder="Same As Your HealthCare Number" name="healthcarelicense" onChange={OnclickChange} required />
                            <br></br>

                            <label>State :</label>
                            <input type="text" placeholder="Enter State" name="state" onChange={OnclickChange} required /><br></br>

                            <label>City</label>
                            <input type="text" placeholder="Enter City" name="city" onChange={OnclickChange} required />
                            <br></br>

                            <label>Country</label>
                            <input type="text" placeholder="Enter Country" name="country" onChange={OnclickChange} required />
                            <br></br>

                            <label>Landmark</label>
                            <input type="text" placeholder="Enter Landmark" name="landmark" onChange={OnclickChange} required />
                            <br></br>

                            <label>Email :</label>
                            <input type="email" placeholder="Email Must Be Unique" name="email" onChange={OnclickChange} required />
                            <br></br>

                            <label>Appointment Fee :</label>
                            <input type="number" placeholder="Enter Appointment Fee" name="appointment_fee" onChange={OnclickChange} required />
                            <br></br>

                            <label>Availability :</label>
                            <input type="text" placeholder="Enter Availability" name="availability" onChange={OnclickChange} required />
                            <br></br>

                            <label>Total Facilites :</label>
                            <input type="number" placeholder="Enter Total Facilites" name="total_facilities" onChange={OnclickChange} required />
                            <br></br>

                            <label>Total MBBS Doctors :</label>
                            <input type="number" placeholder="Enter Total MBBS Doctors" name="total_mbbs_doc" onChange={OnclickChange} required />
                            <br></br>

                            <label>Total Workers :</label>
                            <input type="number" placeholder="Enter Total Workers" name="total_worker" onChange={OnclickChange} required />
                            <br></br>

                            <label>No. Of Beds :</label>
                            <input type="number" placeholder="Enter No. Of Beds" name="no_of_beds" onChange={OnclickChange} required />
                            <br></br>

                            <div className="registerHealthCaretextareaContainer">
                                <label className="registerHealthCaretextarea">About Your Hospital :</label>
                                <textarea className="registerHealthCaretextarea" type="text" placeholder="Enter About Your Hospital" name="about" onChange={OnclickChange} required rows="5" cols="39"></textarea>
                            </div>

                            <label>Password :</label>
                            <input type="password" placeholder="Enter Password" id="Registration_Password" required />
                            <br></br>
                            <label>Password Again :</label>
                            <input type="password" placeholder="Enter Your Password Again" name="password" id="Registration_CheckPassword" onChange={OnclickChange} required />
                            <p id="RegisterPasswordStatus" className="DiplayNone"></p>

                            <div className="Registerbtn DisplayFlexjustifyAlignitem">
                                <button>Register*</button>
                                <p className="TermsandConditions">*By Clicking On Register You Agree To Our Terms and Conditions!</p>
                            </div>

                        </form>
                        <p className="LoginbtnRedirect">Already Registered! <Link to="/login">Login</Link></p>
                    </div>
                </div>

                <div className="StatusAfterSubmitBtn DiplayNone DisplayFlexjustifyAlignitem">
                    <h1>{Status}</h1>
                </div>

            </div>

        </>
    )
}