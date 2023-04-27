import "./Home.css"

export default function Home() {





    return (
        <>
            <div className="HomeContainer">
                <h2>About</h2>
                <div className="AboutMe">
                    <ul className="HomeContainer_UL">
                        <li><p>Name: </p>Vaibhav Hospital</li>
                        <li><p>Address: </p>Gorakhpur, India, 273010</li>
                        <li><p>Type: </p>Multispeciality</li>
                        <li><p>Availability: </p>24X7 Hours</li>

                        {/* <li><p>Facilities</p>Darmatologist, Orthology, Neurologoy, Emergency and all the feature</li> */}
                        <li><p>Total Facilities: </p>203</li>
                        <lI><p>Total MBBS Doc. :</p>32</lI>
                        <li><p>Total Workers: </p>502</li>
                        <li><p>No. of Beds: </p>403</li>
                        <li><p>Ambulance Facilities: </p>YES</li>
                        <li><p>Registered Since: </p>27 March 2023</li>
                    </ul>
                </div>

                <div className="Health_Services">
                    <h2>Total Records</h2>
                    <div className="Health_ServicesRecords">
                        <ul className="HomeContainer_UL Health_ServicesRecords_UL">
                            <li><p>Records Created: </p>5</li>
                            <li><p>Records Updated: </p>32</li>
                            <li><p>Records Viewed: </p>5</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}