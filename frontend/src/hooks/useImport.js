import { useEffect,useState,useRef, useDebugValue } from "react";
import {utils,read} from 'xlsx'
import { useDispatch } from "react-redux";
import { tablemodalActions } from "../store/tablemodal-slice";
export default function useImport(validateValue){
    const dispatch=useDispatch()
  const [selectedFile,setSelectedFile]=useState('')
    const EXTENSIONS = ['xlsx', 'xls', 'csv']
      const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            const file=e.target.files[0]
            console.log(file)
            const fileType=file.name&&file.name.split('.')[1]
            if(EXTENSIONS.includes(fileType))
            {
            setSelectedFile(file.name)
            dispatch(tablemodalActions.setFileName(file.name))
            reader.onload = (e) => {
                const data = e.target.result;
                console.log(data)
                const workbook = read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const tabledata = utils.sheet_to_json(worksheet);
                console.log(tabledata);
               dispatch(tablemodalActions.setTableModal(tabledata))
               dispatch(tablemodalActions.setVisibility(true))
               dispatch(tablemodalActions.setEditing(false))          


            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
        else
      {
        alert("invalid input")
        //dispatch
      }
      }
    }
    return({
       importFile:readUploadFile,
       selectedFile
    })
}
  