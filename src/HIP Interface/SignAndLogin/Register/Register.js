import { useEffect, useState } from "react"
import "./Register.css"


export default function Register() {
    let PasswordStatus = document.querySelector("#RegisterPasswordStatus")


    // This is Showing Current status of Register page Register button is CLicked
    const [Status, SetStatus] = useState("Validating...")
    const [FormData, SetFormData] = useState({})

    document.addEventListener('click', () => {
        document.querySelector('.StatusAfterSubmitBtn').classList.add("DiplayNone")
        document.querySelector('.HIP_RegisterContainer').classList.remove("DisplayOpacity")
        SetStatus("Validating...")
    })



    function OnclickChange(e) {
        const { name, value } = e.target
        SetFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    function RegisterAPIGOESHere(e) {
        e.preventDefault();



        if (document.querySelector("#Registration_Password").value != document.querySelector("#Registration_CheckPassword").value) {
            PasswordStatus.textContent = "Password Do Not Match :("
            PasswordStatus.classList.remove("DiplayNone")
            PasswordStatus.style.color = "red";
            // console.log(document.querySelector("#Registration_Password").value, document.querySelector("#Registration_CheckPassword").value)
            return;
        }
        PasswordStatus.classList.add("DiplayNone")

        document.querySelector('.HIP_RegisterContainer').classList.add("DisplayOpacity")
        document.querySelector('.StatusAfterSubmitBtn').classList.remove("DiplayNone")

        // Fetching Data From Backend Servers !!
        fetch('http://localhost:5000/api/v1/healthcareauth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(FormData)
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(data)
                if (data.message) {
                    SetStatus(data.message)
                    console.log(data);
                    return;
                }
                SetStatus("Registration Is Successfull! Please Login :)")
            })
            .catch((err) => {
                console.log(err)
                SetStatus("Could Not Connect To Server :(")
            })
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
                        <p className="WelcomeGreetings">Welcome To Registration Portal</p>
                        <form onSubmit={RegisterAPIGOESHere}>
                            <label>Health Care Name :</label>
                            <input type="text" placeholder="Enter Health Care Name" name="healthcareName" onChange={OnclickChange} required />
                            <br></br>
                            <label>Health Care ID :</label>
                            <input type="number" placeholder="Enter Health Care Number" name="healthcareId" onChange={OnclickChange} required />
                            <br></br>
                            <label>License Number :</label>
                            <input type="number" placeholder="Enter License Number" name="healthcarelicense" onChange={OnclickChange} required />
                            <br></br>
                            <label>Full Address :</label>
                            <input type="text" placeholder="Enter Full Address" name="healthcare_address" onChange={OnclickChange} required />
                            <br></br>
                            <label>Email :</label>
                            <input type="email" placeholder="Enter Email" name="email" onChange={OnclickChange} required />
                            <br></br>

                            <label>Appointment Fee :</label>
                            <input type="number" placeholder="Enter Appointment Fee" name="appointment_fee" onChange={OnclickChange} required />
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
                                <button>Register</button>
                            </div>

                        </form>

                        <div>
                            <p className="LoginbtnRedirect">Already Registered! <span>Login Here</span></p>
                        </div>

                    </div>
                </div>

                <div className="StatusAfterSubmitBtn DiplayNone DisplayFlexjustifyAlignitem">
                    <h1>{Status}</h1>
                </div>

            </div>

        </>
    )
}