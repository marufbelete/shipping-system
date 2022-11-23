import styled from 'styled-components'
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Modal from "react-modal";
import { Col,Row } from 'react-bootstrap';
import { AiFillCheckCircle,AiFillCloseCircle } from "react-icons/ai";


export const Plus=styled.span`
font-size: large;
`
export const CustomModal=styled(Modal)`

`
export const CounterStyle=styled.div`
display: inline-block;
`
export const CustomeButton=styled.button`
border: none;
background-color:#EFEFEF;
font-size: 12px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
font-weight: bold;
width:50px;
height: 50px;
width:${(props)=>props.new&&'auto'};
padding:${(props)=>props.new&&'0 8px'};
height:${(props)=>props.new&&'40px'};
width:${(props)=>props.import&&'150px'};
width:${(props)=>props.driver&&'100px'};
margin-right:${(props)=>props.import&&'20px'};
padding:${(props)=>props.import&&'0 8px'};
padding:${(props)=>props.driver&&'0 8px'};
height:${(props)=>props.import&&'40px'};
height:${(props)=>props.driver&&'40px'};
border-radius: 50%;
border: none;
border-radius: ${(props)=>props.new&&'15px'};
border-radius: ${(props)=>props.import&&'15px'};
border-radius: ${(props)=>props.driver&&'15px'};
background-color: ${(props)=>props.new&&'#6d65cd'};
background-color: ${(props)=>props.import&&'#1f345ade'};
background-color: ${(props)=>props.driver&&'#1111de'};
background-color: ${(props)=>props.delete&&'#CC474C'};
background-color: ${(props)=>props.edit&&'#6288B5'};
color: ${(props)=>props.new&&'#80D2F5'};
color: ${(props)=>props.import&&'#a0ffdd'};
color: ${(props)=>props.driver&&'white'};
.MuiTouchRipple-root{
 display: none
}
&:hover{
transform: scale(1.1);
transform: ${(props)=>props.new&&'scale(1.01)'};
transform: ${(props)=>props.import&&'scale(1.01)'};
transform: ${(props)=>props.driver&&'scale(1.05)'};
color: blue;
color: ${(props)=>props.new&&'white'};
box-shadow: none;
background-color: #FFFFFF;
color: ${(props)=>props.import&&'#a0ffdd'};
color: ${(props)=>props.driver&&'white'};
background-color: ${(props)=>props.new&&'#8f87ed'};
background-color: ${(props)=>props.import&&'#1f55b7de'};
background-color: ${(props)=>props.driver&&'#3434a3'};
}

`
export const CustomeCollect=styled.button`
border: none;
background-color:blue;
font-size: 12px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
font-weight: bold;
font-size: ${(props)=>props.impor&&'11px'};
border: none;
width:70px;
height:40px;
color: white;
background-color: ${(props)=>props.delete&&'#CC474C'};
background-color: ${(props)=>props.edit&&'#6288B5'};
color: ${(props)=>props.add&&'#80D2F5'};
color: ${(props)=>props.impor&&'#3EB489'};
border-radius: 20px;
&:hover{
transform: scale(1.1);
color: white;
}
`
export const StyledImg=styled.div`
&:hover{
    cursor: pointer;
    transform: scale(1.1);

}
`
export const FileInput=styled.input`
display:none
`
export const FileInputButton=styled.button`
padding:10px 15px;
box-shadow:"0px 0px 8px rgb(255,255,255)";
border-radius:12px;
background-color:blue ;
border:none;
`
export const StyledAiFillCloseCircle=styled(AiFillCloseCircle)`
&:hover{
    transform: scale(1.1);
    cursor: pointer;
}
`
export const DetailItem=styled(Col)`
text-align: center;
margin-bottom:20px;
max-width: 300px;
`
export const DetailText=styled.span`
vertical-align:middle;
margin:auto;
font-size: 14px;
font-weight: bolder;
`
export const Divide=styled.hr`
border: ${(props)=>props.location&&'solid 1.5px #0000ffd6'};
border: ${(props)=>props.hub&&'solid 1.5px #0000ffd6'};
border: ${(props)=>props.cod&&'solid 1.5px #0000ffd6'};
border: ${(props)=>props.transaction&&'solid 1.5px #0000ffd6'};

`
export const ManageText=styled.h3`
color: ${(props)=>props.location&&'#0000ffd6'};
color: ${(props)=>props.hub&&'#0000ffd6'};
`

export const CODText=styled.h5`
color: ${(props)=>props.cod&&'#0000ffd6'};
color: ${(props)=>props.transaction&&'#0000ffd6'};
`
export const CODButton=styled.div`
cursor: pointer;
margin-left:15px;
margin-bottom:10px;
padding:6px 10px;
border-radius:12px;
color:${(props)=>props.active&&'white'};
background-color: ${(props)=>props.active&&'#6D65CD'};
`
export const Twin=styled(Col)`
margin-left:20px;
width: ${(props)=>props.cod&&'20px'};
text-align:center;
&:hover{
    cursor: pointer;
}
`
export const SortBy=styled.div`
display:inline-block;
padding: 10px;
font-weight: ${(props)=>props.filter&&"bolder"};
color: ${(props)=>props.active&&"blue"};
font-weight: ${(props)=>props.active&&"bolder"};
&:hover{
    cursor: pointer;
}
`
export const ProofDoc=styled.img`
width:30px;
height: 30px;
object-fit: cover;
&:hover{
    cursor: all-scroll;
}
`
export const Span=styled.span`
&:hover{
    cursor: pointer;
}
`
export const Templates=styled.div`
position:absolute;
right:20px;
top:20px;
&:hover{
    cursor: pointer;
}
`
export const Notifications=styled.div`
text-align: center;
font-size: 14px;
padding: 10px 0px;
`
