import React,{useState} from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import MaterialTable from "material-table";
import {tableIcons} from './Tableicon'
import { useHistory } from 'react-router-dom';
import {CustomeButton} from '../styled/main.styled'
import TicketDetail from '../../views/shipment/Ticketdetail';
import { modalActions } from '../../store/modal-slice';
import { useDispatch } from 'react-redux';
import {TiTicket} from 'react-icons/ti'
export default function TicketAndSupport() {
  const history=useHistory()
  const dispatch=useDispatch()
  const [columns, setColumns] = useState([
    {title: "id", field: "id", hidden: true},
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ]);

  const [data, setData] = useState([
    {id: 1, name: 'said', surname: 'murad', birthYear: 2017, birthCity: 34 },
    {id: 2, name: 'abebe', surname: 'teshome', birthYear: 1987, birthCity: 63 },
    {id: 3, name: 'anteneh', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    {id: 4, name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    {id: 5, name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    {id: 6, name: 'madi', surname: 'hasen', birthYear: 1987, birthCity: 63 },
    {id: 7, name: 'maruf', surname: 'elis', birthYear: 1987, birthCity: 63 },
    {id: 8, name: 'Zerya', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  ]);

  return (
    <React.Fragment>
      <TicketDetail/>
    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Shipment</Card.Title>
                    <Row style={{float:'right'}}>
                            <CustomeButton onClick={()=>dispatch(modalActions.setForm(true))} new>Add New Hub <TiTicket size={20}/></CustomeButton>
                    </Row>
                </Card.Header>
                <Card.Body>
                <MaterialTable
                 components={{
                    Container: props => <div {...props} elevation={0}/>
               }}
                 responsive
      title="Driver"
      columns={columns}
      data={data}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        exportButton:true,
        columnsButton:true,
        maxBodyHeight: '550px',
        rowStyle:  (rowData, i) => {
          if (i % 2) {
              return {backgroundColor: "#f2f2f2"}
          }
      },
      headerStyle: {
        zIndex: 1,backgroundColor:"#FE7C7C",color:"white",fontSize:"16px",margin:'0px',padding:'10px 2px'
      },
      pageSize:10,
      }}
      localization={{
        body: {
          addTooltip: 'Add new Ticket',
          editTooltip: 'Edit Ticket',
          deleteTooltip: 'Delete Ticket',

       }
}}
      actions={[
        {
          tooltip: 'Ticket detail',
          icon:() => <CustomeButton style={{zIndex:'0'}}>Detail</CustomeButton>,
          iconProps: { color:'blue'},
          position:'row',
          onClick: (evt, Data) => {
            dispatch(modalActions.setModal(true))
          }
        }
      ]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />
   </Card.Body>
        </Card>
        </Col>
         </Row>
        </React.Fragment>
  )
}





