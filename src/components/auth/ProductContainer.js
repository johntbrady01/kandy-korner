import { useState } from "react"
import { FindProducts } from "./FindProduct"
import { FindProductDisplay } from "./FindProductDisplay"



export const ProductContainer = () => {
    const [searchTerms, setSearchTerms]= useState("")

    return <>   
                 <FindProducts setterFunction={setSearchTerms}/>

              
                 <FindProductDisplay searchTermState={searchTerms}/>
           </>
}