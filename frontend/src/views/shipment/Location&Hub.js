import React, { useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import Location from '../../components/Table/Location'
import Hub from '../../components/Table/Hub'
import { CODButton } from '../../components/styled/main.styled';
export default function Locations() {

 const [active,setActive]=useState(1)
  return (
    <>
    <Row>
    <CODButton active={active===1} onClick={()=>setActive(1)}>Location</CODButton>
    <CODButton active={active===2} onClick={()=>setActive(2)}>Hub</CODButton>
    </Row>
    {active===1&&<Location/>}
    {active===2&&<Hub/>}
    </>
  )
}