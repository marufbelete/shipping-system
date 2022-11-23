import { userActions } from "./user-slice"
import { errorActions } from "./error-slice"
import { loginActions } from "./login-slice"
import {loadingActions} from './loading-slice'
import axios_instance from "./domain"
export const addHub=(data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.post('addhub',data)
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
export const AddWarehouse=(data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.post('createwarehouse',data)
            console.log(res.data)
            dispatch(userActions.setFetch(true))
            dispatch(errorActions.Message('added'))
            dispatch(loadingActions.status("done"))
        }
       catch(err)
       {
        console.log(err)
        dispatch(loadingActions.status("done"))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getWarehouse=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getwarehouse')
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
export const updateWarehouseStatus=(id,data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatewarehousestate/${id}`,data)
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
export const adjustCutoffTime=(data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`adjustcutofftime`,data)
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
export const analysisAndAssign=(data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`analysisandassign`,data)
            dispatch(userActions.setFetch())
            dispatch(errorActions.Message('anlysed'))
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
export const collectCOD=(data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`collectcod`,data)
            dispatch(userActions.setFetch())
            dispatch(errorActions.Message('collected'))
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
export const getHub=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('gethub')
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
export const updateWarehouse=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatewarehouse/${id}`,data)
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
export const updateHub=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatehub/${id}`,data)
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

export const deleteHub=(id,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.delete(`deletehub/${id}`)
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