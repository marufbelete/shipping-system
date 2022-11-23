import { userActions } from "./user-slice"
import { loginActions } from "./login-slice"
import { errorActions } from "./error-slice"
import {loadingActions} from './loading-slice'
import axios_instance from "./domain"
export const addDriver=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('adddriver')
            console.log(res.data)
            dispatch(userActions.setTableData(res.data))
            dispatch(loadingActions.status("done"))
            dispatch(errorActions.Message('added'))

        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getAllUser=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getalluser')
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
export const getProfile=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getmyinfo')
            console.log(res.data)
            // dispatch(loginActions.isLoged(true))
            dispatch(userActions.setProfile(res.data))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}

export const getAllDriver=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getalldriver')
            console.log(res.data)
            // dispatch(loginActions.isLoged(true))
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
export const updateUser=(id,data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updateuser/${id}`,data)
            dispatch(userActions.setFetch())
            console.log(res)
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const updateStatus=(id,data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatestate/${id}`,data)
            dispatch(userActions.setFetch())
            console.log(res)
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}

export const changePassword=(data)=>{
    return async(dispatch)=>{
        try{
            await axios_instance.put(`changepassword`,data)
            dispatch(userActions.setFetch())
            dispatch(errorActions.Message(''))
            dispatch(loadingActions.status('done'))
            dispatch(errorActions.Message('added'))
            
        }
       catch(err)
       {
        console.log(err)
    dispatch(loadingActions.status('done'))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}


export const deleteUser=(id,data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.delete(`deleteuser/${id}`)
            dispatch(userActions.setFetch())
            console.log(res)
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}