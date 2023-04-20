import { CustomerViews } from "./CustomerView"
import { EmployeeViews } from "./EmployeeView"


export const ApplicationViews = () => {

    const localKandyUser=localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    
    
    if(kandyUserObject.staff){
        return <EmployeeViews />
    }
    else{
        return <CustomerViews />
    }
}

