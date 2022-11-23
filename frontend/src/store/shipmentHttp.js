import { shipmentActions } from "./shipment-slice"
import { errorActions } from "./error-slice"
import { loginActions } from "./login-slice"
import {loadingActions} from "./loading-slice"
import axios_instance from "./domain"
export const addShipment=(data)=>{
    const formData = new FormData();
    formData.append("shipmentStatus",data.value);
    formData.append("customerID",data.customerID);
    data.warehouseID&&formData.append("hubID",data.warehouseID);
    formData.append("pickupDate",data.pickupDate);
    formData.append("locationAddress",data.pickupLocation);
    formData.append("orgDeliveryDate",data.orgDeliveryDate);
    formData.append("actualReceivedDate",data.actualReceivedDate);
    formData.append("shipmentSequence",data.shipmentSequence);
    formData.append("AWB",data.AWB);
    formData.append("CODAmount",data.CODAmount);
    formData.append("currency",data.currency);
    formData.append("latituide",data.latitude);
    formData.append("longitude",data.longtuide);
    formData.append("deliveryETA",data.deliveryTime);
    formData.append("image",data.image);

    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios_instance.post('createshipment',formData,{headers: {
                "Content-Type": "multipart/form-data",
              }})
            dispatch(shipmentActions.setFetch())
            dispatch(loadingActions.status('done'))
            dispatch(errorActions.Message('added'))
            console.log(res)
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
export const updateProofDoc=(id,data)=>{
    const formData = new FormData();
    formData.append("image",data)
    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios_instance.put(`updateproofdoc/${id}`,formData,{headers: {
                "Content-Type": "multipart/form-data",
              }})
            dispatch(shipmentActions.setFetch())
            dispatch(loadingActions.status('done'))
            dispatch(errorActions.Message('added'))
            console.log(res)
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
export const addShipments=(data)=>{
    return async(dispatch)=>{
        try{
            const Fdata = data.map(e => ({ 
                pickupDate:e.pickupDate,
                customerID:e.customerID,
                pickupLocation:e.pickupLocation,
                hubID:e.hubID,
                CODAmount:e.CODAmount,
                AWB:e.AWB,
                deliveryETA:e.deliveryETA,
                orgDeliveryDate:e.orgDeliveryDate,
                actualReceivedDate:e.actualReceivedDate
            }));
            const res=await axios_instance.post('createshipments',Fdata)
            dispatch(shipmentActions.setFetch())
            dispatch(loadingActions.status("done"))
            dispatch(errorActions.Message('added'))

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
export const getShipment=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getshipment')
            console.log(res.data)
            // dispatch(loginActions.isLoged(true))
            dispatch(shipmentActions.setTableData(res.data))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getActiveShipment=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getshipmentbystatus?onprogress=true')
            // console.log(res.data)
            // dispatch(loginActions.isLoged(true))
            dispatch(shipmentActions.setTableData(res.data))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getReturnedShipment=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getshipmentbystatus?returned=true')
            // console.log(res.data)
            // dispatch(loginActions.isLoged(true))
            dispatch(shipmentActions.setTableData(res.data))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const assignDriver=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`assigndriver/${id}`,data)
            console.log(res.data)
            dispatch(shipmentActions.setFetch())
            resolve()
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const assignMultipleDriver=(data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`assignmultipledriver`,data)
            console.log(res.data)
            dispatch(shipmentActions.setFetch())
            resolve()
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}

export const updateShipment=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            console.log(id)
            const res=await axios_instance.put(`updateshipment/${id}`,data)
            dispatch(shipmentActions.setFetch())
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

export const updateAssignShipment=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            console.log(id)
            const res=await axios_instance.put(`updateassignshipment/${id}`,data)
            dispatch(shipmentActions.setFetch())
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
