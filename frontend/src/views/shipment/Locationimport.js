import React,{useRef,useState} from 'react';
import { Row, Col, Card, Table,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { modalActions } from '../../store/modal-slice';
import MaterialTable from 'material-table';
import { tableIcons } from '../../components/Table/Tableicon';
import { tablemodalActions } from '../../store/tablemodal-slice';
import { AiFillCheckCircle,AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import { addLocations } from '../../store/locationHttp';
const customStyles = {
    content: {
      top: '55%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'70%',
      maxHeight:'520px'
    },
  };
Modal.setAppElement("#root");
const LocationModal = () => {
  const dispatch=useDispatch()
    function toggleModal() {
        console.log("close")
        dispatch(tablemodalActions.setVisibility(false))
      }    
    const isModalOpen=useSelector(state=>state.tablemodal.isOpen)
    const fileName=useSelector(state=>state.tablemodal.fileName)
    const tabledata=useSelector(state=>state.tablemodal.tableData)
    const isEditing=useSelector(state=>state.tablemodal.isEditing)

    const [columns, setColumns] = useState([
        {title: "id", field: "id", hidden: true},
        { title: 'Country', field: 'country',type:'string'},
        { title: 'City', field: 'city', type:'string' },
        { title: 'Special Name', field: 'specialName', type: 'string' },
    
    ]);
    
  const datat=[{}]
  let results;
  if(!isEditing)
  {
      tabledata.length&&tabledata.forEach((tdata,index)=>{
        console.log(tdata)
          datat.push({
            country:tdata['Country'],
            city:tdata['City'],
            specialName:tdata['Special Name']
          })
    })
    console.log(datat)
    results = datat.filter(element => {
      if (Object.keys(element).length !== 0) {
        return true;
      }
    
      return false;
    });
  }
  else
  {
    results=tabledata.map(o => ({ ...o }));
  }
    console.log(results)
    const AddHandler=()=>{
      dispatch(addLocations(results))
      dispatch(tablemodalActions.setVisibility(false))
    }
    return (
        <React.Fragment>
             <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}>
          <Card style={{padding:'20px',position:'relative'}}>
            <MaterialTable
                         components={{
                            Container: props => <div {...props} elevation={0}/>
                       }}
                         responsive
      title={`File:${fileName}`}
      columns={columns}
      data={results}
      icons={tableIcons}
      style={{padding:'0px'}}
      options={{
        pageSizeOptions:10
      }}
      editable={{
        onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataDelete = [...results];
            console.log(oldData)
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            console.log('after delete')
            console.log(dataDelete)
            dispatch(tablemodalActions.setEditing(true))                   
            dispatch(tablemodalActions.setTableModal([...dataDelete]))   
            resolve()
          }, 1000)
        }),
          onBulkUpdate: selectedData =>
          new Promise((resolve, reject) => {
            const rows=Object.values(selectedData)
            const updateRows=[...results]
            let index;
            rows.map(emp=>{
              index=emp.oldData.tableData.id
              updateRows[index]=emp.newData
            })
            setTimeout(() => {
              dispatch(tablemodalActions.setEditing(true))                   
              dispatch(tablemodalActions.setTableModal(updateRows))
              resolve()
            }, 1000)
          }),
      }}
     />
     </Card>
     <Row style={{justifyContent:'center', padding:'0px',margin:'0px'}}>
     <Button onClick={AddHandler} style={{width:'130px',height:'40px', marginRight:'30px'}}>Confirm <AiFillCheckCircle fontSize={24}/></Button>
     <Button onClick={()=>{dispatch(tablemodalActions.setVisibility(false))}} style={{width:'130px', padding:'0px'}}>Cancel <AiFillCloseCircle  fontSize={24}/></Button>
     </Row>
            </Modal>
        </React.Fragment>
    );
};

export default LocationModal;



   