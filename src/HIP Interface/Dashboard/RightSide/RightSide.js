import CreatePatientRecord from "./CreatePatientRecord/Cr_PatientRecord"
import Home from "./Home/Home"
import "./RightSide.css"
import ViewRecord from "./ViewRecord/ViewRecord"
import ViewPatientBioData from "./View_PatientBioData/ViewPatientBioData"



export default function RightSide(){


    return(
        <>
        <div className="RightSideBar DisplayFlexJustify">

        {/* <Home/> */}
        {/* <CreatePatientRecord/> */}
        {/* <ViewRecord/> */}
        < ViewPatientBioData />
        </div>
        </>
    )
}