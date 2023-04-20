import {useState, useEffect} from "react"

export const Orders = () => {
    const[customers,updateCustomer] = useState([])

    const[purchases,updatePurchases] = useState([])



    const localKandyUser=localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    
    
    
    useEffect(()=>{
        fetch(`http://localhost:8088/customers`)
        .then(response=>response.json())
        .then((customerObject)=>{
            updateCustomer(customerObject)
        })
        
        
    },  [])
    const userCustomer=customers.find(customer => customer.usersId === kandyUserObject.id)
    const customerId=userCustomer?.id
   
        

   useEffect(()=>{
        fetch(`http://localhost:8088/purchases?_expand=products&customersId=${customerId}`)
        .then(response=>response.json())
        .then((purchaseObject)=>{
            updatePurchases(purchaseObject)
        })
        
        
    },  [userCustomer])

    return <>

        <h2>My Orders</h2>
           <article className="purchases">
                {
                    purchases.map(
                        (purchase)=>{
                            return <section key={purchase.id} className="purchase">
                                <header>{purchase?.products?.name}</header>
                                <footer>Price:${purchase?.products?.price}</footer>
                            </section>

                        }
                    )
                }
           </article>



    </>
}