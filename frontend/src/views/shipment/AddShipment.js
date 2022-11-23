import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form} from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { BiBarcode} from "react-icons/bi";
import { KeyboardTimePicker, KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {FcDocument} from 'react-icons/fc'
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadingActions } from '../../store/loading-slice';
import { errorActions } from '../../store/error-slice';
import toast, { Toaster } from 'react-hot-toast';
import { modalActions } from '../../store/modal-slice';
import { addShipment} from '../../store/shipmentHttp';
import {BsCurrencyDollar,BsCurrencyEuro,BsCurrencyYen,BsCurrencyPound,BsCashCoin,BsBack} from "react-icons/bs";
import {BiCurrentLocation} from "react-icons/bi"
import {GrLocationPin} from "react-icons/gr"
import {TbCurrencyRiyal} from 'react-icons/tb'
import { StyledAiFillCloseCircle,FileInput} from '../../components/styled/main.styled';
import Modal from "react-modal";
import {useQuery,gql} from '@apollo/client'

const customStyles = {
    content: {
      top: '57%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'70%',
      maxHeight:'540px'
    },
  };
Modal.setAppElement("#root");
const FormsShipment = () => {
    let fileref=useRef()
    const gqlLocation=gql`
        query{
        getAllWarehouseID {
            _id
            warehouseID
            exactLocation
          }
     }
   `
   const {loading,error,data,refetch}=useQuery(gqlLocation)
 
    const isModalOpen=useSelector(state=>state.modal.isFormOpen)
    const notify = () => toast.success('Shipment Successfully Added.', {
        duration: 4000,
      });
      data&&console.log(data)
    const loadingStatus=useSelector(state=>state.loading.status)
    const message=useSelector(state=>state.message.errMessage)
    const dispatch=useDispatch()
   const [value,setValue]= useState('1111')
   const [warehouseID,setWareID]= useState()
   const [currency,setCurrency]= useState('1')
   let customerIDref=useRef()
   let shipmentSequenceref=useRef()
   let awbref=useRef()
   let codref=useRef()
   let latituderef=useRef()
   let longtuideref=useRef()
   let pickupLocationref=useRef()


   useEffect(()=>{
   message==='added'&&notify()
   },[message])
   const [selectedPickupDate, handlePickupDateChange] = useState(new Date());
   const [selectedRecieveDate, handleRecieveDateChange] = useState(new Date());
   const [selectedOriginalDate, handleOriginalDateChange] = useState(new Date());
   const [deliveryETA, setdeliveryETA] = useState(new Date());

   const fetched=useSelector(state=>state.shipment.updated)
   const profile=useSelector(state=>state.userinfo)

const AdduserHandler=(event)=>{
    let deliveryTime=deliveryETA
    console.log(deliveryETA)
    console.log(deliveryTime)
    event.preventDefault()
    const AWB=awbref?.current.value
    const CODAmount=codref?.current.value
    const latitude=latituderef?.current.value
    const longtuide=longtuideref?.current.value
    const pickupLocation=pickupLocationref?.current.value
    const actualReceivedDate=selectedRecieveDate
    const customerID=customerIDref?.current?.value
    const shipmentSequence=shipmentSequenceref?.current.value
    const pickupDate=selectedPickupDate
    const orgDeliveryDate=selectedOriginalDate
    const image=fileref.current?.files[0]
if(pickupLocation&&actualReceivedDate&&pickupDate&&orgDeliveryDate,value)
{
    dispatch(loadingActions.status('pending'))
    const shipment=warehouseID?{value,warehouseID,deliveryTime,shipmentSequence,AWB,CODAmount,currency,latitude,longtuide,pickupDate,pickupLocation,orgDeliveryDate,actualReceivedDate,customerID,image}:
    {value,deliveryTime,shipmentSequence,AWB,CODAmount,currency,latitude,longtuide,pickupDate,pickupLocation,orgDeliveryDate,actualReceivedDate,customerID,image}
    dispatch(addShipment(shipment))
    customerIDref=''
    fileref=''
}

else{
    dispatch(errorActions.Message('please fill all field'))
    dispatch(loadingActions.status('done'))

}
    }
function toggleModal() {
    console.log("close")
    dispatch(modalActions.setForm(false))
    }    
    useEffect(()=>{
        refetch()
      },[data,fetched])
    return (
        <React.Fragment>
                <FileInput ref={fileref} type="file"/>
            <Toaster />
            <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}>
            <Row style={{margin:'0px',padding:'0px',alignItems:'center'}}>
                <Col style={{margin:'0px',padding:'0px',width:'100%'}} xl={12} sm={12} lg={12} md={12}>
                    <Card style={{margin:'0px',padding:'0px'}}>
                        <Card.Header>
                            <Card.Title as="h5">Manage Shipment</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setForm(false))}} style={{float:'right'}} fontSize={30} color='red'/>

                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                            <h3>Add New Shipment</h3>
                        {message!=='added' && (
                            <Row>
                            <Col sm={12} style={{alignText:'center',justifyContent:'center'}}>
                            <small style={{alignText:'center'}} className="text-danger form-text">{message}</small>
                            </Col>
                            </Row>
                        )} 
                    
                        <Row xl={4} sm={2} lg={3} md={3}  style={{justifyContent:'start'}}>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Pickeup Date"
                                            format="MM/dd/yyyy"
                                            value={selectedPickupDate}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => handlePickupDateChange(date)}
                                            />
                                            </MuiPickersUtilsProvider>
                                        </Form.Group>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Recieved Date"
                                            format="MM/dd/yyyy"
                                            value={selectedRecieveDate}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => handleRecieveDateChange(date)}
                                            />
                                            </MuiPickersUtilsProvider>
                                            </Form.Group>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={shipmentSequenceref}
                                            variant='outlined'
                                            label="Shipment Sequence"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BiBarcode color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group> 
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Delivery ETA"
                                            value={deliveryETA}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={time =>setdeliveryETA(time)}
                                            />
                                            </MuiPickersUtilsProvider>
                                        </Form.Group>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={customerIDref}
                                            variant='outlined'
                                            label="Customer ID"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BiBarcode color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group> 
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={awbref}
                                            variant='outlined'
                                            label="AWB"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsBack color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>  
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px',position:"relative"}} controlId="formBasicPassword">
                                        <TextField
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    select // tell TextField to render select
                                    variant='outlined'
                                    required
                                    style={{position:"absolute",right:"0px",zIndex:"3"}}
                                    >
                                    <MenuItem key={111} value="1">
                                    <TbCurrencyRiyal/>
                                    </MenuItem>
                                    <MenuItem key={111} value="2">
                                    <BsCurrencyDollar/>
                                    </MenuItem>
                                    <MenuItem key={222} value="3">
                                    <BsCurrencyEuro/>
                                    </MenuItem>
                                    <MenuItem key={333} value="4">
                                    <BsCurrencyPound/>
                                    </MenuItem>
                                    <MenuItem key={333} value="5">
                                    <BsCurrencyYen/>
                                    </MenuItem>
                                    </TextField><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        <TextField
                                            type='text' 
                                            inputRef={codref}
                                            variant='outlined'
                                            label="COD Amount"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsCashCoin color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>                                 
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={latituderef}
                                            variant='outlined'
                                            label="latitude"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <GrLocationPin color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={longtuideref}
                                            variant='outlined'
                                            label="longtuide"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <GrLocationPin color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group> 
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                     <TextField
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    select // tell TextField to render select
                                    label="Status"
                                    variant='outlined'
                                    fullWidth
                                    required
                                    >
                                    <MenuItem key={111} value="1111">
                                    Pending
                                    </MenuItem>
                                    <MenuItem key={222} value="2222">
                                    onProgress
                                    </MenuItem>
                                    <MenuItem key={333} value="3333">
                                    Delivered
                                    </MenuItem>
                                    </TextField><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                             </Form.Group> 
                                             {profile.role==='1111'&&  <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                    value={warehouseID}
                                    onChange={(e)=>setWareID(e.target.value)}
                                    select // tell TextField to render select
                                    label="Warehouse ID"
                                    variant='outlined'
                                    required
                                    style={{width:"190px"}}
                                    >
                                    {data&&data.getAllWarehouseID?.map(e=><MenuItem key={e._id} value={e?._id}>
                                   {`${e?.warehouseID}(${e?.exactLocation})`}
                                    </MenuItem>)} 
                                    </TextField><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'100px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>}
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Org.Recv Date"
                                            format="MM/dd/yyyy"
                                            value={selectedOriginalDate}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => handleOriginalDateChange(date)}
                                            />
                                            </MuiPickersUtilsProvider>
                                        </Form.Group>  
                                                                                     
                           </Row>
                           <Row >
                          
                           <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                           <TextField
                                    label="Pickup Location"
                                    variant='outlined'
                                    fullWidth
                                    inputRef={pickupLocationref}
                                    required
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <BiCurrentLocation color='rgb(26 17 17 / 56%)' size={20} />
                                        </InputAdornment>
                                      ),
                                    }}
                                    style={{width:"190px"}}
                                    >
                                    </TextField><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'100px',
                                            color:'#038FCF'}}></div>
                                      </Form.Group>
                    <Fab
                    onClick={()=>fileref.current.click()}
                    color="secondary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                    style={{
                        left:'20px',
                        top:'16px',
                        padding:'7px',
                        width:'160px',
                        height: '50px',
                        textAlign:'center',
                        lineHeight:'20px',
                        textTransform: "capitalize"
                    }}
                     >
                    <FcDocument size={30} /> Upload Proof Document
                    </Fab>
                    </Row>
                 
                    <Col style={{marginBottom:'50px',marginTop:'20px'}}>
                            <Buttons  
                                onClick={AdduserHandler}
                                type="submit"
                                variant="contained"
                                color="primary">
                                {loadingStatus!=='pending'?"Add Shipment" :<CircularProgress color='secondary'/>}
                           </Buttons> 
                           </Col> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Modal>
        </React.Fragment>
    );
};

export default FormsShipment;
