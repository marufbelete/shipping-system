import {useRef} from 'react'
import useImport from "../../hooks/useImport"
import {CustomeButton, FileInput,FileInputButton} from '../styled/main.styled'
import {CgImport} from 'react-icons/cg'

export default function FileImport({name}){
const fileref=useRef()
const {importFile,selectedFile}=useImport()
return(
    <>
    <FileInput ref={fileref} type="file" onChange={importFile}/>
    <CustomeButton import onClick={()=>fileref.current.click()}>Import {name} <CgImport size={20}/> </CustomeButton>
    </>
)
}
