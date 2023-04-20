import { useEffect, useState } from "react"
import "./Locations.css"

export const Locations = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
           fetch(` http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) =>{
                    setLocations(locationArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
 


           
        return (
                <>
                <h2>Locations</h2>
           <article className="locations">
                {
                    locations.map(
                        (location)=>{
                            return <section key={location.id} className="location">
                                <header>{location.name}</header>
                                <footer>Address:{location.address}</footer>
                                <footer>Square Footage:{location.squareFootage}</footer>
                            </section>

                        }
                    )
                }
           </article>
              
          </>
        )
            
        }