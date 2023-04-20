import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Employee.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [userId, setUserId] = useState(0)
  
    const [filteredEmployees, setFiltered] =useState([])
    const navigate = useNavigate()

    const localKandyUser=localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    

    const getEmployees = () => {
        fetch(`http://localhost:8088/employees?_expand=users&_expand=locations`)
        .then(response => response.json())
        .then((employeesArray) =>{
            setFiltered(employeesArray)
        })
    }

    useEffect(
        () => {

                fetch(`http://localhost:8088/employees?id=${employees.id}`)
                .then(response => response.json())
                .then((employeeArray) =>{
                    setUserId(employeeArray.usersId)
                })
        },
        [] 
    )

    useEffect(
        () => {
          

            getEmployees()
            /*
           fetch(`http://localhost:8088/employees?_expand=users&_expand=locations`)
           .then(response => response.json())
           .then((employeesArray) =>{
               setEmployees(employeesArray)
               setFiltered(employeesArray)
             
            })
            */
           
        },
        [] 
    )


  

    return <>
        {
               kandyUserObject.staff
               ?<>
               <button onClick={() => navigate("/employees/form")}>New Employee</button>
                </>
                :<>
            
  
                </>
}


    
    <h2>Employees</h2>
           <article className="employees">
                {
                    filteredEmployees.map(
                        (employee)=>{
                            return <section key={employee.id} className="employee">
                                <header>{employee.users.name}</header>
                                <footer>Location:{employee.locations.name}</footer>
                                <footer>Start Date:{employee.startDate}</footer>
                                <footer>Pay Rate:{employee.payRate}</footer>
                                <button 
                               onClick={()=>{
                                fetch(`http://localhost:8088/users/${employee.usersId}`, {
                                    method:"DELETE"
                                })
                                .then(()=>{getEmployees()})
                                
                            
            
                            }} className="ticket__delete">Fire Employee</button>
                            </section>

                        }
                    )
                }
           </article>
    
    
    
    
    </>
}