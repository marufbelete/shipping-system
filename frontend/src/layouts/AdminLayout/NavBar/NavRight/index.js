import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Dropdown, Media } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { loginActions } from '../../../../store/login-slice';
import avatar1 from '../../../../assets/images/user/avatar-1.jpg';
import { errorActions } from '../../../../store/error-slice';
import {BiBell} from 'react-icons/bi'
import {useCookies} from 'react-cookie'
import { Notifications } from '../../../../components/styled/main.styled';
const NavRight = () => {
    const account = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const userinfo=useSelector(state=>state.userinfo)
    const [cookies, setCookie,removeCookie] = useCookies();

const history=useHistory()
    const [listOpen, setListOpen] = useState(false);
    const HandleProfile = () => {
        history.push('/profile')
    };
    const handleLogout = () => {
        dispatch(loginActions.isLoged(false))
        dispatch(errorActions.Message(''))
        removeCookie("access_token")
        removeCookie("token")
        history.push('/signin')
    };

    return (
        <React.Fragment>
            <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
                <ListGroup.Item as="li" bsPrefix=" ">
                   </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Dropdown>
                        <Dropdown.Toggle as={Link} variant="link" to="#" className="displayChatbox">
                            <BiBell size={18}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head">
                                <span>
                                    Incoming Notification
                                </span>
                               
                            </div>
                            <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                                <ListGroup.Item as="li" bsPrefix=" ">
                                    <Notifications>Today 20 New Customer Added
                                    </Notifications>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" bsPrefix=" ">
                                <Notifications>Todays Total Shipment is 212
                                    </Notifications>
                                </ListGroup.Item>
                            
                                <ListGroup.Item as="li" bsPrefix=" ">
                                <Notifications>Push Notification Three
                                    </Notifications>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" bsPrefix=" ">
                                <Notifications>Push Notification Four
                                    </Notifications>
                                </ListGroup.Item>
                            </ListGroup>
                        </Dropdown.Menu>
                    </Dropdown>
                 </ListGroup.Item>
                 <ListGroup.Item as="li" bsPrefix=" ">
                    <Dropdown className="drp-user">
                        <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                            <i className="icon feather icon-settings" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head">
                                <img src={avatar1} className="img-radius" alt="User Profile" />
                                <span>
                                    {userinfo.username}
                                </span>
                                <Link to="#" className="dud-logout" onClick={handleLogout} title="Logout">
                                    <i className="feather icon-log-out" />
                                </Link>
                            </div>
                            <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                                <ListGroup.Item as="li" bsPrefix=" ">
                                    <Link to="/changepassword" className="dropdown-item">
                                        <i className="feather icon-settings" /> Manage Password
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" onClick={HandleProfile} bsPrefix=" ">
                                    <Link to="#" className="dropdown-item">
                                        <i className="feather icon-user" /> Profile
                                    </Link>
                                </ListGroup.Item>
                            
                                <ListGroup.Item as="li" bsPrefix=" ">
                                    <Link to="#" className="dropdown-item" onClick={handleLogout}>
                                        <i className="feather icon-log-out" /> Logout
                                    </Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListGroup.Item>
            </ListGroup>
        </React.Fragment>
    );
};

export default NavRight;
