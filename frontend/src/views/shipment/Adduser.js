import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadingActions } from '../../store/loading-slice';
import { errorActions } from '../../store/error-slice';
import { addUser } from '../../store/authhttp';
import toast, { Toaster } from 'react-hot-toast';
import { modalActions } from '../../store/modal-slice';
import {BsFillPersonFill,BsFillPersonPlusFill,BsFillPhoneVibrateFill,BsFillLockFill,BsArrowDownUp,BsBoxArrowRight} from "react-icons/bs"
import {MdPersonPin} from "react-icons/md"
import { StyledAiFillCloseCircle } from '../../components/styled/main.styled';
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
const FormsElements = ({Driver}) => {
    const gqlHub=gql`
 {
    getAllWarehouse {
        _id
        warehouseID
        exactLocation
      }
}`
const {loading,error,data,refetch}=useQuery(gqlHub)
    const isModalOpen=useSelector(state=>state.modal.isFormOpen)
    const notify = () => toast.success('User Successfully Added.', {
        duration: 4000,
      });
    const loadingStatus=useSelector(state=>state.loading.status)
    const message=useSelector(state=>state.message.errMessage)
    const dispatch=useDispatch()
   const [value,setValue]= useState()
   const [valu,setValu]= useState()
   const usernameref=useRef()
   const firstNameref=useRef()
   const lastNameref=useRef()
   const passwordref=useRef()
   const phoneref=useRef()
   const priorityref=useRef()
   const shiftref=useRef()
   const confirmpasswordref=useRef()
   const roleref=useRef()
   const hubref=useRef()
   const profile=useSelector(state=>state.userinfo)

   useEffect(()=>{
    Driver&&setValue('3333')
    console.log(Driver)
})
   useEffect(()=>{
   message==='added'&&notify()
//    dispatch(errorActions.Message(''))
   },[message])
   
const AdduserHandler=(event)=>{
    event.preventDefault()
    const username=usernameref.current.value
    const fullName=firstNameref.current.value+' '+lastNameref.current.value
    const mobile=phoneref.current.value
    const priority=priorityref?.current?.value
    const shift=shiftref?.current?.value
    const password=passwordref.current.value
    const confirmPassword=confirmpasswordref.current.value
    const hub=valu
    const userType=value
if(username?.trim()&&password?.trim()&&confirmPassword?.trim()&&userType)
{
    if(password.trim()===confirmPassword.trim())
    {
        const user=!Driver?{username,password,confirmPassword,userType,hub,fullName,mobile}:
        {username,password,confirmPassword,userType,hub,fullName,mobile,priority,shift}
        dispatch(loadingActions.status('pending'))
        dispatch(addUser(user))
        usernameref=''
        firstNameref=''
        phoneref=''
        priorityref=''
        shiftref=''
        passwordref=''
        confirmpasswordref=''
        roleref=''
        roleref=''
    }
    else{
        dispatch(errorActions.Message('password must match'))
    }
}
else{
    dispatch(errorActions.Message('please fill all field'))
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
                            {Driver?<h3>Add New Driver</h3>:<h3>Add New User</h3>}
                        {message!=='added'&&message!=='connection error please try again' && (
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
                                                    <BsFillPersonFill color='rgb(26 17 17 / 56%)' size={20} />
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
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsFillPersonPlusFill color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
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
                                            label="User name"
                                            inputRef={usernameref}
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <MdPersonPin color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
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
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsFillPhoneVibrateFill color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                <TextField
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    select // tell TextField to render select
                                    label="Role type"
                                    inputRef={roleref}
                                    variant='outlined'
                                    fullWidth
                                    required
                                    inputProps={{
                                        readOnly:Driver?true:false,
                                    }}
                                    >
                                    <MenuItem key={111} value="1111">
                                    Admin
                                    </MenuItem>
                                    <MenuItem key={222} value="2222">
                                    Supervisor
                                    </MenuItem>
                                    <MenuItem key={333} value="3333">
                                    Driver
                                    </MenuItem>
                                    </TextField><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>
                                       {(Driver||value==='3333')&& <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <TextField
                                            type='text' 
                                            variant='outlined'
                                            label="Shift"
                                            inputRef={shiftref}
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsArrowDownUp color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>}
                                       {(Driver||value==='3333') &&<Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <TextField
                                            type='text' 
                                            variant='outlined'
                                            label="Priority"
                                            inputRef={priorityref}
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsBoxArrowRight color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>}
                                        <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="Password"
                                            inputRef={passwordref}
                                            required
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsFillLockFill color='rgb(26 17 17 / 56%)' size={20} />
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
                                            type='password' 
                                            inputRef={confirmpasswordref}
                                            variant='outlined'
                                            label="Confirm password"
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <BsFillLockFill color='rgb(26 17 17 / 56%)' size={20} />
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
                                
                                        {profile.role==='1111'&&value!=='1111'&&<Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicPassword">
                                        <TextField
                                    value={valu}
                                    onChange={(e) => setValu(e.target.value)}
                                    select // tell TextField to render select
                                    label="Hub id"
                                    variant='outlined'
                                    fullWidth
                                    required
                                    >
                                    {data&&data.getAllWarehouse.map(e=><MenuItem key={e._id} value={e._id}>
                                   {`${e.warehouseID}(${e.exactLocation})`}
                                    </MenuItem>)} 
                                    </TextField><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'100px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group> }
                                        
                                            
                           </Row>
                           
                           <Col>
                                        <Buttons  
                                onClick={AdduserHandler}
                                type="submit"
                                variant="contained"
                                color="primary">
                                {loadingStatus!=='pending'?"Add user" :<CircularProgress color='secondary'/>}
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

export default FormsElements;
