import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"



export const Products = ({id}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] =useState([])
    const [topPriced, setTopPriced] =useState(false)
    const navigate = useNavigate()

    const localKandyUser=localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    




    useEffect(
        () => {
          
           fetch(`http://localhost:8088/products?_expand=productTypes&&_sort=name`)
           .then(response => response.json())
           .then((productsArray) =>{
               setProducts(productsArray)
               setFiltered(productsArray)
             
            })
           
        },
        [] 
    )
 


    useEffect(
        ()=>{
            if(topPriced){
                const topPricedProducts=products.filter(product=>product.price>10)
                setFiltered(topPricedProducts)
            }
            else{
                setFiltered(products)
            }
        },
        [topPriced]

)



        if(!kandyUserObject.staff){
        return <>
                {
               kandyUserObject.staff
               ?<>
               <button onClick={() => navigate("/products/create")}>New Product</button>
                </>
                :<>
            
  
                </>
}
                
                <h2>Products</h2>
           <article className="products">
                {
                    filteredProducts.map(
                        (product)=>{
                            return <section key={product.id} className="product">
                                <header>{product.name}</header>
                                <footer>Type:{product.productTypes.type}</footer>
                                <footer>Price:${product.price}</footer>
                                <button
                                onClick={()=>navigate(`/products/${product.id}`)}
                                >Purchase Product</button>
                            </section>

                        }
                    )
                }
           </article>

          </>
            
            }
            else{
                return <>
                {
               kandyUserObject.staff
               ?<>
               <button onClick={() => navigate("/products/create")}>New Product</button>
                </>
                :<>
            
  
                </>
}
                
                <h2>Products</h2>
           <article className="products">
                {
                    filteredProducts.map(
                        (product)=>{
                            return <section key={product.id} className="product">
                                <header>{product.name}</header>
                                <footer>Type:{product.productTypes.type}</footer>
                                <footer>Price:${product.price}</footer>
                            </section>

                        }
                    )
                }
           </article>

          </>
            }
            
        }