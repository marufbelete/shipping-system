import React,{useState,useEffect} from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon'
import { gql,useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssignShipment } from '../../store/shipmentHttp';
import {CustomeButton, ProofDoc, Span, Templates} from '../styled/main.styled';
import { KeyboardTimePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import toast, { Toaster } from 'react-hot-toast';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import { adjustCutoffTime,analysisAndAssign } from '../../store/hubHttp';
export default function DispatchAssignment() {
const dispatch=useDispatch()
  const AllShipment=gql`
  query{
    getAllWarehouseID {
      _id
      warehouseID
      exactLocation
    }
    getAllDriver {
      _id
      fullName
      hubID
    }
    getAllShipment {
      _id
      shipmentID
      shipmentStatus
      shipmentSubStatus
      pickupDate
      customerID
      orgDeliveryDate
      actualReceivedDate
      locationAddress
      hubID
      deliveryETA
      warehouse {
        warehouseID
        status
        cutoffTime
        conatactPerson
        contactPhone
      }
    }
    }
  `
  const [datas,setDatas]=useState()
  const {loading,error,data,refetch}=useQuery(AllShipment)
  const [cutoffTime, setCutoffTime] = useState(new Date());
  const [ananlysisHub, setAnanlysisHub] = useState('10');
  const fetched=useSelector(state=>state.shipment.updated)
  const message=useSelector(state=>state.message.errMessage)
  const profile=useSelector(state=>state.userinfo)
  console.log(profile)
  const AdjustTime=()=>{
    console.log(cutoffTime)
    dispatch(adjustCutoffTime({cutoffTime}))
  }
  const notify = () => toast.success('Analysis Done.', {
    duration: 4000,
  });
  useEffect(()=>{
    console.log(message)
    message==='anlysed'&&notify()
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
         setLookups(looks)
      const result=data.getAllShipment?.map(e=>{
        setCutoffTime(e.warehouse?.cutoffTime)
        return{
      _id:e._id,
      shipmentID:e.shipmentID,
      shipmentStatus:e.shipmentStatus,
      pickupDate:e.pickupDate,
      orgDeliveryDate:e.pickupDate,
      actualReceivedDate:e.actualReceivedDate,
      pickupLocation:e.pickupLocation,
      deliveryETA:e.deliveryETA,
      shipmentSubStatus:e.shipmentSubStatus,
      hubID:e.hubID,
      conatactPerson:e.warehouse?.conatactPerson,
      contactPhone:e.warehouse?.contactPhone,
      status:e.warehouse?.status?'Available':'Not Available'
          }
      })
      data&&setDatas(result)
  }
  },[data,fetched])
  const [Drivers, setDrivers] = React.useState({driver: []});
  const handleFieldChange = event => {
    console.log(event);
    setDrivers(formState => ({
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    }));
  };
  console.log(Drivers)
  const Analysis=()=>{
    if(profile.role==='1111')
    {
      dispatch(analysisAndAssign({drivers:Drivers.driver,ananlysisHub}))
    }
    else{
      dispatch(analysisAndAssign({drivers:Drivers.driver}))
    }
  }
  return (
    <React.Fragment>
      <Toaster />
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Shipment</Card.Title>
                            <Row style={{float:'right'}}>
                            <Col>
                            <Row style={{marginBottom:"5px",marginRight:"45px"}}>
                            <TextField
                                    select // tell TextField to render select
                                    label="Driver"
                                    name="driver"
                                    required
                                    style={{width:"180px"}}
                                   SelectProps={
                                    {
                                      multiple: true,
                                      value: Drivers.driver,
                                      onChange: handleFieldChange
                                    }
                                   }>
                                    
                                   {(data)&&(ananlysisHub!='10'?data.getAllDriver?.filter(e=>e.hubID==ananlysisHub).map(e=><MenuItem key={e._id} value={e?._id}>
                                   {e?.fullName}</MenuItem>):data.getAllDriver?.map(e=><MenuItem key={e._id} value={e?._id}>{e?.fullName}</MenuItem>))} 
                                    </TextField>
                                    </Row>
                                    <Row>
                            <span>Driver To Exclude From Analysis</span>
                            </Row>
                            </Col>
                            {profile.role!=='1111'&& <Col style={{marginTop:"20px",marginRight:"30px"}}>
                              <Row style={{marginBottom:"5px"}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            autoOk
                                            value={cutoffTime}
                                            style={{width:"140px"}}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => setCutoffTime(date)}
                                            />
                                            </MuiPickersUtilsProvider>
                                            </Row>
                                            <Row>
                            <CustomeButton new onClick={AdjustTime}>Adjust Cutoff Time</CustomeButton>
                            </Row>
                            </Col>}
                            
                            <Col>
                            {profile.role==='1111'&& <Row style={{marginBottom:'5px'}}>
                            <TextField
                                    select // tell TextField to render select
                                    label="Analysis For Hub"
                                    name="driver"
                                    required
                                    style={{width:"180px"}}
                                    onChange={(e)=>setAnanlysisHub(e.target.value)}
                                    value={ananlysisHub}
                                    >
                                      <MenuItem value={'10'}>All</MenuItem>
                                    {data&&data.getAllWarehouseID?.map(e=><MenuItem key={e._id} value={e?._id}>
                                   {`${e?.warehouseID}/${e?.exactLocation}`}
                                    </MenuItem>)} 
                                    </TextField>
                            </Row>}
                            <Row>
                            <CustomeButton new onClick={Analysis}>Analysis And Assigning Shipments</CustomeButton>
                            </Row>
                            </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        <MaterialTable
                         components={{
                          Container: props => <div {...props} elevation={0}/>
                     }}
                         responsive
      title="Dispatch And Shipment"
      columns={[{title: "id", field: "_id", hidden: true},
      { title: 'Recived Date', field: 'actualReceivedDate',type:'date',editable: ( _ ,rowData ) => rowData&&(rowData.shipmentStatus==1111)},
      { title: 'Pickedup Date', field: 'pickupDate',type:'date',editable: ( _ ,rowData ) => rowData&&(rowData.shipmentStatus==1111)},
      { title: 'Warehouse ID', field: 'hubID',lookup:lookups,editable: ( _ ,rowData ) => rowData&&(rowData.shipmentStatus==1111)},
      { title: 'Shipment Status', field: 'shipmentStatus',lookup:{ 2222: 'Delivered', 1111: 'onProgress',3333:'Returned',4444:'Canceled' },editable:'never'},
      { title: 'Shipment Sub Status', field: 'shipmentSubStatus',editable: ( _ ,rowData ) =>rowData&&(rowData.shipmentStatus==1111)},
      { title: 'Available At Warehouse', field: 'status',editable:'never'},
      { title: 'Delivery ETA', field: 'deliveryETA', type: 'time',editable: ( _ ,rowData ) => rowData&&(rowData.shipmentStatus==1111)}]}
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
          editTooltip: 'Edit customer info',
          deleteTooltip: 'Delete customer',
       }
}}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            dispatch(updateAssignShipment(oldData._id,newData,resolve))
          })
      }}
    />
     </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}





