import "./NavBar.css"


export default function NavBar({toggleSideBar}) {

    function ToggleNotificationPopOver() {
        document.querySelector(".HealthCare_AccountPopOver").classList.add("DisplayNone")
        document.querySelector(".HealthCare_NotificationPopOver").classList.toggle("DisplayNone")
    }

    function HealthCare_ToggleAccountPopUp() {
        document.querySelector(".HealthCare_NotificationPopOver").classList.add("DisplayNone")
        document.querySelector(".HealthCare_AccountPopOver").classList.toggle("DisplayNone")
    }


        return (
            <>
                <div className="HomePageNavBarContainer DisplayFlexjustifyAlignitem">

                    <div className="LeftSideNavBar DisplayFlexjustifyAlignitem">
                        <i className="fa-solid fa-bars" onClick={()=>toggleSideBar()}></i>
                        <p>Bharat सेवा</p>
                    </div>

                    <div className="LeftSideNavBar_NameTag DisplayFlexjustifyAlignitem">
                        <p><i className="fa-solid fa-user-doctor"></i> Health Care InterFace</p>
                    </div>

                    <div className="LeftSideNavBar_AccountAndNotification DisplayFlexjustifyAlignitem">
                        <p className="DisplayFlexjustifyAlignitem transition4OneSecond" onClick={ToggleNotificationPopOver}><i className="fa-regular fa-bell"></i> Notification
                            <div className="HealthCare_NotificationPopOver DisplayNone">
                                <ul>
                                    <li>Welcome to Bharat Seva HealthCare Dashboard</li>
                                    <li>This App is still Under-development :)</li>
                                    <li>Star this project!</li>
                                </ul>
                            </div>
                        </p>

                        {/* Account Section Goes here */}
                        <p className="DisplayFlexjustifyAlignitem transition4OneSecond" onClick={HealthCare_ToggleAccountPopUp}><i className="fa-solid fa-user"></i> Account

                            <div className="HealthCare_AccountPopOver DisplayNone">
                                <ul>
                                    <li style={{ color: "lime" }}>Signed In As</li>
                                    <li>Vaibhav Hospital</li>
                                </ul>
                            </div>

                        </p>
                    </div>

                </div>
            </>
        )
    }