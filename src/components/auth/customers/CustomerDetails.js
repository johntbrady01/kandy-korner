import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LoyaltyNumber } from "./LoyaltyNumber"
import "./Customers.css"

export const CustomerDetails = () => {
    const {customerId}=useParams()
    const [customer, updateCustomer]=useState({
        loyaltyNumber:0,
        usersId:0,
    })
   


   

    useEffect(
        () => {
           fetch(`http://localhost:8088/customers?_expand=users&id=${customerId}`)
                .then(response => response.json())
                .then((data) =>{
                    const singleCustomer=data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId] 
    )
   

        // TODO: Provide initial state for profile

        const [feedback, setFeedback] = useState("")
    
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
    
        
      
    
        // TODO: Get employee profile info from API and update state
        useEffect(()=>{
            fetch(`http://localhost:8088/customers?_expand=users&id=${customerId}`)
                .then(response=>response.json())
                .then((data)=>{
                    const customerObject=data[0]
                    updateCustomer(customerObject)
                })
    
    
        },  [])
    
        const handleSaveButtonClick = (event) => {
            event.preventDefault()
    
          
    
                return fetch(`http://localhost:8088/customers/${customer.id}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    loyaltyNumber:customer.loyaltyNumber,
                    usersId:customer.usersId

                })
        })
    
    
                .then(response=>response.json())
                .then(()=>{
                    
                })
                .then(() => {
                    setFeedback("Loyalty Number successfully saved")
                })
              
        }


    return <>
      <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
        <form className="number">
            <h2 className="number__title">Loyalty Number</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Loyalty Number:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        value={customer.loyaltyNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...customer}
                                copy.loyaltyNumber=parseInt(evt.target.value)
                                updateCustomer(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent)=> handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Loyalty Number
            </button>
        </form>
  
    
    <section className="customer">
    <header className="customer_header">{customer?.users?.name}</header>
    <div>Email: {customer?.users?.email}</div>
    <div>Loyalty Number: {customer?.loyaltyNumber}</div>
</section>
</>
}