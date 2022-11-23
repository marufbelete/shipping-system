import { userActions } from "./user-slice"
import { errorActions } from "./error-slice"
import { loginActions } from "./login-slice"
import {loadingActions} from './loading-slice'
import axios_instance from "./domain"
export const addLocation=(data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.post('addlocation',data)
            console.log(res.data)
            dispatch(userActions.setFetch(true))
            dispatch(errorActions.Message('added'))
            dispatch(loadingActions.status("done"))
            resolve()
        }
       catch(err)
       {
        console.log(err)
        dispatch(loadingActions.status("done"))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     resolve()

       }

    }
}
export const addLocations=(data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.post('addlocations',data)
            console.log(res.data)
            dispatch(userActions.setFetch(true))
            dispatch(errorActions.Message('added'))
            dispatch(loadingActions.status("done"))
            resolve()
        }
       catch(err)
       {
        console.log(err)
        dispatch(loadingActions.status("done"))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     resolve()

       }

    }
}
export const getLocation=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getlocation')
            console.log(res.data)
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
export const updateLocation=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatelocation/${id}`,data)
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

export const deleteLocation=(id,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.delete(`deletelocation/${id}`)
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