import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"



export const FindProductDisplay = ({searchTermState}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] =useState([])


    

    useEffect(

        ()=>{
            const searchedProducts=products.filter(product=>{
               return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())})
               if(searchTermState!==""){
            setFiltered(searchedProducts)}
            else{
                setFiltered([])
            }
              
        },
        [searchTermState]


    )


    useEffect(
        () => {
          
           fetch(`http://localhost:8088/products?_expand=productTypes&&_sort=name`)
           .then(response => response.json())
           .then((productsArray) =>{
               setProducts(productsArray)
             
            })
           
        },
        [] 
    )
 





           
        return <>
         

                <h2>Products</h2>
           <article className="products">
                {
                    filteredProducts.map(
                        (product)=>{
                            return <section key={product.id} className="product">
                                <header>{product.name}</header>
                                <footer>Price:${product.price}</footer>
                            </section>

                        }
                    )
                }
           </article>

          </>
            
        
            
        }