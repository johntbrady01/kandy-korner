
import { Locations } from "../auth/Locations"
import { Route, Routes, Outlet } from "react-router-dom"
import { Products } from "../auth/Products"
import { ProductForm } from "../auth/ProductForm"
import { EmployeeList } from "../auth/EmployeeList"
import { EmployeeForm } from "../auth/EmployeeForm"
import { CustomerList } from "../auth/customers/CustomerList"
import { CustomerDetails } from "../auth/customers/CustomerDetails"
import { LoyaltyNumber } from "../auth/customers/LoyaltyNumber"

export const EmployeeViews = () => {
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
                        <Route path="/employees" element={ <EmployeeList/> } />
                        <Route path="products/create" element={ <ProductForm /> } />
                        <Route path="employees/form" element={ <EmployeeForm /> } />
                        <Route path="customers" element={<CustomerList /> } />
                        <Route path="customers/:customerId" element={<CustomerDetails/> }/>
                          
                        
               
                </Route>
	        </Routes>
}
