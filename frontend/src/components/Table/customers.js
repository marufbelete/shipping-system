import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable from "material-table";
import { getAllCustomer,updateCustomer,deleteCustomer} from '../../store/customerHttp';
import {tableIcons} from './Tableicon'
import {CustomeButton} from '../styled/main.styled'
import { useSelector,useDispatch } from 'react-redux';
import CustomerDetail from '../../views/shipment/customerDetail';
import { modalActions } from '../../store/modal-slice';
import  AddCustomer  from '../../views/shipment/AddCustomer';
import {BsFillPersonPlusFill} from 'react-icons/bs'
import { gql,useQuery } from '@apollo/client';

export default function Customer() {
  const AllShipment=gql`
  query{
    getAllWarehouseID {
      _id
      warehouseID
    }
    }
  `
  const {loading,error,data,refetch}=useQuery(AllShipment)
  const tabledata=useSelector(state=>state.users.tableData)
  const datas=tabledata.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.users.updated)
  const dispatch=useDispatch()
  const [customerID,setCustomerID]=useState('')
  useEffect(()=>{
  dispatch(getAllCustomer())
 
  },[fetched])
  const[lookups,setLookups]=useState({})
  useEffect(()=>{
    refetch()
    if(data)
    {
      const looks = data.getAllWarehouseID?.reduce(function(acc, cur, i) {
        acc[cur._id] = cur.warehouseID;
        return acc;
        }, {});
      setLookups(looks)
  }
  },[data,fetched])
  return (
    <React.Fragment>
      <AddCustomer/>
               
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Customer</Card.Title>
                            <Row style={{float:'right'}}>
                            <CustomeButton onClick={()=>dispatch(modalActions.setForm(true))} new>Add New Customer <BsFillPersonPlusFill size={20}/></CustomeButton>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        <CustomerDetail style={{postion:'relatice',zIndex:'1.2'}} customerID={customerID}/>
                        <MaterialTable
                        style={{zIndex:0}}
                         components={{
                          Container: props => <div {...props} elevation={0}/>
                     }}
                         responsive
      title="All Customers"
      columns={[
        {title: "id", field: "_id", hidden: true},
        { title: 'Customer Id', field: 'customerID',editable:'never' },
        { title: 'Full Name', field: 'fullName'},
        { title: 'Warehouse ID',field: 'hubID',lookup:lookups,editable:'onAdd'},
        { title: 'Customer Phone Number', field: 'phoneNumber'},
        { title: 'Contact Person', field: 'contactPerson'},
        { title: 'Contact Person Phone', field: 'contactPersonPhone'},
        { title: 'Pickup Location', field: 'locationAddress'},
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
      localization={{
        body: {
          addTooltip: 'Add new customer',
          editTooltip: 'Edit customer info',
          deleteTooltip: 'Delete customer',

       }
}}

actions={[
  {
    icon:() => <CustomeButton style={{zIndex:'0'}}>Detail</CustomeButton>,
    tooltip: 'customer detail',
    position:'row',
    onClick: (evt, Data) => {
      const data= JSON.parse(JSON.stringify(Data));
      dispatch(modalActions.setData(data))
      dispatch(modalActions.setModal(true))
      setCustomerID(Data._id)
      console.log(Data._id)
    }
  }
]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(async(resolve, reject) => {
              await dispatch(updateCustomer(oldData._id,newData,resolve))
              resolve();
          }),
        // onRowDelete: oldData =>
        //   new Promise(async(resolve, reject) => {
        //       await dispatch(deleteCustomer(oldData._id,resolve))
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





