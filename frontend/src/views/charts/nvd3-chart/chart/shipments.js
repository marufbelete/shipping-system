import React,{useState,useEffect} from 'react';
import NVD3Chart from 'react-nvd3';
import { gql,useQuery } from '@apollo/client';
import {useSelector} from 'react-redux'
import moment from 'moment'
const SHIPMENTDELIVERED='2222'
const SHIPMENTCANCELED='4444'
const SHIPMENTOUTFORDELIVERY='1111'
const SHIPMENTRETURNED='3333'

const LineChart = () => {
    const [Delivered,setDeliverd]=useState([])
    const [Onprogress,setOnprogress]=useState([])
    const [Canceled,setCanceled]=useState([])
    const [All,setAll]=useState([])
    const sortState=useSelector(state=>state.dashboard.sort)
    const fetched=useSelector(state=>state.shipment.updated)
    const datas= [
        {
            key: 'Delivered',
            color: '#A389D4',
            values: Delivered,
        },
        {
            key: 'Canceled',
            color: '#04a9f5',
            values:Canceled,
          
        },
        {
            key: 'On Progress',
            color: '#04a93e',
            values:Onprogress, 
        },
        {
        key: 'All Shipment',
        color: '#1de9b6',
        area: true,
        values:All,
        }]

    const gqlship=gql`
    query($input:ShipmentInputSort){    
        getAllShipmentGroupByDate(input: $input) {
            shipmentStatus
            createdAt
            count
           }
           getAllShipmentByDate(input: $input) {
            shipmentStatus
            createdAt
            count
           }
       }`
       const {loading,error,data,refetch}=useQuery(gqlship,{
        variables:{input:{filter:sortState
        }
      }})
    useEffect(()=>{
        refetch()
        if(data)
        {
            let linedata=data.getAllShipmentGroupByDate?.map((e)=>{
                let day=new Date(e.createdAt)
                return ({
                    x:day.getTime(),
                    y:e.count,
                    status:e.shipmentStatus
                })
            })
            let alldata=data.getAllShipmentByDate?.map((e)=>{
                let day=new Date(e.createdAt)
                return ({
                    x:day.getTime(),
                    y:e.count,
                })
            })
            console.log("all Data")
            console.log(alldata)
            const delivered=linedata?.filter(e=>e.status===SHIPMENTDELIVERED)?.map(e=>({x:e.x,y:e.y}))
            const canceled=linedata?.filter(e=>e.status===SHIPMENTCANCELED)?.map(e=>({x:e.x,y:e.y}))
            const onprogress=linedata?.filter(e=>e.status===SHIPMENTOUTFORDELIVERY)?.map(e=>({x:e.x,y:e.y}))
            const all=alldata?.map(e=>({x:e.x,y:e.y}))
            setAll(all);
            setDeliverd(delivered)
            setCanceled(canceled)
            setOnprogress(onprogress)   
        }
        
    },[data,fetched,sortState])
    return (
        <React.Fragment>
            {React.createElement(NVD3Chart, {
                xAxis: {
                    axisLabel:('Date'),
                    tickFormat: function(d) {
                     let D=new Date(d)
                     console.log(d)
                    return moment(D.getTime()).format("YYYY-MM-DD");
                    }
                  },
                yAxis: {
                    axisLabel: 'Number Of Shipment (n)',
                    tickFormat: function (d) {
                        return parseFloat(d).toFixed(2);
                    }
                },
                type: 'lineChart',
                datum: datas,
                x: 'x',
                y: 'y',
                height: 300,
                renderEnd: function () {
                }
            })}
        </React.Fragment>
    );
};
export default LineChart;
