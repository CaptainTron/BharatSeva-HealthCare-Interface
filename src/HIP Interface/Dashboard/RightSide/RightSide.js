import CreatePatientRecord from "./CreatePatientRecord/Cr_PatientRecord"
import Home from "./Home/Home"
import "./RightSide.css"
import ViewRecord from "./ViewRecord/ViewRecord"



export default function RightSide(){


    return(
        <>
        <div className="RightSideBar DisplayFlexJustify">

        {/* <Home/> */}
        {/* <ViewRecord/> */}
        {/* <CreatePatientRecord/> */}
        <ViewRecord/>

        </div>
        </>
    )
}