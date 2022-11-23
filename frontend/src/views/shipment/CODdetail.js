import React,{useEffect, useRef,useState} from 'react';
import { Row, Col, Card, Table,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { modalActions } from '../../store/modal-slice';
import { StyledAiFillCloseCircle } from '../../components/styled/main.styled';
import {BsArrowRightSquareFill} from "react-icons/bs"
import Modal from "react-modal";
import {BsCurrencyDollar,BsCurrencyEuro,BsCurrencyYen,BsCurrencyPound,BsCashCoin,BsBack} from "react-icons/bs";
import {TbCurrencyRiyal} from 'react-icons/tb'
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
      width:'47%'
    },
  };
 
Modal.setAppElement("#root");
const CODDetail = ({driver}) => {
  const gqlLocation=gql`
  query($id:Int!){
    getCODShipment(driverAssigned:$id) {
        CODAmount
        shipmentID
        currency
    }
}
`
const [cur,setCur]=useState()
console.log(driver)
const {loading,error,data,refetch}=useQuery(gqlLocation,{
  variables: { id: parseInt(driver)},
})
useEffect(()=>{
  refetch()
  if(data)
  {
    console.log(data)
    console.log(data?.getCODShipment.shipmentID)
    setCur(data?.getCODShipment.currency)
  }
},[data])
const fetched=useSelector(state=>state.users.updated)
useEffect(()=>{
refetch()
},[fetched])
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
                            <Card.Title as="h5">COD Balance Detail</Card.Title>
               
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(modalActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>

                        </Card.Header>
                        <Card.Body style={{minHeight:'390px'}}>
                          {
                            data&&data?.getCODShipment?.map(c=> <><Row >
                              <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                                <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}> <span style={{fontSize:"16px"}}>Shipment ID:</span> <span style={{fontSize:"15px"}}>{c.shipmentID}</span></span></Col>
                                <Col style={{marginBottom:'20px', marginLeft:'10px'}}> <BsArrowRightSquareFill/> <span style={{fontSize:"16px"}}>COD Amount: </span><span style={{fontSize:"15px"}}>{c.currency==5&& <BsCurrencyYen/>||c.currency==1&&<TbCurrencyRiyal/>||c.currency==2&& <BsCurrencyDollar/>||c.currency==3&& <BsCurrencyEuro/>||c.currency==4&& <BsCurrencyPound/>} {c.CODAmount} </span> </Col>
                              </Row><hr/></>)
                          } 
                         
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            </Modal>
        </React.Fragment>
    );
};

export default CODDetail;



   