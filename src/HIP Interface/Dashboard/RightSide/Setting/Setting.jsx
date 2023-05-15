import "./Setting.css"
import Hospitals from "./Firebase/Service"
import { useEffect, useState } from 'react'
import { doc } from "firebase/firestore"


export default function Setting() {

    const [Isloaded, SetIsloaded] = useState();

    const [Formdata, SetFormData] = useState({
        "available": true,
        "email": "daily"
    })
    function OnchangeData(e) {
        const { name, value } = e.target;
        SetFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log("I'm inside Onchange", Formdata)
    }



    async function GetData(e) {
        const data = await Hospitals.GetAllRecords()
        SetIsloaded(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log(Isloaded[0].id)
    }
    useEffect(() => {
        GetData();
    }, [])

    useEffect(() => {
        UpdateData();
    }, [Formdata])

    async function UpdateData() {
        const data = await Hospitals.U_Records(Isloaded[0].id, Formdata)
        console.log("Data has Been Updated....")

    }
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
                                <input type="radio" name="available"  value="true" />
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

                            <input type="radio" value="everytime"  name="email" />
                            <label for="everytime">Every Events (Recommended)</label><br />

                            <input type="radio" value="weekly" name="email" />
                            <label for="weekly">Weekly</label><br />

                            <input type="radio" value="rare" name="email" />
                            <label for="rare">Rarely</label>

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