import React,{useEffect, useRef} from 'react';
import { Card, Row, Col,Button, Alert  } from 'react-bootstrap';
import { NavLink, useHistory,useParams } from 'react-router-dom';
import useScriptRef from '../../../hooks/useScriptRef';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../store/authhttp';
const Reset = () => {
    const passref=useRef()
    const confref=useRef()
    const dispatch=useDispatch()
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const {token}=useParams()
    const message=useSelector(state=>state.message.errMessage)
    const reset=useSelector(state=>state.message.errMessage)
    const ResetHandler=(event)=>{
    event.preventDefault()
    if(passref.current.value&&confref.current.value)
    {
        console.log(token)
        dispatch(resetPassword({token,password:passref.current.value,confirmPassword:confref.current.value}))
        
    }
    }
    useEffect(()=>{
    reset==='reseted'&&history.push('/signin')
    },[reset])
    return (
        <React.Fragment>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <Card className="borderless">
                   

                        <Row className="align-items-center">
                            <Col>
                                <Card.Body className="text-center">
                                    <h4 className="mb-4">Admin Dashboard</h4>

                                    <div className="mb-4">
                                        <i className="feather icon-user-plus auth-icon" />
                                    </div>
                                    {message!=='added'&&<span style={{textAlign:'center',color:'red',fontSize:'11px'}}>{message}</span>} 
                                    <form >
                        <div className="form-group mb-3 mt-3">
                            <input
                                className="form-control"
                                label="New Password"
                                placeholder="New Password"
                                name="newpassword"
                                type="password"
                                ref={passref}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                label="COnfirm Password"
                                placeholder="Confirm password"
                                name="confirmpassword"
                                type="password"
                                ref={confref}
                            />
                        </div>
                        <Row>
                            <Col mt={2}>
                            <Buttons
                            onClick={ResetHandler}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                        {'pendin'!=='pending'?"Reset Password" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                            </Col>
                        </Row>
                    </form>
            <hr />
                                    <br />

                                    <p className="mb-0 text-muted">
                                        &copy;{' '}
                                        <a target="_blank" rel="noreferrer">
                                    Shipping
                                </a>
                                -{' '}
                                <a  rel="noreferrer">
                                    Dashboard
                                </a>
                                        .
                                    </p>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Reset;
