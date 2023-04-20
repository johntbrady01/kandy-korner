import {useState, useEffect} from "react"
import { Customer } from "./Customers"
import "./Customers.css"


export const CustomerList = () => {
    const [customers, setCustomers]=useState([])


useEffect(
    () => {
       fetch(` http://localhost:8088/customers?_expand=users`)
            .then(response => response.json())
            .then((customerArray) =>{
                setCustomers(customerArray)
            })
    },
    [] 
)


return <>



<article className="customers">
        {
            customers.map(customer=> <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                name={customer.users.name} 
                //getCustomers={getCustomers}
                />)
        }
</article>
</>
}