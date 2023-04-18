import "./HomePage.css"
import LefSideBar from "./LeftSideBar"
import NavBar from "./NavBar/NavBar"
export default function HomePage() {

    
    return (
        <>
            <div className="HomePageContainer">

                {/* Notification NavBar Goes Here */}
                <NavBar/>

                {/* Toggle LeftSide Bar Goes Here */}
                <LefSideBar />


            </div>
        </>
    )

    }