import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () =>{
 
    const [productTypes, setProductTypes] = useState([])
    const [product, update] = useState({
    
    })

    useEffect(
        () => {
          
           fetch(`http://localhost:8088/productTypes`)
           .then(response => response.json())
           .then((productsTypesArray) =>{
                setProductTypes(productsTypesArray)
            })
           
        },
        [] 
    )

    const navigate=useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToApi ={
            name:product.name,
            productTypesId:product.type,
            price:product.price
           }
        if(product.name&&product.type&&product.price){
           return fetch(`http://localhost:8088/products`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(productToSendToApi)

   })
   .then(response => response.json())
   .then(() => {
        navigate("/products")
   }) 
        }
    }

    return (
        <form className="productForm">
        <h2 className="productForm__title">New Product</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Name of Product"
                    value={product.name}
                    onChange={
                        (evt)=>{
                            const copy = {...product}
                            copy.name=evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Type:</label>
                {productTypes.map((productType)=>{
                return <article key={productType.id}>{productType.type}
                <input type="radio"
                    value={parseInt(productType.id)}
                    name="types"
                    onChange={
                        (evt)=>{
                            const copy = {...product}
                            copy.type=parseInt(evt.target.value)
                            update(copy)
                        }
                    } /> </article>})}
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Product Price:</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="Price of Product"
                    value={product.price}
                    onChange={
                        (evt)=>{
                            const copy = {...product}
                            copy.price=parseInt(evt.target.value)
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