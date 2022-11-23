import React,{useRef} from 'react';
import { Row, Col, Card, Table,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { modalActions } from '../../store/modal-slice';
import { StyledAiFillCloseCircle } from '../styled/main.styled';
import { AiFillCheckCircle,AiFillCloseCircle } from "react-icons/ai"; 
import Modal from "react-modal";
import { collectCOD } from '../../store/hubHttp';
const customStyles = {
    content: {
      top: '56%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'40%'
    },
  };
Modal.setAppElement("#root");
const CODModal = ({data}) => {
  data&&console.log(data)
  const dispatch=useDispatch()
    function toggleModal() {
        dispatch(modalActions.setCODModal(false))
      }    
    const isModalOpen=useSelector(state=>state.modal.isCODModalOpen)
  const CollectHandler=(transaction)=>{
    dispatch(collectCOD(transaction))
    dispatch(modalActions.setCODModal(false))
  }
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
                            <Card.Title as="h5">COD Balance Collection</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setCODModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{minHeight:''}}>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                            <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver Phone: {data?.mobile}</span></Col>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver Name: {data?.name}</span></Col>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Amounte To Collect: {data?.balance}</span></Col>
                          <Row style={{justifyContent:'center', padding:'0px',margin:'0px'}}>
                          <Button onClick={()=>CollectHandler(data)} style={{width:'130px',height:'40px', marginRight:'30px'}}>Confirm <AiFillCheckCircle fontSize={24}/></Button>
                          <Button onClick={()=>{dispatch(modalActions.setCODModal(false))}} style={{width:'130px', padding:'0px'}}>Cancel <AiFillCloseCircle  fontSize={24}/></Button>
                          </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Modal>
        </React.Fragment>
    );
};

export default CODModal;



   