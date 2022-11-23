import CODTables from '../../components/Table/CODbalance'
import { Row } from 'react-bootstrap';
import { CODButton } from '../../components/styled/main.styled';
import CODTransaction from '../../components/Table/CODTransaction'
import { useState } from 'react';
import { errorActions } from '../../store/error-slice';
import { useDispatch } from 'react-redux';
export default function CODTable() {
  const dispatch=useDispatch()
 const [active,setActive]=useState(1)
  return (
    <>
    <Row>
    <CODButton active={active===1} onClick={()=>{setActive(1)
    dispatch(errorActions.Message(''))}}>COD Balance</CODButton>
    <CODButton active={active===2} onClick={()=>{setActive(2)
    dispatch(errorActions.Message(''))}}>COD Transaction</CODButton>
    </Row>
    {active===1&&<CODTables/>}
    {active===2&&<CODTransaction/>}
    </>
  )
}