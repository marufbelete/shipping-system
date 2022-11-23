import React,{useEffect,useState} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'
const SHIPMENTDELIVERED='2222'
const SHIPMENTOUTFORDELIVERY='1111'
                
const MultiBarChart = () => {
    const [Delivered,setDeliverd]=useState([])
    const [Onprogress,setOnprogress]=useState([])
    const sortState=useSelector(state=>state.dashboard.sort)
    const datum = [
        {
            key: 'Delivered',
            color: 'rgb(62 191 234)',
            values:Delivered
        },
        {
            key: 'In progress',
            color: 'rgb(29 233 182)',
            values: Onprogress
        }
    ]
    const gqlship=gql`
    query($input:ShipmentInputSort){    
        getAllShipmentGroupByDriver(input: $input) {
            shipmentStatus
            driver {
              fullName
            }
            count
          }
       }`
       const {loading,error,data,refetch}=useQuery(gqlship,{
        variables:{input:{filter:sortState
        }
      }})
      const fetched=useSelector(state=>state.shipment.updated)
     
      useEffect(()=>{
        refetch()
        if(data)
        {
            const shipment=data?.getAllShipmentGroupByDriver?.map(e=>({shipmentStatus:e.shipmentStatus,label:e.driver?.fullName,value:e.count}))
            const delivered=shipment?.filter(e=>e.shipmentStatus==SHIPMENTDELIVERED&&e.label!==undefined).map(e=>({label:e.label,value:e.value,color:'rgb(62 191 234)'}))
            const onProgress=shipment?.filter(e=>e.shipmentStatus==SHIPMENTOUTFORDELIVERY&&e.label!==undefined).map(e=>({label:e.label,value:e.value,color:'rgb(29 233 182)'}))
            setDeliverd(delivered)
            setOnprogress(onProgress)
        }
    },[data,fetched,sortState])

    return <NVD3Chart tooltip={{ enabled: true}} type="multiBarChart" datum={datum} x="label" y="value" height={300} groupSpacing={0.1} showValues />;
};

export default MultiBarChart;
