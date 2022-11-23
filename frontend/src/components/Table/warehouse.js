import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon'
import {FormControlLabel,Switch} from "@material-ui/core";
import { getWarehouse,updateWarehouse, updateWarehouseStatus } from '../../store/hubHttp';
import { useSelector,useDispatch  } from 'react-redux';
import {CustomeButton} from '../styled/main.styled';
import { modalActions } from '../../store/modal-slice';
import {AiFillCar} from 'react-icons/ai';
import AddWarehouse from '../../views/shipment/AddWarehouse';
import {SiHomeassistant} from "react-icons/si"

export default function Warehouse() {
const dispatch=useDispatch()
const tableRef = useRef();
  const changeRow = (oldRow, e) => {
      console.log(oldRow.status)
      dispatch(updateWarehouseStatus(oldRow._id,{status:!oldRow.status}))
  };
  const tabledata=useSelector(state=>state.users.tableData)
  const data=tabledata.map(o => ({ ...o }));
  console.log(data)
  const fetched=useSelector(state=>state.users.updated)
  const profile=useSelector(state=>state.userinfo)
  useEffect(()=>{
    dispatch(getWarehouse())
  },[fetched])
  // useEffect(()=>{
  //   setColumns()
  //     },[fetched,tabledata])
  return (
    <React.Fragment>
      <AddWarehouse/>
    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Shipment</Card.Title>
                    {profile.role==='1111'&&<Row style={{float:'right'}}>
                            <CustomeButton onClick={()=>dispatch(modalActions.setForm(true))} new>Add Warehouse <SiHomeassistant size={20}/></CustomeButton>
                            </Row>}
                </Card.Header>
                <Card.Body>
                <MaterialTable
                style={{zIndex:0}}
                tableRef={tableRef}
                 components={{
                    Container: props => <div {...props} elevation={0}/>
               }}
                 responsive
      title="Warehouse"
      columns={[
        {title: "id", field: "id", hidden: true},
        { title: 'Warehouse ID', field: 'warehouseID' },
        { title: 'Country', field: 'country'},
        { title: 'City', field: 'city' },
        { title: 'Exact Location', field: 'exactLocation'},
        { title: 'Cutt-Off Time Type', field: 'cutofTimeType',lookup: { "111": 'Auto', '222': 'Manual' }, },
        { title: 'Cutt-Off Time', field: 'cutoffTime',type:"time",editable: ( _ ,rowData ) => rowData && rowData.cutofTimeType === '222'},
        {
          title: "Status",
          field: "status",
          render: (data, id) => (
            <FormControlLabel
              control={
                <Switch
                  checked={data?.status?data?.status:false}
                  onChange={e => changeRow(data, e)}
                  name="status"
                  color="primary"
                />
              }
              label={data.status ? "Available" : "Not Available"}
            />
          )
        },
        { title: 'Contact Person', field: 'conatactPerson'},
        { title: 'Contact Phone', field: 'contactPhone' },
        { title: 'Alternative Contact', field: 'alternativeContact'},
      ]}
      data={data}
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
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            dispatch(updateWarehouse(oldData._id,newData,resolve))
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





