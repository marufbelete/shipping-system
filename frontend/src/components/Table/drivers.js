import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon';
import { useSelector,useDispatch } from 'react-redux';
import { getAllDriver,updateUser,ddDriver,updateStatus} from '../../store/userHttp';
import { modalActions } from '../../store/modal-slice';
import AddUser from '../../views/shipment/Adduser';
import { errorActions } from '../../store/error-slice';
import {AiFillCar} from 'react-icons/ai';
import {CustomeButton} from '../styled/main.styled';
import { gql,useQuery } from '@apollo/client';
import {
  FormControlLabel,
  Switch
} from "@material-ui/core";
export default function Drivers() {
 const tabledata=useSelector(state=>state.users.tableData)
 const datas=tabledata.map(o => ({ ...o }));
 const fetched=useSelector(state=>state.users.updated)
 const dispatch=useDispatch()
 useEffect(()=>{
 dispatch(getAllDriver())
 dispatch(errorActions.Message(' '))
 },[fetched])
 const gqlHub=gql`
 {
  getAllWarehouse {
    _id
    warehouseID
    exactLocation
  }
}`
const {loading,error,data,refetch}=useQuery(gqlHub)
const changeRow = (oldRow, e) => {
  console.log(oldRow.isActive)
  dispatch(updateStatus(oldRow._id,{status:!oldRow.isActive}))
};
  const[lookups,setLookups]=useState({})
  useEffect(()=>{
    refetch()
    if(data)
    {
      const looks = data.getAllWarehouse?.reduce(function(acc, cur, i) {
        acc[cur._id] = cur.exactLocation;
        return acc;
        }, {});
        setLookups(looks)
  }
  },[data])
   
  return (
    <React.Fragment>
      <AddUser Driver={true}/>
    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Shipment</Card.Title>
                    <Row style={{float:'right'}}>
                            <CustomeButton onClick={()=>dispatch(modalActions.setForm(true))} new>Add New Driver <AiFillCar size={20}/></CustomeButton>
                            </Row>
                </Card.Header>
                <Card.Body>
                <MaterialTable
                style={{zIndex:0}}
                 components={{
                  Container: props => <div {...props} elevation={0}/>
             }}
      responsive
      title="Driver"
      columns={[
        {title: "id", field: "id", hidden: true},
        { title: 'Full Name', field: 'fullName' },
        { title: 'Email', field: 'username'},
        { title: 'Phone Number', field: 'mobile',},
        {title: 'Hub',field: 'hubID',lookup: lookups},
        { title: 'Shift', field: 'shift' },
        { title: 'Priority', field: 'priority'},
        {
          title: "Status",
          field: "status",
          render: (data, id) => (
            <FormControlLabel
              control={
                <Switch
                  checked={data?.isActive?data?.isActive:false}
                  onChange={e => changeRow(data, e)}
                  name="status"
                  color="primary"
                />
              }
              label={data.isActive? "Available" : "Not Available"}
            />
          )
        },
      ]}
      data={datas}
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
            dispatch(updateUser(oldData._id,newData))
              resolve();
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





