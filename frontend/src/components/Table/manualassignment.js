import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {getActiveShipment,assignDriver,assignMultipleDriver } from '../../store/shipmentHttp';
import { useDispatch,useSelector } from 'react-redux';
import {tableIcons,driverIcons} from './Tableicon'
import { gql,useQuery } from '@apollo/client';
export default function ManualAssignment() {
  const dispatch=useDispatch()
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
  variables:{input:{onprogress:true
  }
}})
  const fetched=useSelector(state=>state.shipment.updated)
  const[lookups1,setLookups1]=useState({})
  const[lookups2,setLookups2]=useState({})
  useEffect(()=>{
    refetch()
    if(data)
    {
      const looks1 = data.getAllWarehouseID?.reduce(function(acc, cur, i) {
        acc[cur._id] = cur.warehouseID;
        return acc;
        }, {});
      const datas=data.getFilteredShipment?.map(e=>({
        _id:e._id,
        shipmentID:e.shipmentID,
        shipmentStatus:e.shipmentStatus,
        pickupDate:e.pickupDate,
        customerID:e.customerID,
        orgDeliveryDate:e.pickupDate,
        actualReceivedDate:e.actualReceivedDate,
        proofDoc:e.image,
        mobile:e.customer?.phoneNumber,
        locationAddress:e.locationAddress,
        driverAssigned:e.driverAssigned,
        hubID:e.hubID
            }))
            setLookups1(looks1)
            setDatass(datas)
      const looks2 = data.getActiveDriver?.reduce(function(acc, cur, i) {
        acc[cur._id] = cur.fullName;
        return acc;
        }, {});
        setLookups2(looks2)
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
      title="Manual Assignment"
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'Pickup Date', field: 'pickupDate',type:'date',editable:'onAdd'},
        { title: 'Shipment ID', field: 'shipmentID', type:'string',editable:'never'},
        { title: 'Pickup Location', field: 'locationAddress', type: 'string' ,editable:'onAdd'},
        { title: 'Assigned Driver', field: 'driverAssigned', lookup:lookups2},
        { title: 'Customer Phone', field: 'mobile',type:'string',editable:'never'},
        { title: 'Warehouse ID', field: 'hubID',lookup:lookups1,editable:'onAdd' },
        { title: 'Org.Delivery Date', field: 'orgDeliveryDate', type: 'date',hidden:true },
        { title: 'ReceivedDate', field: 'actualReceivedDate', type: 'date',editable:'onAdd' },
      ]}
      data={datass}
      icons={driverIcons}
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

      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            dispatch(assignDriver(oldData._id,{driverID:newData.driverAssigned},resolve))
          }),
          onBulkUpdate: selectedData =>
          new Promise((resolve, reject) => {
            console.log(selectedData)
            const rows=Object.values(selectedData)
            console.log(rows)
            const newDriver=rows.map(emp=>({
              _id:emp.newData._id,
              driverAssigned:emp.newData.driverAssigned
            }))
            console.log(newDriver)
          dispatch(assignMultipleDriver(newDriver,resolve))
          }),
      }}
    />
    </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}





