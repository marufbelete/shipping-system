import React,{useState,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon'
import Modal from "react-modal";
import { useSelector,useDispatch } from 'react-redux';
import CODDetail from '../../views/shipment/CODdetail'
import CODModal from './CODModal';
import {BsCurrencyDollar,BsCurrencyEuro,BsCurrencyYen,BsCurrencyPound,BsCashCoin,BsBack} from "react-icons/bs";
import {TbCurrencyRiyal} from 'react-icons/tb';
import { gql,useQuery } from '@apollo/client';

export default function CODBalance() {
  const AllShipment=gql`
  query{
    getTransaction {
      _id
      hubID
      currency
      collector {
      fullName
      mobile
      }
      driver {
        fullName
        mobile
      }
      createdAt
      CODAmount
    }
    getAllWarehouseID {
      _id
      warehouseID
    }
  }
  `
  const {loading,error,data,refetch}=useQuery(AllShipment)
  const [datass,setDatass]=useState()
  Modal.setAppElement("#root");
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
const datas=data.getTransaction?.map(e=>({
_id:e._id,
drivername:e.driver?.fullName,
driverphone:e.driver?.mobile,
collectername:e.collector?.fullName,
collecterphone:e.collector?.mobile,
date:e.createdAt,
hubID:e.hubID,
currency:e.currency,
balance:e.CODAmount
    }))
setLookups(looks)
setDatass(datas)
}
},[data,fetched])

  return (
    <React.Fragment>
<CODDetail/>
<CODModal/>
    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Shipment</Card.Title>
                    <span className="d-block m-t-5">
                    </span>
                </Card.Header>
                <Card.Body>
                <MaterialTable
                 components={{
                    Container: props => <div {...props} elevation={0}/>
               }}
                 responsive
      title="COD Transaction"
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'Driver Phonne', field: 'driverphone'},
        { title: 'Driver Name', field: 'drivername' },
        { title: 'Collecter Name', field: 'collectername' },
        { title: 'Currency', field: 'currency', hidden: true},
        { title: 'Collecter phone', field: 'collecterphone' },
        { title: 'Transaction Date', field: 'date',type:'date'  },
        { title: 'Warehouse ID',field: 'hubID',lookup:lookups,editable:'onAdd'},
        { title: 'Collected COD Balance', field: 'balance',render:rowData=><>{rowData.currency==5&& <BsCurrencyYen/>||rowData.currency==1&&<TbCurrencyRiyal/>||rowData.currency==2&& <BsCurrencyDollar/>||rowData.currency==3&& <BsCurrencyEuro/>||rowData.currency==4&& <BsCurrencyPound/>}{rowData.balance}</>},
      ]}
      data={datass}
      icons={tableIcons}

      options={{
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
        actionsColumnIndex: -1,
        exportButton:true,
        columnsButton:true,
        filtering:true,
       
      }}
      localization={{
        body: {
          addTooltip: 'Add new COD balance',
          editTooltip: 'Edit COD balance',
          deleteTooltip: 'Delete COD balance',
       }
     }}
    />
    </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}





