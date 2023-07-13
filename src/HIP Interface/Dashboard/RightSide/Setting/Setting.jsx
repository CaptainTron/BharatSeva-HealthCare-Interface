import "./Setting.css"
import { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";
import { PostData } from "../../../LoadData";



export default function Setting() {
    const HealthCare = JSON.parse(sessionStorage.getItem("BharatSevahealthCare"))
    const [Fetched, SetFetched] = useState({
        IsGood: true,
        IsLimit: false
    })

    async function OnchangeData(e) {
        const { name, value } = e.target;
        SetFetched((p) => ({ ...p, IsFetched: false }))
        try {
            let { data, res } = await PostData('http://bharatsevaplus-env.eba-buh5payn.ap-south-1.elasticbeanstalk.com/api/v1/healthcaredetails/healthcare/changepreferance', { [name]: value })
            if (res.ok) {
                alert("Preference Successfully Changed")
            }
        } catch (err) {
            alert("Could Not Connect To server... :(")
        }
        SetFetched((p) => ({ ...p, IsFetched: true }))

    }
    useEffect(() => {
        GetData();
    }, [])



    async function GetData() {
        try {
            const Data = await fetch('http://localhost:5000/api/v1/healthcaredetails/healthcare/getpreferance', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${HealthCare.token}`
                }
            })
            const Dataas = await Data.json()
            if (Data.ok) {
                CheckForRadioButton(Dataas)
            }
            else if (Data.status === 405) {
                alert("Request Limit Reached")
                SetFetched((p) => ({ ...p, IsLimit: true }))
            }
        } catch (err) {
            console.log(err)
            alert("Could Not Connect to Server... :(")
            SetFetched((p) => ({ ...p, IsGood: false }))
        }

    }


    // CheckForRadioButton();
    function CheckForRadioButton(Dataas) {
        const GetRadioButton = document.getElementsByName("available")
        if (Dataas.available === "true") {
            GetRadioButton[0].checked = true
        } else {
            GetRadioButton[1].checked = true
        }

        const GetRadioButton_Email = document.getElementsByName("email")
        if (Dataas.email === "Weekly") {
            GetRadioButton_Email[1].checked = true
        }
        else if (Dataas.email === "Rare") {
            GetRadioButton_Email[2].checked = true
        }
        else {
            GetRadioButton_Email[0].checked = true
        }
        const Deletebtn = document.querySelector(".AccountDeleteBtn")
        if (Dataas.Acccount_Deletion) {
            Deletebtn.classList.add("AccountDeleted")
            Deletebtn.textContent = "Account Deletion Scheduled"
        }

    }

    async function DeleteMyAccount() {
        let txt = "Are You Sure!"
        if (confirm(txt)) {
            try {
                let response = await fetch(`http://localhost:5000/api/v1/healthcaredetails/healthcare/deleteaccount`, {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        'Authorization': `Bearer ${HealthCare.token}`
                    }
                })
                let Response = await response.json()
                if (response.ok) {
                    alert("Account Scheduled For Deletion!")
                    document.querySelector(".AccountDeleteBtn").classList.add("AccountDeleted")
                    document.querySelector(".AccountDeleteBtn").textContent = "Account Deletion Scheduled"
                }
            } catch (err) {
                alert("Could Not Connect To Server")
            }
        }
    }


    return (
        <>
            {Fetched.IsLimit && (<Navigate to="/bharatseva_healthcare/login" replace={true} />)}
            <div className="settcontain">

                {(Fetched.IsGood ? (
                    <>
                        <div className="SettingContainer">

                            <div>
                                <header>
                                    <h2>Setting</h2>
                                </header>


                                <div className="availableYesOrNo">
                                    <h3 className="textDecoration">Availability</h3>
                                    <div className="SettingAvailable">
                                        <form onChange={OnchangeData}>
                                            <label>Is Your Facility Available To NearBy ?</label><br />
                                            <input type="radio" name="available" value="true" />
                                            <label>Yes (Recommended)</label><br />

                                            <input type="radio" name="available" value="false" />
                                            <label>No</label>
                                        </form>
                                    </div>
                                </div>

                                <div className="SettingPreferances">
                                    <h3 className="textDecoration">Email Preferances</h3>
                                    <form onChange={OnchangeData}>
                                        <label>Receive Email Regarding Health Care ?</label><br />

                                        <input type="radio" value="Everytime" name="email" />
                                        <label>Every Events (Recommended)</label><br />

                                        <input type="radio" value="Weekly" name="email" />
                                        <label >Weekly</label><br />

                                        <input type="radio" value="Rare" name="email" />
                                        <label >Rarely</label>

                                    </form>
                                </div>

                                <div className="SettingAccountDeleting">
                                    <h3 className="textDecoration">Danger Zone</h3>
                                    <div className="DeleteAccountContainer">
                                        <p>Be Aware, this action cannot be Undone !</p>
                                        <div onClick={DeleteMyAccount} className="AccountDeleteBtn">Request To Delete My Account</div>
                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="Settingarticle">
                            <article><strong><i className="fa-solid fa-triangle-exclamation"></i>  - </strong>Viewing and making any Patient Records, Your activity will be recorded.
                            </article>
                        </div>
                    </>
                ) : <p className="CouldnotConnect">Could Not Connect To Server...🙄</p>)}

            </div>
        </>
    )
}