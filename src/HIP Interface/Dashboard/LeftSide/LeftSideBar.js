import "./LeftSideBar.css"
import React from "react"

export default function LefSideBar() {


    function SettingToggle(){
        document.querySelector(".Settingpopups").classList.toggle("DisplayToggleSetting")
    }


    return (
        <>
            <div className="LeftSideBarContainer ToggleTo0">

                <div className="LeftSide_textContainer">
                    <ul>
                        <li><i className="fa-solid fa-house"></i>Home</li>
                        <li><i className="fa-brands fa-creative-commons-by"></i>Create BioData</li>
                        <li><i className="fa-regular fa-paste"></i>View Records</li>
                        <li><i className="fa-solid fa-hospital-user"></i>View Bio-Data</li>
                        <li><i className="fa-solid fa-newspaper"></i>Genrate Record</li>
                        <li><i className="fa-regular fa-calendar"></i>Appointments</li>
                        <li onClick={SettingToggle}><i className="fa-solid fa-gear"></i><div className="SettingNavbar"><span className="settinghealthcaredown">Setting</span> <i className="fa-solid fa-chevron-down settinghealthcaredown"></i></div></li>

                        <div className="SettingDropDownMenu">
                            <ul className="Settingpopups">
                                <li>Change Preferances</li>
                                <li>Change Mail Preferances</li>
                                <li>Delete My Account</li>
                            </ul>
                        </div>

                    </ul>

                    <div className="TextContainerDownSide">
                        <p>About Us</p>
                        <p>Data Centre</p>
                        <p>Security</p>
                        <p>Contribute</p>
                        <p>Contact Me</p>
                    </div>


                </div>
            </div>

        </>
    )
}