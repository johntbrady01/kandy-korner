import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Products } from "./Products"

export const PurchaseProducts = ()=>{
    const {productId}=useParams()
    const[customers,updateCustomer] = useState([])
    const[products, updateProducts] = useState([])
    const [purchase, updatePurchase]= useState({
        productAmount:1
    })

    const localKandyUser=localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const navigate=useNavigate()
    

    useEffect(()=>{
        fetch(`http://localhost:8088/products?id=${productId}`)
            .then(response=>response.json())
            .then((data)=>{
                const purchaseObject=data[0]
                updateProducts(purchaseObject)
            })


    },  [])

    useEffect(()=>{
        fetch(`http://localhost:8088/customers`)
        .then(response=>response.json())
        .then((customerObject)=>{
            updateCustomer(customerObject)
        })
        
        
    },  [])
    const userCustomer=customers.find(customer => customer.usersId === kandyUserObject.id)

    const productsId= parseInt(productId)

  
   
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()


    const purchaseToSendToApi ={
        customersId:userCustomer.id,
        productsId:productsId,
        productAmount:purchase.productAmount
       }

       return fetch(`http://localhost:8088/purchases`, {
                            method:"POST",
                            headers: {
                                "Content-Type":"application/json"
                            },
                            body: JSON.stringify(purchaseToSendToApi)

                   })
                   .then(response => response.json())
                   .then(() => {
                        navigate("/products")
                   }) 
                }
 return <>
  <form className="purchaseForm">
            <h2 className="purchaseForm__title">Buy {products?.name} </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Amount:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={purchase?.productAmount}
                        onChange={
                            (evt)=>{
                                const copy = {...purchase}
                                copy.productAmount=parseInt(evt.target.value)
                                updatePurchase(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent)=>{handleSaveButtonClick(clickEvent)}  }
            
            className="btn btn-primary">
                Purchase
            </button>
        </form>
 

         
 
 
 
 
 
 </>

}