import { loginActions } from "./login-slice"
import { loadingActions } from "./loading-slice"
import { errorActions } from "./error-slice"
import { userActions } from "./user-slice"
import { userinfoActions } from "./userinfo-slice"
import axios_instance from "./domain"
export const addUser=(data)=>{
    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios_instance.post('register',data)
            dispatch(userActions.setFetch(true))
            dispatch(loadingActions.status("done"))
            dispatch(errorActions.Message('added'))
            
        }
       catch(err)
       {

        !!err.response&&dispatch(errorActions.Message(err.response.data.message))
        !err.response&&dispatch(errorActions.Message('connection error please try again'))
        dispatch(loadingActions.status('done'))
   

       }

    }
}
export const checkSession=()=>{
    return async(dispatch)=>{
        try{
            await axios_instance.get('checkauth')
        }
       catch(err)
       {
        console.log( err.response)
        err.response.data.message==="no token"&&dispatch(loginActions.isLoged(false))
        err.response.data.message==="no token"&&dispatch(errorActions.Message(''))
       }

    }
}

export const loginUser=(data)=>{
    console.log(data)
    return async(dispatch)=>{
        try{
            const res=await axios_instance.post('login',data)
            console.log(res)
            dispatch(loginActions.setCookie(res.data.token))
            dispatch(loginActions.isLoged(true))
            dispatch(loadingActions.status('done'))
            dispatch(userinfoActions.setUser({username:res.data.user,role:res.data.role}))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(loginActions.isLoged(false))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     dispatch(loadingActions.status('done'))

     
       }

    }
}
export const sendEmail=(data)=>{
    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios_instance.post('emailsend',data)
            console.log(res)
            dispatch(loadingActions.status("done"))
            dispatch(errorActions.Message('added'))          
        }
       catch(err)
       {
           console.log(err)
        !!err.response&&dispatch(errorActions.Message(err.response.data.message))
        !err.response&&dispatch(errorActions.Message('connection error please try again'))
        dispatch(loadingActions.status('done'))
   
       }

    }
}

export const resetPassword=(token)=>{
    return async(dispatch)=>{
        try{
            console.log("reset")
            const res=await axios_instance.post(`resetpassword/${token.token}`,{password:token.password})
            console.log(res)
            dispatch(loadingActions.status("done"))
            dispatch(errorActions.Message('reseted'))
        }
       catch(err)
       {
           console.log(err)
           console.log(err.response.data.msg)
        !!err.response&&dispatch(errorActions.Message(err.response.data.msg))
        !err.response&&dispatch(errorActions.Message('connection error please try again'))
        dispatch(loadingActions.status('done'))
   
       }

    }
}