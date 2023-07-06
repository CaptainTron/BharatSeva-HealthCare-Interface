import "./LeftSideBar.css"
import React from "react"
import { Link } from "react-router-dom"
export default function LefSideBar() {


    function SettingToggle() {
        document.querySelector(".Settingpopups").classList.toggle("DisplayToggleSetting")
    }


    return (
        <>
            <div className="LeftSideBarContainer ToggleTo0">
                <div className="LeftSide_textContainer">
                    <ul>
                        <Link to='/dashboard/home'> <li><i className="fa-solid fa-house"></i>Home</li></Link>
                        <Link to='/dashboard/viewpatientbiodata'> <li><i className="fa-solid fa-hospital-user"></i>View Bio-Data</li></Link>
                        <Link to='/dashboard/viewrecords'>  <li><i className="fa-regular fa-paste"></i>View Records</li></Link>
                        <Link to='/dashboard/createpatientbiodata'>  <li><i className="fa-brands fa-creative-commons-by"></i>Genrate Bio-Data</li>   </Link>
                        
                        <Link to='/dashboard/createrecords'>  <li><i className="fa-solid fa-newspaper"></i>Genrate Record</li>   </Link>
                        <Link to='/dashboard/appointment'>  <li><i className="fa-regular fa-calendar"></i>Appointments</li>   </Link>
                        <Link to='/dashboard/setting'>  <li onClick={SettingToggle}><i className="fa-solid fa-gear"></i><div className="SettingNavbar"><span className="settinghealthcaredown">Setting</span> <i className="fa-solid fa-chevron-down settinghealthcaredown"></i></div></li>   </Link> 

                        <div className="SettingDropDownMenu">
                            <ul className="Settingpopups DisplayToggleSetting">
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