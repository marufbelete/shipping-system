import React,{useState,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon'
import {useHistory} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import {CustomeButton,CustomeCollect} from '../styled/main.styled'
import Modal from "react-modal";
import { useSelector,useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import CODDetail from '../../views/shipment/CODdetail';
import {BsCurrencyDollar,BsCurrencyEuro,BsCurrencyYen,BsCurrencyPound,BsCashCoin,BsBack} from "react-icons/bs";
import {TbCurrencyRiyal} from 'react-icons/tb';
import { userActions } from '../../store/user-slice';
import CODModal from './CODModal';
import { gql,useQuery } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';

export default function CODBalance() {
  const AllShipment=gql`
  query{
    getAllDriver {
      _id
      mobile
      fullName
      hubID
      shipment {
        count
        currency
      }
    }
    getAllWarehouseID {
      _id
      warehouseID
    }
    }
  `
  const [datass,setDatass]=useState()
  const [popdata,setPopdata]=useState()
  const [codDetail,setCodDetail]=useState()
  const {loading,error,data,refetch}=useQuery(AllShipment)
  Modal.setAppElement("#root");
  const dispatch=useDispatch()
  const fetched=useSelector(state=>state.shipment.updated)
  const message=useSelector(state=>state.message.errMessage)

  const notify = () => toast.success('COD collected Successfully.', {
    duration: 4000,
  });
  useEffect(()=>{
    console.log(message)
    message==='collected'&&notify()
    },[message])
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
const datas=data.getAllDriver?.map(e=>({
_id:e._id,
mobile:e.mobile,
name:e.fullName,
hubID:e.hubID,
currency:e.shipment?.currency,
balance:e.shipment?.count?e.shipment?.count:0
    }))
    console.log(datas)
    setDatass(datas)
    setLookups(looks)
}
},[data,fetched])
  return (
    <React.Fragment>
<Toaster />

    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">COD Balance</Card.Title>
                </Card.Header>
                <Card.Body>
                <CODDetail style={{postion:'relatice',zIndex:'1.2'}} driver={codDetail}/>
                <CODModal style={{postion:'relatice',zIndex:'1.2'}} data={popdata}/>
                <MaterialTable
                style={{zIndex:0}}
                 components={{
                    Container: props => <div {...props} elevation={0}/>
               }}
                 responsive
      title="COD Balance"
      columns={ [
        {title: "id", field: "_id", hidden: true},
        { title: 'Driver Phone', field: 'mobile'},
        { title: 'Driver Full Name', field: 'name' },
        { title: 'COD Total Balance', field: 'balance',render:rowData=><>{rowData.currency==5&& <BsCurrencyYen/>||rowData.currency==1&&<TbCurrencyRiyal/>||rowData.currency==2&& <BsCurrencyDollar/>||rowData.currency==3&& <BsCurrencyEuro/>||rowData.currency==4&& <BsCurrencyPound/>}{rowData.balance}</>},
        { title: 'Warehouse ID',field: 'hubID',lookup:lookups,editable:'onAdd'},
      
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
      actions={
        [
          (rowdata) => ({
            icon:() => <CustomeButton style={{zIndex:'0'}}>Detail</CustomeButton>,
            tooltip: 'COD balance detail',
            position:'row',
            disabled:rowdata.balance==0,
            onClick: (evt, Data) => {
              dispatch(modalActions.setModal(true))
              setCodDetail(Data._id)
              console.log(Data._id)
            }
          }),
          (rowdata) => ({
            icon:() => <CustomeCollect style={{zIndex:'0'}}>Collect</CustomeCollect>,
            tooltip: 'COD confirm collection',
            position:'row',
            disabled:rowdata.balance==0,
            onClick: (evt, Data) => {
              console.log(Data)
              setPopdata(Data)
              dispatch(userActions.setFetch(true))
              dispatch(modalActions.setCODModal(true))
            }
          }),
      ]}
    />
    </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}





