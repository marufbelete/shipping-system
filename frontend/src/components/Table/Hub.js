import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from './Tableicon'
import {CustomeButton} from '../styled/main.styled'
import { getHub,updateHub,addHub,deleteHub} from '../../store/hubHttp';
import { useSelector,useDispatch } from 'react-redux';
import FileImport from '../Reusable/importfile'
import CustomerDetail from '../../views/shipment/customerDetail';
import { modalActions } from '../../store/modal-slice';
import  AddCustomer  from '../../views/shipment/AddCustomer';
import {SiHomeassistant} from 'react-icons/si'
export default function Hub() {
  const img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxqj4g_kSPWDcvOTZTmelBbX6Id6OvZ6VjPQ&usqp=CAU'
  const ImportImage=()=>{

  }
  const tabledata=useSelector(state=>state.users.tableData)
  const data=tabledata.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.users.updated)
  const dispatch=useDispatch()
  const addActionRef = React.useRef();

  useEffect(()=>{
dispatch(getHub())
  },[fetched])
  const [columns, setColumns] = useState([
    {title: "id", field: "_id", hidden: true},
    { title: 'Hub ID', field: 'hubID' },
    { title: 'Hub Name', field: 'hubName'},
    { title: 'Hub Address', field: 'hubAddress'},
  ]);

  return (
    <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Location And Hub</Card.Title>
                            <Row style={{float:'right'}}>
                            <CustomeButton onClick={() => addActionRef.current.click()} new>Add New Hub <SiHomeassistant size={20}/></CustomeButton>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                         components={{
                          Container: props => <div {...props} elevation={0}/>,
                          Action: props => {
                            //If isn't the add action
                            console.log(props)
                            if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                              console.log("not done")
                                  return <MTableAction {...props} />
                            } 
                            else {
                              console.log("done")
                                  return <div ref={addActionRef} onClick={props.action.onClick}/>;
                            }
                          }
                     }}
                         responsive
      title="Hub List"
      columns={columns}
      data={data}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton:true,
        columnsButton:true,
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: 0,backgroundColor:"#FE7C7C",color:"white",fontSize:"16px"
      },
      pageSize:10,
      }}
    
      editable={{
        onRowAdd: (newData) => 
        new Promise((resolve, reject) => {
          dispatch(addHub(newData,resolve))
      }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              dispatch(updateHub(oldData._id,newData,resolve))
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              dispatch(deleteHub(oldData._id,resolve))
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





