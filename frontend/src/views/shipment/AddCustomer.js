import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import {BsFillPersonLinesFill,BsFillTelephoneFill} from "react-icons/bs"
import {MdLocationPin,MdPersonAddAlt1,MdAppBlocking} from "react-icons/md"
import { useSelector,useDispatch  } from 'react-redux';
import { loadingActions } from '../../store/loading-slice';
import { errorActions } from '../../store/error-slice';
import toast, { Toaster } from 'react-hot-toast';
import { modalActions } from '../../store/modal-slice';
import { StyledAiFillCloseCircle } from '../../components/styled/main.styled';
import Modal from "react-modal";
import { addCustomer } from '../../store/customerHttp';
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
const FormsCustomer = ({Driver}) => {
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
    const profile=useSelector(state=>state.userinfo)
    const isModalOpen=useSelector(state=>state.modal.isFormOpen)
    const notify = () => toast.success('Customer Successfully Added.', {
        duration: 4000,
      });
    const loadingStatus=useSelector(state=>state.loading.status)
    const message=useSelector(state=>state.message.errMessage)
    const dispatch=useDispatch()
   const [warehouseID,setWareID]= useState()
   const firstNameref=useRef()
   const lastNameref=useRef()
   const contactPersonref=useRef()
   const phoneref=useRef()
   const contactPersonPhoneref=useRef()
   const pickupLocationref=useRef()

   useEffect(()=>{
   message==='added'&&notify()
//    dispatch(errorActions.Message(''))
   },[message])
   
const AddCustomerHandler=(event)=>{
    event.preventDefault()
    let fullName=firstNameref.current.value+' '+lastNameref.current.value
    let phoneNumber=phoneref.current.value
    let contactPerson=contactPersonref?.current?.value
    let contactPersonPhone=contactPersonPhoneref.current.value
    let locationAddress=pickupLocationref.current.value
if(fullName.trim()&&phoneNumber.trim()&&contactPerson.trim()&&contactPersonPhone.trim()&&locationAddress)
{
        const user={fullName,phoneNumber,contactPerson,contactPersonPhone,locationAddress,warehouseID}
        dispatch(loadingActions.status('pending'))
        dispatch(addCustomer(user))
        firstNameref=''
        phoneref=''
        contactPersonref=''
        contactPersonPhoneref=''
        locationAddress=''
    
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

    return (
        <React.Fragment>
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
                            <Card.Title as="h5">Manage User</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setForm(false))}} style={{float:'right'}} fontSize={30} color='red'/>

                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                           <h3>Add New Customer</h3>
                        {message!=='added' && (
                            <Row>
                            <Col sm={12} style={{alignText:'center',justifyContent:'center'}}>
                            <small style={{alignText:'center'}} className="text-danger form-text">{message}</small>
                            </Col>
                            </Row>
                        )} 
                    
                        <Row xl={4} sm={2} lg={3} md={3}  style={{justifyContent:'start'}}>
                         <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <TextField
                                            type='text' 
                                            variant='outlined'
                                            label="First Name"
                                            inputRef={firstNameref}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsFillPersonLinesFill color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <TextField
                                            type='text' 
                                            variant='outlined'
                                            label="Last Name"
                                            inputRef={lastNameref}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsFillPersonLinesFill color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>
                                        
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <TextField
                                            type='text' 
                                            variant='outlined'
                                            label="Phone Number"
                                            inputRef={phoneref}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsFillTelephoneFill color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                   <TextField    
                                    variant='outlined'
                                    label="Pickup Location"
                                    inputRef={pickupLocationref}
                                    fullWidth
                                    required
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <MdLocationPin color='rgb(26 17 17 / 56%)' size={20} />
                                          </InputAdornment>
                                        ),
                                      }}
                                    >
                                    </TextField><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'100px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>                                
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            variant='outlined'
                                            label="Contact Person"
                                            inputRef={contactPersonref}
                                            required
                                            fullWidth
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <MdPersonAddAlt1 color='rgb(26 17 17 / 56%)' size={20} />
                                                </InputAdornment>
                                              ),
                                            }}
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'100px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='text' 
                                            inputRef={contactPersonPhoneref}
                                            variant='outlined'
                                            label="Cont.Person Phone"
                                            fullWidth
                                            required
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <MdAppBlocking color='rgb(26 17 17 / 56%)' size={20} />
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
                                        {profile.role==='1111'&& <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
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
                                   </Row>
                           
                             <Col style={{marginBottom:'50px',marginTop:'20px'}}>
                            <Buttons  
                                onClick={AddCustomerHandler}
                                type="submit"
                                variant="contained"
                                color="primary">
                                {loadingStatus!=='pending'?"Add Customer" :<CircularProgress color='secondary'/>}
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

export default FormsCustomer;
