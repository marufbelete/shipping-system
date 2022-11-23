import React,{useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import MaterialTable,{ MTableAction} from "material-table";
import {tableIcons} from './Tableicon'
import {CustomeButton} from '../styled/main.styled'
import { getLocation,updateLocation,addLocation,deleteLocation} from '../../store/locationHttp';
import { useSelector,useDispatch } from 'react-redux';
import CustomerDetail from '../../views/shipment/customerDetail';
import LocationModal from '../../views/shipment/Locationimport'
import {FaMapMarkedAlt} from 'react-icons/fa'
export default function Location() {
  const addActionRef = React.useRef();
  const tabledata=useSelector(state=>state.users.tableData)
  const data=tabledata.map(o => ({ ...o }));
  const fetched=useSelector(state=>state.users.updated)
  const dispatch=useDispatch()
  const [customerID,setCustomerID]=useState('')
  useEffect(()=>{
dispatch(getLocation())

  },[fetched])
  const [columns, setColumns] = useState([
    {title: "id", field: "_id", hidden: true},
    { title: 'Country', field: 'country' },
    { title: 'City', field: 'city'},
    { title: 'Special Name', field: 'specialName'},
  ]);

  return (
    <React.Fragment>
      <LocationModal/>
       <CustomerDetail customerID={customerID}/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Location And Hub</Card.Title>
                            <Row style={{float:'right'}}>
                            <CustomeButton onClick={() => addActionRef.current.click()} new>Add New Location <FaMapMarkedAlt size={20}/></CustomeButton>
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
      title="Location List"
      columns={columns}
      data={data}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton:true,
        exportDelimiter:true,
        columnsButton:true,
        addRowPosition:'last',
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
            dispatch(addLocation(newData,resolve))
            resolve();
        }),
        
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              dispatch(updateLocation(oldData._id,newData,resolve))
              resolve();
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              dispatch(deleteLocation(oldData._id,resolve))
              resolve()
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





