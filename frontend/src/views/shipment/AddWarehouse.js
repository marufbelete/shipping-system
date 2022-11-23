import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker, KeyboardDatePicker,KeyboardTimePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadingActions } from '../../store/loading-slice';
import { errorActions } from '../../store/error-slice';
import toast, { Toaster } from 'react-hot-toast';
import { modalActions } from '../../store/modal-slice';
import { AddWarehouse} from '../../store/hubHttp';
import InputAdornment from '@material-ui/core/InputAdornment';
import { BiBarcode} from "react-icons/bi";
import {BsTelephoneInboundFill,BsTelephonePlusFill} from "react-icons/bs"
import {FaMapMarked,FaCity} from "react-icons/fa"
import {MdLocationPin,MdContactMail}from "react-icons/md"
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
const FormsWarehouse = () => {
    const fileref=useRef()
    const gqlLocation=gql`
        query{
        getAllWarehouseID {
            warehouseID
            exactLocation
          }
     }
   `
   const {loading,error,data,refetch}=useQuery(gqlLocation)
 
    const isModalOpen=useSelector(state=>state.modal.isFormOpen)
    const notify = () => toast.success('Warehouse Successfully Added.', {
        duration: 4000,
      });
      data&&console.log(data)
    const loadingStatus=useSelector(state=>state.loading.status)
    const message=useSelector(state=>state.message.errMessage)
    const dispatch=useDispatch()
   const warehouseIDref=useRef()
   const countryref=useRef()
   const cityref=useRef()
   const locationref=useRef()
   const contactpersonref=useRef()
   const contactphoneref=useRef()
   const alternativecontactref=useRef()
   useEffect(()=>{
   message==='added'&&notify()
   },[message])
   const [cutoffTime, setCutoffTime] = useState(new Date());
   const [cutofTimeType, setCutofTimeType] = useState(new Date());
   const fetched=useSelector(state=>state.shipment.updated)

const AdduserHandler=(event)=>{
    event.preventDefault()
    const country=countryref?.current?.value
    const city=cityref?.current?.value
    const warehouseID=warehouseIDref?.current?.value
    const exactLocation=locationref?.current?.value
    const conatactPerson=contactpersonref?.current?.value
    const contactPhone=contactphoneref?.current?.value
    const alternativeContact=alternativecontactref?.current?.value
if(country&&warehouseID&&city&&exactLocation&&conatactPerson&&contactPhone)
{
    dispatch(loadingActions.status('pending'))
    const Warehouse={warehouseID,country,city,exactLocation,contactPhone,conatactPerson,alternativeContact,cutofTimeType,cutoffTime}
    console.log(Warehouse)
    dispatch(AddWarehouse(Warehouse))
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
                            <Card.Title as="h5">Manage Facility</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setForm(false))}} style={{float:'right'}} fontSize={30} color='red'/>

                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                            <h3>Add Warehouse</h3>
                        {message!=='added' && (
                            <Row>
                            <Col sm={12} style={{alignText:'center',justifyContent:'center'}}>
                            <small style={{alignText:'center'}} className="text-danger form-text">{message}</small>
                            </Col>
                            </Row>
                        )} 
                    
                        <Row xl={4} sm={2} lg={3} md={3}  style={{justifyContent:'start'}}>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={warehouseIDref}
                                            variant='outlined'
                                            label="Warehouse ID"
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BiBarcode color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
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
                                            inputRef={countryref}
                                            variant='outlined'
                                            label="Country"
                                            fullWidth
                                            style={{textTransform:"capitalize"}}
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <FaMapMarked color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
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
                                            inputRef={cityref}
                                            variant='outlined'
                                            label="City"
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <FaCity color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group> 
                                       </Row>
                                       <Row xl={4} sm={2} lg={3} md={3}  style={{justifyContent:'start'}}>
                                       <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={locationref}
                                            variant='outlined'
                                            label="Exact Location"
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <MdLocationPin color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
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
                                            inputRef={contactpersonref}
                                            variant='outlined'
                                            label="Contact Person"
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <MdContactMail color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
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
                                            inputRef={contactphoneref}
                                            variant='outlined'
                                            label="Contact Phone"
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsTelephoneInboundFill color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group> 
                                        
                                       </Row>
                        <Row xl={4} sm={2} lg={3} md={3}  style={{justifyContent:'start'}}>
                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={alternativecontactref}
                                            variant='outlined'
                                            label="Alternative Contact"
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsTelephonePlusFill color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group> 
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                    value={cutofTimeType}
                                    onChange={(e) => setCutofTimeType(e.target.value)}
                                    select // tell TextField to render select
                                    label="Cutoff Type"
                                    variant='outlined'
                                    fullWidth
                                    required
                                    >
                                    <MenuItem key={11} value="111">
                                    Auto
                                    </MenuItem>
                                    <MenuItem key={22} value="222">
                                    Manual
                                    </MenuItem>
                                    </TextField><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>
                                    <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Cutoff Time"
                                            value={cutoffTime}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => setCutoffTime(date)}
                                            />
                                            </MuiPickersUtilsProvider>
                                        </Form.Group> 
                                       </Row>
                 
                           <Col style={{marginBottom:'50px',marginTop:'20px'}}>
                            <Buttons  
                                onClick={AdduserHandler}
                                type="submit"
                                variant="contained"
                                color="primary">
                                {loadingStatus!=='pending'?"Add Warehouse" :<CircularProgress color='secondary'/>}
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

export default FormsWarehouse;
