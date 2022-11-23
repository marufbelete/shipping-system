import React,{useRef} from 'react';
import { Row, Col, Card, Container} from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { modalActions } from '../../store/modal-slice';
import Modal from "react-modal";
import { DetailItem, DetailText, StyledAiFillCloseCircle } from '../../components/styled/main.styled';
import {useQuery,gql} from '@apollo/client'

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
const UserDetail = ({userID}) => {
  // we can name query when we pass value
  const userDetail=gql`
  query($ID:Int!){
    getUser(_id:$ID) {
      username
      fullName
      userType
      mobile

    }
  }
  `
  const {loading,error,data}=useQuery(userDetail,{
    variables: { ID: userID},
  })
    function toggleModal() {
        console.log("close")
        dispatch(modalActions.setModal(false))
      }    
    const dispatch=useDispatch()
    const isModalOpen=useSelector(state=>state.modal.isModalOpen)
    data&&console.log(data)
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
                     <Card.Title as="h5">Shipment Detail</Card.Title>
                     <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                 </Card.Header>
                 <Card.Body style={{minHeight:'390px'}}>
                 <Container>
                     <Row >
                   <DetailItem>
                   <Row><DetailText>Full Name:</DetailText></Row>
                 
                    <DetailText>{data&&data.getUser.fullName}</DetailText>
                    <hr/>
                   </DetailItem>
                   <DetailItem>
                   <Row><DetailText>User Name:</DetailText></Row>
                 
                     <DetailText>{data&&data.getUser?.username}</DetailText>
                     <hr/>
                   </DetailItem>
                   
                   <DetailItem>
                   <Row><DetailText>Phone:</DetailText></Row>
                     <DetailText>{data&&data.getUser?.mobile}</DetailText>
                     <hr/>
                   </DetailItem>
                   </Row>
                   <Row>
                   <DetailItem>
                   <Row><DetailText>User Role</DetailText></Row>
                    <DetailText>{data&&data.getUser?.userType}</DetailText>
                    <hr/>
                   </DetailItem>
                 
                   <DetailItem>
                   <Row><DetailText>Hub ID</DetailText></Row>
                   
                     <DetailText>{data&&data.getUser?.hub?.hubID}</DetailText>
                     <hr/>
                   </DetailItem>
                   <DetailItem>
                   <Row><DetailText>Hub Address</DetailText></Row>
                  
                     <DetailText>{data&&data.getUser?.hub?.hubAddress}</DetailText>
                     <hr/>
                   </DetailItem>
                   </Row>
                   <Row>
                   <DetailItem>
                   <Row><DetailText>Hub Name:</DetailText></Row>
                  
                    <DetailText>{data&&data.getUser?.hub?.hubName}</DetailText>
                    <hr/>
                   </DetailItem>
                   </Row>
                   </Container>
                 </Card.Body>
             </Card>

         </Col>
     </Row>
     </Modal>
 </React.Fragment>
);
};

export default UserDetail;



   