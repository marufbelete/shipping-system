import React,{useRef} from 'react';
import { Row, Col, Card, Table,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { modalActions } from '../../store/modal-slice';
import { StyledAiFillCloseCircle } from '../../components/styled/main.styled';
import Modal from "react-modal";
const customStyles = {
    content: {
      top: '54%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'70%'
    },
  };
Modal.setAppElement("#root");
const TicketDetail = () => {
    function toggleModal() {
        console.log("close")
        dispatch(modalActions.setModal(false))
      }    
    const dispatch=useDispatch()
    const isModalOpen=useSelector(state=>state.modal.isModalOpen)
    console.log(isModalOpen)
    const detail=[{},{},{}]
    const fileref=useRef()
    return (
        <React.Fragment>
             <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}>
            <Row style={{margin:'0px',padding:'0px'}} >
                <Col style={{margin:'0px',padding:'0px',width:'100%'}} xl={12}>
                    <Card  style={{margin:'auto',padding:'0px'}}>
                        <Card.Header >
                            <Card.Title as="h5">Ticket Detail</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{minHeight:'390px'}}>
                            <Row >
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                            <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver ID: 12612</span></Col>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver COD Balance:12656</span></Col>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Register Date:3-23-2022</span></Col>
                          </Row>
                          <Row style={{marginBottom:'20px'}}>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Date:3-27-2022</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver Phone</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Other Field1</span></Col>
                          </Row>
                          <Row style={{marginBottom:'20px'}}>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Deliverd Date:3-27-2022</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver Phone</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Other Field1</span></Col>
                          </Row>
                          <Row style={{marginBottom:'20px'}}>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Deliverd Date:3-27-2022</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver Phone</span></Col>
                          <Col style={{marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Other Field1</span></Col>
                          </Row>
                          <Row style={{justifyContent:'center'}} >
                          <Button style={{marginTop:'40px'}} onClick={()=>{dispatch(modalActions.setModal(false))}}>Close</Button>
                          </Row>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            </Modal>
        </React.Fragment>
    );
};

export default TicketDetail;



   