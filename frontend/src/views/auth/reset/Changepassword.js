import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import FormControls from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import PersonIcon from '@material-ui/icons/Person';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import { useDispatch,useSelector } from 'react-redux';
import { changePassword } from '../../../store/userHttp';
import { errorActions } from '../../../store/error-slice';
import { loadingActions } from '../../../store/loading-slice';
import toast, { Toaster } from 'react-hot-toast';

const FormsElements = () => {
    const notify = () => toast.success('Password Changed Successfully', {
        duration: 4000,
      });
const oldPasswordref=useRef() 
const newPasswordref=useRef()
const confirmPasswordref=useRef()
const message=useSelector(state=>state.message.errMessage)
const loadingStatus=useSelector(state=>state.loading.status)
console.log(loadingStatus)
const dispatch=useDispatch()
useEffect(()=>{
    message==='added'&&notify()
    // dispatch(errorActions.Message(''))
    },[message])

const ChangeHandler=()=>{
   
  
    dispatch(loadingActions.status('pending'))
    const oldPassword=oldPasswordref.current.value
    const newPassword=newPasswordref.current.value
    const confirmPassword=confirmPasswordref.current.value
    console.log(oldPassword,newPassword,confirmPassword)
if(oldPassword&&newPassword&&confirmPassword)
{
    if(confirmPassword===newPassword)
    {
        dispatch(changePassword({oldPassword,newPassword,confirmPassword}))
            oldPasswordref.current.value=''
            newPasswordref.current.value=''
            confirmPasswordref.current.value='' 
    }
    else{
        dispatch(errorActions.Message('Password not match'))
        dispatch(loadingActions.status('error'))
    }}
else{
    dispatch(errorActions.Message('Please fill all field'))
    dispatch(loadingActions.status('error'))
}}

    return (
        <React.Fragment>
            <Toaster />
            <Row>
                <Col xl={10} sm={12} lg={10} md={10}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Change Password</Card.Title>
                        </Card.Header>
                        <Card.Body>
                        {message!=='added' && (
                        <Row style={{marginLeft:'40%',marginBottom:'30px'}}>
                        <Col sm={12} style={{alignText:'center',justifyContent:'center'}}>
                        <small style={{alignText:'center'}} className="text-danger form-text">{message}</small>
                        </Col>
                        </Row>)} 
                            <Row>
                                <Col md={6} style={{margin:'auto'}}>
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicEmail">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="Old Password"
                                            inputRef={oldPasswordref}
                                            fullWidth
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}><PersonIcon/></div>
                                        </Form.Group>
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="New Password"
                                            required
                                            inputRef={newPasswordref}
                                            fullWidth
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'100px',
                                            color:'#038FCF'}}><EnhancedEncryptionIcon/></div>
                                        </Form.Group>
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="Confirm password"
                                            fullWidth
                                            inputRef={confirmPasswordref}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}><EnhancedEncryptionIcon/></div>
                                        </Form.Group> 
                                           
                                        <Buttons
                            type="submit"
                            onClick={ChangeHandler}
                            fullWidth
                            variant="contained"
                            color="primary">
                           {loadingStatus!=='pending'?"Submit" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                                </Col>
                            
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default FormsElements;
