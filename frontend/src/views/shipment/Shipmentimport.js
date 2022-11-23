import React,{useRef,useState,useEffect} from 'react';
import { Row, Col, Card, Table,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { modalActions } from '../../store/modal-slice';
import MaterialTable from 'material-table';
import { tableIcons } from '../../components/Table/Tableicon';
import { tablemodalActions } from '../../store/tablemodal-slice';
import { AiFillCheckCircle,AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import { addShipments } from '../../store/shipmentHttp';

const customStyles = {
    content: {
      top: '55%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'70%',
      maxHeight:'520px'
    },
  };
Modal.setAppElement("#root");
const TableModal = ({lookups}) => {
  const dispatch=useDispatch()

    function toggleModal() {
        console.log("close")
        dispatch(tablemodalActions.setVisibility(false))
      }    
    const isModalOpen=useSelector(state=>state.tablemodal.isOpen)
    const fileName=useSelector(state=>state.tablemodal.fileName)
    const tabledata=useSelector(state=>state.tablemodal.tableData)
    const isEditing=useSelector(state=>state.tablemodal.isEditing)
console.log(tabledata)
    function excelDate(excelDate) {
      console.log(excelDate)
      var converted_date = excelDate.split('T')[0];
      return converted_date;
  }

    function excelDate(excelDate) {
      console.log(excelDate)
      var date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000));
      var converted_date = date.toISOString().split('T')[0];
      return converted_date;
  }
  const datat=[{}]
  let results;
  if(!isEditing)
  {
      tabledata.length&&tabledata.forEach((tdata,index)=>{
        const pickupDate=typeof tdata['Pickup Date']==="number"?excelDate(tdata['Pickup Date']):tdata['Pickup Date']
        const orgDeliveryDate=typeof tdata['Org.Delivery Date']==="number"?excelDate(tdata['Org.Delivery Date']):tdata['Org.Delivery Date']
        const actualReceivedDate=typeof tdata['ReceivedDate']==="number"?excelDate(tdata['ReceivedDate']):tdata['Received Date']
        const deliveryETA=typeof tdata["Delivery ETA"]==="number"?excelDate(tdata["Delivery ETA"]):tdata["Delivery ETA"]

          datat.push({
            pickupDate,
            customerID:tdata['Customer ID'],
            pickupLocation:tdata['Pickup Location'],
            shipmentID:tdata["Shipment ID"],
            hubID:tdata["Warehouse ID"],
            AWB:tdata["AWB"],
            CODAmount:tdata["COD Amount"],
            deliveryETA:deliveryETA,
            orgDeliveryDate,
            actualReceivedDate
          })
    })
    console.log(datat)
    results = datat.filter(element => {
      if (Object.keys(element).length !== 0) {
        return true;
      }
    
      return false;
    });
  }
  else
  {
    results=tabledata.map(o => ({ ...o }));
  }
    const AddHandler=()=>{
      dispatch(addShipments(tabledata))
      dispatch(tablemodalActions.setVisibility(false))
    }
    
    return (
        <React.Fragment>
             <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}>
          <Card style={{padding:'20px',position:'relative'}}>
            <MaterialTable
                         components={{
                            Container: props => <div {...props} elevation={0}/>
                       }}
                         responsive
      title={`File:${fileName}`}
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'Pickup Date', field: 'pickupDate',type:'date'},
        { title: 'Shipment ID', field: 'shipmentID', type:'string',editable:'never'},
        { title: 'Customer ID', field: 'customerID', type:'string'},
        { title: 'Warehouse ID', field: 'hubID', lookup:lookups},
        { title: 'Pickup Location', field: 'pickupLocation', type:'string'},
        { title: 'Delivery ETA', field: 'deliveryETA', type: 'time'},
        { title: 'AWB', field: 'AWB', type: 'string'},
        { title: 'COD Amount', field: 'CODAmount', type: 'string'},
        { title: 'Org.Delivery Date', field: 'orgDeliveryDate', type: 'date'},
        { title: 'Received dDate', field: 'actualReceivedDate', type: 'date'},
    ]}
      data={results}
      icons={tableIcons}
      style={{padding:'0px'}}
      options={{
        pageSizeOptions:10
      }}
      editable={{
        onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataDelete = [...results];
            console.log(oldData)
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            console.log('after delete')
            console.log(dataDelete)
            dispatch(tablemodalActions.setEditing(true))                   
            dispatch(tablemodalActions.setTableModal([...dataDelete]))   
            resolve()
          }, 1000)
        }),
          onBulkUpdate: selectedData =>
          new Promise((resolve, reject) => {
            console.log("clicked")
            const rows=Object.values(selectedData)
            const updateRows=[...results]
            let index;
            rows.map(emp=>{
              index=emp.oldData.tableData.id
              updateRows[index]=emp.newData
            })
              dispatch(tablemodalActions.setEditing(true))                   
              dispatch(tablemodalActions.setTableModal(updateRows))
              console.log(updateRows)
              resolve()
          }),
      }}
     />
     </Card>
     <Row style={{justifyContent:'center', padding:'0px',margin:'0px'}}>
     <Button onClick={AddHandler} style={{width:'130px',height:'40px', marginRight:'30px'}}>Confirm <AiFillCheckCircle fontSize={24}/></Button>
     <Button onClick={()=>{dispatch(tablemodalActions.setVisibility(false))}} style={{width:'130px', padding:'0px'}}>Cancel <AiFillCloseCircle  fontSize={24}/></Button>
     </Row>
            </Modal>
        </React.Fragment>
    );
};

export default TableModal;



   