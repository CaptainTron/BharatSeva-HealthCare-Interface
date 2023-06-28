import "./Setting.css"
import Hospitals from "./Firebase/Service"
import { useEffect, useState } from 'react'
import { doc, docs } from "firebase/firestore"



export default function Setting() {

    const [IsFetched, SetIsFetched] = useState()
    const HealthCare = JSON.parse(sessionStorage.getItem("BharatSevahealthCare"))

    async function OnchangeData(e) {
        const { name, value } = e.target;
        try {
            let res = await fetch('http://localhost:5000/api/v1/healthcaredetails/healthcare/changepreferance', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${HealthCare.token}`
                },
                body: JSON.stringify({ [name]: value })
            })
            let response = await res.json()
            if (res.ok) {
                alert("Preference Successfully Changed")
                console.log(response)
            }
        } catch (err) {
            alert("Could Not Connect To server... :(")
        }

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
        } catch (err) {
            alert("Could Not Connect to Server... :(")
        }
    }

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

        console.log(Dataas)

        const Deletebtn = document.querySelector(".AccountDeleteBtn")
        if (Dataas.Acccount_Deletion) {
            Deletebtn.classList.add("AccountDeleted")
            Deletebtn.textContent = "Account Deletion Scheduled"
        }

    }

    // CheckForRadioButton();

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
            <div className="settcontain">

                <div className="SettingContainer">

                    {true ?

                        (<div>
                            <header>
                                <h2>Setting</h2>
                            </header>


                            <div className="availableYesOrNo">
                                <h3 className="textDecoration">Availability</h3>
                                <div className="SettingAvailable">
                                    <form onChange={OnchangeData}>
                                        <label>Is Your Facility Available To NearBy ?</label><br />
                                        <input type="radio" name="available" value="true" />
                                        <label for="yes">Yes (Recommended)</label><br />

                                        <input type="radio" name="available" value="false" />
                                        <label for="no">No</label>
                                    </form>
                                </div>
                            </div>

                            <div className="SettingPreferances">
                                <h3 className="textDecoration">Email Preferances</h3>
                                <form onChange={OnchangeData}>
                                    <label>Receive Email Regarding Health Care ?</label><br />

                                    <input type="radio" value="Everytime" name="email" />
                                    <label for="Everytime">Every Events (Recommended)</label><br />

                                    <input type="radio" value="Weekly" name="email" />
                                    <label for="Weekly">Weekly</label><br />

                                    <input type="radio" value="Rare" name="email" />
                                    <label for="Rare">Rarely</label>

                                </form>
                            </div>

                            <div className="SettingAccountDeleting">
                                <h3 className="textDecoration">Danger Zone</h3>
                                <div className="DeleteAccountContainer">
                                    <p>Be Aware, this action cannot be Undone !</p>
                                    <div onClick={DeleteMyAccount} className="AccountDeleteBtn">Request To Delete My Account</div>
                                </div>

                            </div>

                        </div>) :

                        (<p>Connecting to Server....</p>)}

                </div>


                <div className="Settingarticle">
                    <article><strong>Alert: - </strong>If You View, Change or Create a Patient Data your acitivity will be recorded.
                    </article>
                </div>
            </div>
        </>
    )
}