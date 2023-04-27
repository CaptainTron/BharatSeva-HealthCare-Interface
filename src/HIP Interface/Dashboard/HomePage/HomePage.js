import "./HomePage.css"
import LefSideBar from "../LeftSide/LeftSideBar"
import NavBar from "../NavBar/NavBar"
import RightSide from "../RightSide/RightSide"


export default function HomePage() {

    function toggleSideBar(){
        document.querySelector(".LeftSideBarContainer").classList.toggle("ToggleTo0");
        document.querySelector(".RightSideBar").classList.toggle("ToggleTo100");

    }
    
    return (
        <>
            <div className="HomePageContainer">

                {/* Notification NavBar Goes Here */}
                <NavBar toggleSideBar={toggleSideBar}/>

                <div className="SideBarContainer">

                {/* Toggle LeftSide Bar Goes Here */}
                <LefSideBar />

                {/* RightSide */}
                <RightSide/>

                </div>
            </div>
        </>
    )

    }