import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Container } from 'react-bootstrap';
import MultiBarChart from '../../charts/nvd3-chart/chart/driverBar';
import LineChart from '../../charts/nvd3-chart/chart/shipments';
import BarDiscreteChart from '../../charts/nvd3-chart/chart/hubBar';
import Counter from '../../../components/Reusable/counter';
import { SortBy } from '../../../components/styled/main.styled';
import  {MdPlayArrow} from 'react-icons/md'
import { gql,useQuery } from '@apollo/client';
import {useSelector,useDispatch} from 'react-redux'
import { dashboardActions } from '../../../store/dashboard-slice';
const DashDefault = () => {
    const dispatch=useDispatch()
    const sortState=useSelector(state=>state.dashboard.sort)
    const active=useSelector(state=>state.dashboard.active)

    console.log(sortState)
    const gqlship=gql`
    query($input:ShipmentInputSort){       
    getAllShipmentCount(input: $input) {
            allshipments
            delivered
            returned
            canceled
            onprogress
          }
   }`
   const {loading,error,data,refetch}=useQuery(gqlship,{
    variables:{input:{filter:sortState
    }
  }})

    const fetched=useSelector(state=>state.shipment.updated)
    const [allshipmentcount,setAllship]=useState(0)
    const [deliverdshipmentcount,setDeliverdship]=useState(0)
    const [returnedshipmentcount,setReturnedship]=useState(0)
    const [canceledshipmentcount,setCanceledship]=useState(0)
    const [onprogressshipmentcount,setOnprogressship]=useState(0)

   const allcount={from:0,to:allshipmentcount}
   const deliverdcount={from:0,to:deliverdshipmentcount}
   const returnedcount={from:0,to:returnedshipmentcount}
   const canceledcount={from:0,to:canceledshipmentcount}
   const onprogresscount={from:0,to:onprogressshipmentcount}
    useEffect(()=>{
        refetch()
        if(data)
        {
            console.log(data?.getAllShipmentCount)
            setAllship(data?.getAllShipmentCount?.allshipments)
            setDeliverdship(data?.getAllShipmentCount?.delivered)
            setReturnedship(data?.getAllShipmentCount?.returned)
            setCanceledship(data?.getAllShipmentCount?.canceled)
            setOnprogressship(data?.getAllShipmentCount?.onprogress)
        }
        
    },[data,fetched,sortState])

    return (
        <React.Fragment>
            <Row style={{justifyContent:'end',marginBottom:'4px'}}>
             <Row style={{paddingRight:"20px"}}><SortBy filter>Filter<MdPlayArrow size={20}/></SortBy>
              <SortBy active={active===1?true:false} onClick={()=>{dispatch(dashboardActions.setActive(1)) 
                dispatch(dashboardActions.setFiltering("today"))}}>Today</SortBy> 
              <SortBy active={active===2?true:false} onClick={()=>{dispatch(dashboardActions.setActive(2))
            dispatch(dashboardActions.setFiltering("week"))}}>This Week</SortBy>
              <SortBy active={active===3?true:false} onClick={()=>{dispatch(dashboardActions.setActive(3))
            dispatch(dashboardActions.setFiltering("month"))}}>This Month</SortBy>
              <SortBy active={active===4?true:false} onClick={()=>{dispatch(dashboardActions.setActive(4))
            dispatch(dashboardActions.setFiltering("year"))}}>This Year</SortBy></Row>
             </Row>
            <Row>
                <Col md={6} xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">All Shipment</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        <Counter count={allcount}/>
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Delivered</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        <Counter count={deliverdcount}/>
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Out For Delivery</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        <Counter count={onprogresscount}/>
                                    </h3>
                                </div>
                            </div>
                           
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Canceled/Returned</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 
                                        <Counter count={canceledcount}/>/<Counter count={returnedcount}/>
                                    </h3>
                                </div>
                            </div>
                            
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Shipment Status</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <LineChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Hub History</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BarDiscreteChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Driver History Report</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <MultiBarChart />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
