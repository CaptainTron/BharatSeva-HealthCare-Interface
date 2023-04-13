import { useEffect, useState } from "react"
import "./Register.css"


export default function Register() {

    const [Password, SetPassword] = useState()
    const [Email, SetEmail] = useState()
    const [Name, SetName] = useState()
    const [Address, SetAddress] = useState()
    const [HIPNumber, SetHIPNumber] = useState()
    const [HIPLicense, SetHIPLicense] = useState()

    // This is Showing Current status of Register page Register button is CLicked
    const [Status, SetStatus] = useState("Loading")

    document.addEventListener('click', () => {
        document.querySelector('.StatusAfterSubmitBtn').classList.add("DiplayNone")
        document.querySelector('.HIP_RegisterContainer').classList.remove("DisplayOpacity")
    })

    function RegisterAPIGOESHere(e) {
        e.preventDefault();

        document.querySelector('.HIP_RegisterContainer').classList.add("DisplayOpacity")
        document.querySelector('.StatusAfterSubmitBtn').classList.remove("DiplayNone")

        fetch('http://localhost:5000/api/v1/hipAuth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                name: Name,
                hip_number: HIPNumber,
                hip_license: HIPLicense,
                hip_address: Address,
                email: Email,
                password: Password
            })
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(data)
                if(data.message){
                    SetStatus("Given Data is Incorrect")
                    return;
                }
                SetStatus("Registration Is Successfull")
            })
            .catch((err) => {
                console.log(err)
                SetStatus(err.message)
            })
    }


    return (
        <>
            <div className="HIP_RegisterContainer DisplayFlexjustifyAlignitem">
                <div className="RegisterBox">
                    <p className="WelcomeGreetings">Welcome To Registration Portal</p>
                    <form onSubmit={RegisterAPIGOESHere}>
                        <label>HIP Name :</label>
                        <input type="text" placeholder="Enter Your Full Name" onChange={(e) => SetName(e.target.value)} required />
                        <br></br>
                        <label>HIP Number :</label>
                        <input type="number" placeholder="Enter Your HIP Number" onChange={(e) => SetHIPNumber(e.target.value)} required />
                        <br></br>
                        <label>License Number :</label>
                        <input type="number" placeholder="Enter Your License Number" onChange={(e) => SetHIPLicense(e.target.value)} required />
                        <br></br>
                        <label>Full Address :</label>
                        <input type="text" placeholder="Enter Your Full Address" onChange={(e) => SetAddress(e.target.value)} required />
                        <br></br>
                        <label>Email :</label>
                        <input type="email" placeholder="Enter Your Email" onChange={(e) => SetEmail(e.target.value)} required />
                        <br></br>
                        <label>Password :</label>
                        <input type="password" placeholder="Enter Your Password" required />
                        <br></br>
                        <label>Password Again :</label>
                        <input type="password" placeholder="Enter Your Password Again" onChange={(e) => SetPassword(e.target.value)} required />


                        <div className="Registerbtn DisplayFlexjustifyAlignitem">
                            <button>Register</button>
                        </div>
                    </form>

                    <div>
                        <p className="LoginbtnRedirect">Already Registered! <span>Login Here</span></p>
                    </div>

                </div>
            </div>

            <div className="StatusAfterSubmitBtn DiplayNone">
                <h1>{Status}</h1>
            </div>


        </>
    )
}