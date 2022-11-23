import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'
const SHIPMENTDELIVERE='2222'
const SHIPMENTCANCELED='4444'
const SHIPMENTOUTFORDELIVERY='1111'
const SHIPMENTRETURNED='3333'     
                
const BarDiscreteChart = () => {
    const [Delivere,setDeliverd]=useState([])
    const [Onprogres,setOnprogress]=useState([])
    const [Canceled,setCanceled]=useState([])
    const [Returned,setReturned]=useState([])
    const sortState=useSelector(state=>state.dashboard.sort)
    const datum = [
        {
            key: 'Delivere',
            color: 'rgb(62 191 234)',
            values:Delivere
        },
        {
            key: 'In progress',
            color: 'rgb(29 233 182)',
            values: Onprogres
        },
        {
            key: 'Canceled',
            color: 'rgb(162 91 234)',
            values:Canceled
        },
        {
            key: 'Returned',
            color: 'rgb(219 33 12)',
            values: Returned
        }
    ]
    const gqlhub=gql`
    query($input:ShipmentInputSort){    
        getHubStatus(input: $input) {
        
            shipmentStatus
            hubID
            count
            warehouse {
                warehouseID
              }
          }
       }`
       const {loading,error,data,refetch}=useQuery(gqlhub,{
        variables:{input:{filter:sortState
        }
      }})
      const fetched=useSelector(state=>state.shipment.updated)
      useEffect(()=>{
        refetch()
        if(data)
        {
            console.log(data)
            const shipment=data?.getHubStatus?.map(e=>({shipmentStatus:e.shipmentStatus,label:e.warehouse?.warehouseID,value:e.count}))
            const delivere=shipment?.filter(e=>e.shipmentStatus==SHIPMENTDELIVERE&&e.label!==undefined).map(e=>({label:e.label,value:e.value,color:'rgb(62 191 234)'}))
            const onProgress=shipment?.filter(e=>e.shipmentStatus==SHIPMENTOUTFORDELIVERY&&e.label!==undefined).map(e=>({label:e.label,value:e.value,color:'rgb(29 233 182)'}))
            const canceled=shipment?.filter(e=>e.shipmentStatus==SHIPMENTCANCELED&&e.label!==undefined).map(e=>({label:e.label,value:e.value,color:'rgb(162 91 234)'}))
            const returned=shipment?.filter(e=>e.shipmentStatus==SHIPMENTRETURNED&&e.label!==undefined).map(e=>({label:e.label,value:e.value,color:'rgb(219 33 12)'}))
            setDeliverd(delivere)
            setOnprogress(onProgress)
            setCanceled(canceled)
            setReturned(returned)
        }
    },[data,sortState,fetched])
    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default BarDiscreteChart;
