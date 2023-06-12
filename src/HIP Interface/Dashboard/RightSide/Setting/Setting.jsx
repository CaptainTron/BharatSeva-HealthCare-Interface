import "./Setting.css"
import Hospitals from "./Firebase/Service"
import { useEffect, useState } from 'react'
import { doc, docs } from "firebase/firestore"



export default function Setting() {


    function OnchangeData(e) {
        const { name, value } = e.target;
        // SetFormData((prev) => ({
        //     ...prev,
        //     [name]: value
        // }))
        fetch('http://localhost:5000/api/v1/healthcare/firebase/chpre', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("HealthCare_TOKEN")}`
            },
            body: JSON.stringify({ [name]: value, HealthId: localStorage.getItem("Health_Id") })
        })
            .then((data) => {
                console.log("Data has Been Updated....")
            })
            .catch((err) => {
                console.log("Something went Wrong in Updating the data...", err.message)
            })
    }

    async function UpdateData() {

        // console.log(Formdata, Isloaded[0].id)
        // const data = await Hospitals.U_Records(, Formdata)

        fetch('http://localhost:5000/api/v1/healthcare/firebase/chpre', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer YourToken"
            },
            body: JSON.stringify({ ...Formdata, HealthId: "2021071042" })
        })
            .then((data) => {
                console.log("Data has Been Updated....")
            })
            .catch((err) => {
                console.log("Something went Wrong in Updating the data...", err.message)
            })

    }


    useEffect(() => {
        GetData();
    }, [])

    async function GetData(e) {

        const Data = await fetch('http://localhost:5000/api/v1/healthcare/firebase/GET', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("HealthCare_TOKEN")}`,
                "Health_Id": localStorage.getItem("Health_Id")
            }
        })
        const Dataas = await Data.json()
        console.log(Dataas);

        CheckForRadioButton(Dataas)

    }

    function CheckForRadioButton(Dataas) {
        const GetRadioButton = document.getElementsByName("available")
        if (Dataas.Data.available === "true") {
            GetRadioButton[0].checked = true
        } else {
            GetRadioButton[1].checked = true
        }

        const GetRadioButton_Email = document.getElementsByName("email")
        if (Dataas.Data.email === "Weekly")
            GetRadioButton_Email[1].checked = true
        else if (Dataas.Data.email === "Rare")
            GetRadioButton_Email[2].checked = true
        else
            GetRadioButton_Email[0].checked = true
    }

    // CheckForRadioButton();




    return (
        <>
            <div className="settcontain">

                <div className="SettingContainer">
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
                            <button>Request To Delete My Account</button>
                        </div>

                    </div>


                </div>


                <div className="Settingarticle">
                    <article><strong>Warning: - </strong>If You View, Make Or Change with Patient Data your acitivity will be recorded.
                        In Worst Case We Have the Right To Remove You From Our Esteemed Platform</article>
                </div>
            </div>
        </>
    )
}