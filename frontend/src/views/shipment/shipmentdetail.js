import React,{useRef} from 'react';
import { Row, Col, Card, Table,Button, Container} from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { modalActions } from '../../store/modal-slice';
import { DetailItem, DetailText, StyledAiFillCloseCircle } from '../../components/styled/main.styled';
import {BsCurrencyDollar,BsCurrencyEuro,BsCurrencyYen,BsCurrencyPound,BsCashCoin,BsBack} from "react-icons/bs";
import {TbCurrencyRiyal} from 'react-icons/tb'
import Modal from "react-modal";
import {useQuery,gql} from '@apollo/client'

const customStyles = {
    content: {
      top: '54%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      positino:'relative',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'70%'
    },
  };
Modal.setAppElement("#root");
const ShipmentDetail = ({shipmentID}) => {
  const userDetail=gql`
query(  $id: Int!){
  getShipment(_id: $id) {
    pickupDate
    orgDeliveryDate
    actualReceivedDate
    shipmentStatus
    shipmentID
    locationAddress
    hubID
    currency
    CODAmount
    warehouse {
      status
      warehouseID
    }
    customer {
      fullName
      phoneNumber
      contactPerson
      contactPersonPhone
      locationAddress
    }
  }
  }
  `
  const {loading,error,data}=useQuery(userDetail,{
    variables: { id:parseInt(shipmentID)},
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
                            <Card.Title as="h5">Shipment Detail</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{minHeight:'390px'}}>
                        <Container>
                            <Row >
                          <DetailItem>
                          <Row><DetailText>actualReceivedDate:</DetailText></Row>
                        
                           <DetailText>{data&&data.getShipment?.actualReceivedDate?.split('T')[0]}</DetailText>
                           <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>customerName:</DetailText></Row>
                        
                            <DetailText>{data&&data.getShipment?.customer?.fullName}</DetailText>
                            <hr/>
                          </DetailItem>
                          
                          <DetailItem>
                          <Row><DetailText>customer Phone:</DetailText></Row>
                            <DetailText>{data&&data.getShipment?.customer?.phoneNumber}</DetailText>
                            <hr/>
                          </DetailItem>
                          </Row>
                          <Row >
                          <DetailItem>
                          <Row><DetailText>contactPerson:</DetailText></Row>
                        
                           <DetailText>{data&&data.getShipment?.customer?.contactPerson}</DetailText>
                           <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>contactPerson Phone:</DetailText></Row>
                        
                            <DetailText>{data&&data.getShipment?.customer?.contactPersonPhone}</DetailText>
                            <hr/>
                          </DetailItem>
                          
                          <DetailItem>
                          <Row><DetailText>customer Pickup Locatino:</DetailText></Row>
                            <DetailText>{data&&data.getShipment?.locationAddress}</DetailText>
                            <hr/>
                          </DetailItem>
                          </Row>
                          <Row>
                          <DetailItem>
                          <Row><DetailText>orginalDeliveryDate:</DetailText></Row>
                           <DetailText>{data&&data.getShipment?.orgDeliveryDate?.split('T')[0]}</DetailText>
                           <hr/>
                          </DetailItem>
                        
                          <DetailItem>
                          <Row><DetailText>pickupDate:</DetailText></Row>
                          
                            <DetailText>{data&&data.getShipment?.pickupDate?.split('T')[0]}</DetailText>
                            <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>shipmentID:</DetailText></Row>
                         
                            <DetailText>{data&&data.getShipment?.shipmentID}</DetailText>
                            <hr/>
                          </DetailItem>
                          </Row>
                          <Row>
                          <DetailItem>
                          <Row><DetailText>Available At warehouse:</DetailText></Row>
                         
                           <DetailText>{data&&data.getShipment?.warehouse?.status?'Available':'Not Available'}</DetailText>
                           <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>warehouse ID:</DetailText></Row>
                         
                           <DetailText>{data&&data.getShipment?.warehouse?.warehouseID}</DetailText>
                           <hr/>
                          </DetailItem>
                          <DetailItem>
                          <Row><DetailText>COD Amount:</DetailText></Row>
                          {data&& <DetailText>{(data.getShipment?.currency==5&& <BsCurrencyYen/>)||(data.getShipment?.currency==1&&<TbCurrencyRiyal/>)||(data.getShipment?.currency==2&& <BsCurrencyDollar/>)||(data.getShipment?.currency==3&& <BsCurrencyEuro/>)||(data.getShipment?.currency==4&& <BsCurrencyPound/>)} {data.getShipment?.CODAmount} </DetailText>}
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

export default ShipmentDetail;



   