import CreatePatientRecord from "./CreatePatientRecord/Cr_PatientRecord"
import Home from "./Home/Home"
import "./RightSide.css"
import ViewRecord from "./ViewRecord/ViewRecord"



export default function RightSide(){


    return(
        <>
        <div className="RightSideBar DisplayFlexjustifyAlignitem">

        {/* <Home/> */}
        {/* <ViewRecord/> */}
        <CreatePatientRecord/>

        </div>
        </>
    )
}