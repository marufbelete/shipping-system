import React,{useRef} from 'react';
import { Row, Col, Card, Table,Button, Container} from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { modalActions } from '../../store/modal-slice';
import { DetailItem, DetailText, StyledAiFillCloseCircle } from '../../components/styled/main.styled';
import Modal from "react-modal";
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
const CustomerDetail = ({customerID}) => {
  const customerDetail=gql`
  query(  $id: Int!){
    getCustomer(_id: $id) {
        fullName
        phoneNumber
        contactPerson
        contactPersonPhone
        locationAddress

      shipment {
        pickupDate
        orgDeliveryDate
        actualReceivedDate
        shipmentStatus
        shipmentID
        locationAddress
      }
    }
    }
  `
  const {loading,error,data}=useQuery(customerDetail,{
    variables: { id:customerID},
  })
  data&&console.log(data)
    function toggleModal() {
        console.log("close")
        dispatch(modalActions.setModal(false))
      }    
    const dispatch=useDispatch()
    const isModalOpen=useSelector(state=>state.modal.isModalOpen)

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
                            <Card.Title as="h5">Customer Detail</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{minHeight:'390px'}}>
                        <Container>
                            <Row >
                          <DetailItem>
                          <Row><DetailText>customerName:</DetailText></Row>
                        
                            <DetailText>{data&&data.getCustomer?.fullName}</DetailText>
                            <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>Customer Address:</DetailText></Row>
                          <DetailText>{data&&data.getCustomer?.locationAddress}</DetailText>
                            <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>Customer Phone:</DetailText></Row>
                            <DetailText>{data&&data.getCustomer?.phoneNumber}</DetailText>
                            <hr/>
                          </DetailItem>
                          </Row>
                          <Row>
                          <DetailItem>
                          <Row><DetailText>contactPerson:</DetailText></Row>
                        
                           <DetailText>{data&&data.getCustomer?.contactPerson}</DetailText>
                           <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>contactPerson Phone:</DetailText></Row>
                        
                            <DetailText>{data&&data.getCustomer?.contactPersonPhone}</DetailText>
                            <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>Total Shipment Of Customer:</DetailText></Row>
                            <DetailText>{data&&data.getCustomer?.shipment?.length}</DetailText>
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

export default CustomerDetail;



   