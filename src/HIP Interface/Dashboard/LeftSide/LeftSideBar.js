import "./LeftSideBar.css"
import React from "react"

export default function LefSideBar() {




    return (
        <>
        <div className="LeftSideBarContainer ToggleTo0">

        <div className="LeftSide_textContainer">
            <ul>
                <li><i className="fa-solid fa-house"></i>Home</li>
                <li><i className="fa-brands fa-creative-commons-by"></i>Create Patient BioData</li>
                <li><i className="fa-regular fa-paste"></i>View Patient Record</li>
                <li><i className="fa-solid fa-hospital-user"></i>View Patient Bio-Data</li>
                <li><i className="fa-solid fa-newspaper"></i>Genrate Record</li>
                <li><i className="fa-solid fa-gear"></i>Setting <i className="fa-solid fa-chevron-down"></i>
                
                <div className="SettingDropDownMenu">
                    <ul>
                        <li>Change Preferances</li>
                        <li>Lock My Account</li>
                        <li>Change Mailing Preferances</li>
                    </ul>
                </div>
                
                </li>
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