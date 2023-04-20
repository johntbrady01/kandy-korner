
import { Locations } from "../auth/Locations"
import { Route, Routes, Outlet } from "react-router-dom"
import { Products } from "../auth/Products"
import { ProductContainer } from "../auth/ProductContainer"
import { PurchaseProducts } from "../auth/PurchaseProducts"
import { Orders } from "../auth/Orders"

export const CustomerViews = () => {
	return <Routes>
                <Route path="/" element={
                        <>
                            <h1>Kandy Korner</h1>
                            <div>Kandy</div>

                            <Outlet />
                        </>
                    }>
                        <Route path="/locations" element={ <Locations/> } />
                        <Route path="/products" element={ <Products/> } />
                        <Route path="/orders" element={ <Orders/> } />
                        <Route path="products/:productId" element={<PurchaseProducts/>} />
                        <Route path="findproducts" element={ <ProductContainer/> } />
                </Route>
	        </Routes>
}
