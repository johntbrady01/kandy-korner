import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () =>{
 

    const [locations, setLocations] = useState([])
    const [employee, update] = useState({ })
    const [user, updateUser] = useState({ })

    useEffect(
        () => {
          
           fetch(`http://localhost:8088/locations`)
           .then(response => response.json())
           .then((locationsArray) =>{
                setLocations(locationsArray)
            })
           
        },
        [] 
    )

    useEffect(
        () => {
          
           fetch(`http://localhost:8088/locations`)
           .then(response => response.json())
           .then((locationsArray) =>{
                setLocations(locationsArray)
            })
           
        },
        [] 
    )
    
    
    const navigate=useNavigate()
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        user.isStaff=true
        
        const userToSendToApi ={
            name:user.name,
            email:user.email,
            isStaff:user.isStaff,
        }
        const employeeToSendToApi ={
            startDate:employee.startDate,
            payRate:employee.payRate,
            locationsId:employee.locationsId
}
     
           return fetch(`http://localhost:8088/users`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userToSendToApi)

        })
        .then(response => response.json())
        .then((user) => {
         employeeToSendToApi.usersId=user.id
        
       return fetch(`http://localhost:8088/employees`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(employeeToSendToApi)
   })})
   .then(() => {
        navigate("/employees")
   }) 
        
    }

    return (
        
        <form className="employeeForm">
        <h2 className="employeeForm__title">New Employee</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Employee's Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Name of Employee"
                    value={user.name}
                    onChange={
                        (evt)=>{
                            const copy = {...user}
                            copy.name=evt.target.value
                            updateUser(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="email">Employee's Email:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Employee's Email"
                    value={user.email}
                    onChange={
                        (evt)=>{
                            const copy = {...user}
                            copy.email=evt.target.value
                            updateUser(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Location:</label>
                {locations.map((location)=>{
                return <article key={location.id}>{location.name}
                <input type="radio"
                    value={parseInt(location.id)}
                    name="types"
                    onChange={
                        (evt)=>{
                            const copy = {...employee}
                            copy.locationsId=parseInt(evt.target.value)
                            update(copy)
                        }
                    } /> </article>})}
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="start date">Start Date:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Start Date"
                    value={employee.startDate}
                    onChange={
                        (evt)=>{
                            const copy = {...employee}
                            copy.startDate=evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Pay Rate:</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="Pay Rate"
                    value={employee.payRate}
                    onChange={
                        (evt)=>{
                            const copy = {...employee}
                            copy.payRate=parseInt(evt.target.value)
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button 
            onClick={(clickEvent)=>{
                handleSaveButtonClick(clickEvent)}  }
        
        className="btn btn-primary">
            Submit
        </button>
    </form>
    
            )
}