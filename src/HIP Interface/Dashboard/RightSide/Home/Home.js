import { useEffect, useState } from "react"
import "./Home.css"

export default function Home() {

    const [hip, Sethip] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/hipinfo/getdata`)
            .then((res) => res.json())
            .then((data) => {
                Sethip(data.data)
                console.log(data)
            })
    }, [])
    let Hipsarrays;
    let hipTotalRecords = [];
    
    if(hip){
        Hipsarrays = (
            <ul className="HomeContainer_UL">
                <li><p>Name: </p>{hip.name}</li>
                <li><p>Address: </p>{hip.address}</li>
                <li><p>Type: </p>{hip.Type}</li>
                <li><p>Availability: </p>{hip.availability}</li>
                <li><p>Total Facilities: </p>{hip.total_facilities}</li>
                <li><p>Total MBBS Doc. :</p>{hip.total_mbbs_doc}</li>
                <li><p>Total Workers: </p>{hip.total_worker}</li>
                <li><p>No. of Beds: </p>{hip.no_of_beds}</li>
                <li><p>Ambulance Facilities: </p>Yes</li>
                <li><p>Ambulance Facilities: </p>Yes</li>
            </ul>
        )
        hipTotalRecords = (
            <ul className="HomeContainer_UL Health_ServicesRecords_UL">
                <li><p>Registered Since: </p>{hip.dateOfRegistration}</li>
                <li><p>Records Created: </p>{hip.records_created}</li>
                <li><p>Records Updated: </p>{hip.records_updated}</li>
                <li><p>Records Viewed: </p>{hip.records_viewed}</li>
            </ul>
    
        )
    }




    return (
        <>
           { hip ? ( <div className="HomeContainer">
                <h2>About</h2>
                <div className="AboutMe ">
                    {Hipsarrays}
                </div>

                <div className="Health_Services">
                    <h2>Total Records</h2>
                    <div className="Health_ServicesRecords Healthcontainerbox">
                        {hipTotalRecords}
                    </div>
                </div> 

            </div>) : <h3> Loading....</h3>}
        </>
    )
}