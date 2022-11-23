import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon'
import { useDispatch,useSelector } from 'react-redux';
import { gql,useQuery } from '@apollo/client';

export default function ShipmentReturn() {
  const [datass,setDatass]=useState()
  const gqlship=gql`
  query($input: ShipmentInputFilter){
    getFilteredShipment(input: $input) {
      _id
      shipmentID
      shipmentStatus
      pickupDate
      customerID
      orgDeliveryDate
      actualReceivedDate
      image
      hubID
      driverAssigned
      driver {
        fullName 
        mobile
      }
      customer {
        phoneNumber
      }
     locationAddress
    }
    getActiveDriver {
      _id
      fullName
    }
    getAllWarehouseID {
      _id
      warehouseID
    }
 }`
 const {loading,error,data,refetch}=useQuery(gqlship,{
  variables:{input:{returned:true
  }
}})
const dispatch=useDispatch()
  const fetched=useSelector(state=>state.shipment.updated)
  const[lookups,setLookups]=useState({})
useEffect(()=>{
refetch()
if(data)
{
  const looks = data.getAllWarehouseID?.reduce(function(acc, cur, i) {
    acc[cur._id] = cur.warehouseID;
    return acc;
    }, {});
  console.log(data)
  const datas=data.getFilteredShipment?.map(e=>({
    _id:e._id,
    shipmentID:e.shipmentID,
    shipmentStatus:e?.shipmentStatus,
    pickupDate:e.pickupDate,
    customerID:e.customerID,
    orgDeliveryDate:e.pickupDate,
    actualReceivedDate:e.actualReceivedDate,
    proofDoc:e?.image,
    hubID:e.hubID,
    mobile:e.driver?.mobile,
    locationAddress:e.locationAddress,
    driverAssigned:e.driver?.fullName
        }))
        setLookups(looks)
        setDatass(datas)
}

},[data,fetched])

  return (
    <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Shipment</Card.Title>
                            
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                         components={{
                          Container: props => <div {...props} elevation={0}/>
                     }}
                         responsive
      title="Shipment returned"
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'Pickup Date', field: 'pickupDate',type:'date',editable:'onAdd'},
        { title: 'Shipment ID', field: 'shipmentID', type:'string',editable:'never'},
        { title: 'Customer ID', field: 'customerID', type:'string',editable:'never'},
        { title: 'Pickup Location', field: 'locationAddress', type: 'string' ,editable:'onAdd'},
        { title: 'Assigned Driver', field: 'driverAssigned',type:'string'},
        { title: 'Driver Phone', field: 'mobile',type:'string'},
        { title: 'Warehouse ID', field: 'hubID',lookup:lookups,editable:'onAdd' },
        { title: 'Org.Delivery Date', field: 'orgDeliveryDate', type: 'date',hidden:true },
        { title: 'ReceivedDate', field: 'actualReceivedDate', type: 'date',editable:'onAdd' },
      ]}
      data={datass}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton:true,
        columnsButton:true,
        filtering:true,
        maxBodyHeight: '550px',
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: 1,backgroundColor:"#FE7C7C",color:"white",fontSize:"16px",margin:'0px',padding:'10px 2px'
      },
      pageSize:10,
      }}
        />
    </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}





