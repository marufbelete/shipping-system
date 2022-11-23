import React,{useState,useEffect,useRef} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon';
import {CustomeButton, ProofDoc, Span, Templates} from '../styled/main.styled';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal-slice';
import FileImport from '../Reusable/importfile';
import TableModal from '../../views/shipment/Shipmentimport';
import {getShipment, updateShipment,updateProofDoc } from '../../store/shipmentHttp';
import AddShipment from '../../views/shipment/AddShipment';
import ShipmentDetail from '../../views/shipment/shipmentdetail';
import {MdAddShoppingCart} from 'react-icons/md';
import{BsPencilFill} from 'react-icons/bs'
import {FcDownload} from 'react-icons/fc'
import { FileInput } from '../styled/main.styled';
import { gql,useQuery } from '@apollo/client';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
const ShipmentTable = () => {
  const [datass,setDatass]=useState()
  const [isOpen, setIsOpen] = useState(1);
  const AllShipment=gql`
  query{
    getAllShipment {
      _id
      shipmentID
      shipmentStatus
      pickupDate
      customerID
      hubID
      CODAmount
      orgDeliveryDate
      actualReceivedDate
      image
      locationAddress
     warehouse{
      warehouseID
     }
    }
    getAllWarehouseID {
      _id
      warehouseID
    }
    }
  `
  const {loading,error,data,refetch}=useQuery(AllShipment)
  const fileref=useRef()
  const fetched=useSelector(state=>state.shipment.updated)
  const [shipmentID,setShipmentID]=useState('')
  const dispatch=useDispatch()
  const profile=useSelector(state=>state.userinfo)
  const [id,setID]=useState()
  const AddproofDoc=(ids)=>{
    setID(ids)
    console.log(ids)
    fileref.current.click()
  }
  const SendDoc=()=>{
  const file= fileref.current?.files[0]  
  console.log(id)
  //call api chnagge photo
  dispatch(updateProofDoc(id,file))
  }

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
      const datas=data.getAllShipment?.map(e=>({
      _id:e._id,
      shipmentID:e.shipmentID,
      shipmentStatus:e.shipmentStatus,
      pickupDate:e.pickupDate,
      customerID:e.customerID,
      orgDeliveryDate:e.pickupDate,
      actualReceivedDate:e.actualReceivedDate,
      proofDoc:e.image,
      hubID:e.hubID,
      CODAmount:e.CODAmount,
      locationAddress:e.locationAddress
          }))
          setLookups(looks)
          setDatass(datas)
      }
  },[data,fetched])
    return (
        <React.Fragment>
          <a href='/template.xlsx' download>
                <Templates>
                   <div>Download Template<FcDownload size={20}/></div></Templates>
                   </a>

          <FileInput ref={fileref} type="file" onChange={SendDoc}/>
          <AddShipment/>
          <TableModal lookups={lookups}/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Shipment</Card.Title>
                            <Row style={{float:"right"}}>
                           <FileImport name={"Shipment"}/>
                            <CustomeButton onClick={()=>dispatch(modalActions.setForm(true))} new>Add New Shipment<MdAddShoppingCart size={20}/></CustomeButton>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        <ShipmentDetail style={{postion:'relatice',zIndex:'1.2'}} shipmentID={shipmentID}/>
                        <MaterialTable
                        style={{zIndex:0}}
                         components={{
                            Container: props => <div {...props} elevation={0}/>
                           }}
                           
      responsive
      title="All Shipment"
      columns={ [
        {title: "id", field: "_id", hidden: true},
        { title: 'Pickup Date', field: 'pickupDate',type:'date',editable:'onAdd'},
        { title: 'Status', field: 'shipmentStatus',lookup: { 2222: 'Delivered', 1111: 'onProgress',3333:'Returned',4444:'Canceled' },editable: ( _ ,rowData ) =>rowData&&(rowData.shipmentStatus==1111)||(rowData.shipmentStatus==2222&&profile.role==="1111")},
        { title: 'Shipment ID', field: 'shipmentID', type:'string',editable:'never'},
        { title: 'Customer ID', field: 'customerID', type:'string',editable: ( _ ,rowData ) =>rowData&&(rowData.shipmentStatus==1111)},
        { title: 'COD Amount', field: 'CODAmount', type:'string',hidden:profile.role!=="1111",editable: ( _ ,rowData ) => rowData&&(rowData.shipmentStatus==1111)},
        { title: 'Proof Doc.', field: 'proofdoc', render: (url) =>url.proofDoc==="undefined"?<span>Empty<Span><BsPencilFill size={20} onClick={()=>AddproofDoc(url._id)}/></Span></span>:
        <>{isOpen===url._id &&<Lightbox
        mainSrc={`http://137.184.143.106:8000/images/${url.proofDoc}`}
        onCloseRequest={() => setIsOpen(false)}
      />}<ProofDoc onClick={() => setIsOpen(url._id)} src={`http://137.184.143.106:8000/images/${url.proofDoc}`}/><Span><BsPencilFill size={20} onClick={()=>AddproofDoc(url._id)}/></Span></>,editable:'never' },
        { title: 'Pickup Location', field: 'locationAddress', type: 'string' ,editable:'onAdd'},
        { title: 'Org.Delivery Date', field: 'orgDeliveryDate', type: 'date',editable:'onAdd'},
        { title: 'Warehouse ID', field: 'hubID',lookup:lookups,editable:'never' },
        { title: 'ReceivedDate', field: 'actualReceivedDate', type: 'date',editable:'onAdd' },
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
        exportAllData:true,
        filtering:true,
        columnsButton:true,
        addRowPosition: 'first',
      }}
      localization={{
        body: {
          addTooltip: 'Add new shipment',
          editTooltip: 'Edit shipment',
          deleteTooltip: 'Delete shipment',
       }
}}
actions={[
  {
    icon:() => <CustomeButton style={{zIndex:'0'}} >Detail</CustomeButton>,
    tooltip: 'shipment detail',
    position:'row',
    
    onClick: (evt, Data) => {
      const data= JSON.parse(JSON.stringify(Data));
      dispatch(modalActions.setData(data))
      dispatch(modalActions.setModal(true))
      setShipmentID(Data._id)
    }
  },
]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            console.log(oldData.shipmentID)
             dispatch(updateShipment(oldData._id,newData,resolve))
          }),
      }}
    />
    </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
    );
};


export default ShipmentTable