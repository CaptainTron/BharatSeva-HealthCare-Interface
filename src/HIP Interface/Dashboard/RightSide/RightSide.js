import CreatePatientRecord from "./CreatePatientRecord/Cr_PatientRecord"
import CreatePatientD from "./Create_PatientD/CreatePatient"
import Home from "./Home/Home"
import "./RightSide.css"
import Setting from "./Setting/Setting"
import ViewRecord from "./ViewRecord/ViewRecord"
import ViewPatientBioData from "./View_PatientBioData/ViewPatientBioData"



export default function RightSide(){


    return(
        <>
        <div className="RightSideBar DisplayFlexJustify">

        {/* <Home/> */}
        {/* <CreatePatientRecord/> */}
        {/* <ViewRecord/> */}
        {/* < ViewPatientBioData />  */}
        {/* <CreatePatientD/> */}
        <Setting/>
        </div>
        </>
    )
}