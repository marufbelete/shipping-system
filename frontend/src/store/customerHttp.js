import { userActions } from "./user-slice"
import { errorActions } from "./error-slice"
import { loginActions } from "./login-slice"
import {loadingActions} from './loading-slice'
import axios_instance from "./domain"
export const addCustomer=(data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.post('addcustomer',data)
            console.log(res.data)
            dispatch(userActions.setFetch(true))
            dispatch(errorActions.Message('added'))
            dispatch(loadingActions.status("done"))
            
        }
       catch(err)
       {
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     dispatch(loadingActions.status('done'))

       }

    }
}
export const getAllCustomer=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getallcustomer')
            dispatch(userActions.setTableData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const updateCustomer=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatecustomer/${id}`,data)
            dispatch(userActions.setFetch())
            console.log(res)
            resolve()
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     resolve()

       }

    }
}


export const deleteCustomer=(id,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.delete(`deletecustomer/${id}`)
            dispatch(userActions.setFetch())
            console.log(res)
            resolve()
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     resolve()

       }

    }
}