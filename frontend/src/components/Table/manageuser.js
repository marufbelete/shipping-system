import React,{useState,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon'
import { useHistory } from 'react-router-dom';
import {CustomeButton} from '../styled/main.styled'
import AddUser from '../../views/shipment/Adduser'
import { modalActions } from '../../store/modal-slice';
import { useSelector,useDispatch } from 'react-redux';
import UserDetail from '../../views/shipment/Userdetail';
import { getAllUser, updateUser,deleteUser } from '../../store/userHttp';
import { gql,useQuery } from '@apollo/client';
import { errorActions } from '../../store/error-slice';
import {BsFillPersonPlusFill} from 'react-icons/bs'
export default function ManageUser() {
  const gqlHub=gql`
  {
    getAllWarehouse {
      _id
      warehouseID
      exactLocation
    }
}`
const {loading,error,data,refetch}=useQuery(gqlHub)
 data&&console.log(data)
  const profile=useSelector(state=>state.userinfo)
  const tabledata=useSelector(state=>state.users.tableData)
  const datas=tabledata.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.users.updated)
  const dispatch=useDispatch()
  const [userID,setUserID]=useState('')
  useEffect(()=>{
  dispatch(getAllUser())
  dispatch(errorActions.Message(' '))
  },[fetched])
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
      <AddUser Driver={false}/>
      <UserDetail userID={userID}/>
    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Setting</Card.Title>
                  {profile.role==='1111'&&<Row style={{float:'right'}}>
                            <CustomeButton onClick={()=>dispatch(modalActions.setForm(true))} new>Add New User <BsFillPersonPlusFill size={20}/></CustomeButton>
                            </Row>}  
                </Card.Header>
                <Card.Body>
                <MaterialTable
                style={{zIndex:0}}
                 responsive
                 components={{
                  Container: props => <div {...props} elevation={0}/>
             }}
      title="Manage User"
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'Full Name', field: 'fullName' },
        { title: 'Email Address',editable:'never', field: 'username' },
        { title: 'Role', field: 'userType',lookup:profile.role==='1111'?{ 1111: 'Admin',2222:'Supervisor', 3333: 'Driver'}:{3333: 'Driver'}},
        {title: 'Hub',field: 'hubID',lookup:lookups},
        { title: 'Phone', field: 'mobile' },
      ]}
      data={datas}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton:true,
        columnsButton:true,
        filtering: true,
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
      localization={{
        body: {
          addTooltip: 'Add new user',
          editTooltip: 'Edit user',
          deleteTooltip: 'Delete user',
       }
}}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              console.log(newData)
              dispatch(updateUser(oldData._id,newData))
              resolve();
          }),
        // onRowDelete: oldData =>
        //   new Promise((resolve, reject) => {
        //       dispatch(deleteUser(oldData._id))
        //       resolve()
        //   }),
      }}
    />
    </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}





