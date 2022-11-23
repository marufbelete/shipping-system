
// import { useEffect,useRef, useState } from 'react';
// import { motion,animate} from 'framer-motion';
// import { animatinoA } from '../Animation/animation';
// import {CounterStyle,Plus} from '../styled/main.styled'
// import {useQuery,gql} from '@apollo/client'

// export default function LocationOption({count}) {
//   const gqlLocation=gql`
//   {
//     Location {
//       _id
//       specialName
//     }
//  }`
//  const {loading,error,data,refetch}=useQuery(gqlLocation)
//     return(
//       <>
//             <TextField
//                   value={valu}
//                   onChange={(e) => setValu(e.target.value)}
//                   select // tell TextField to render select
//                   label="Pickup Location"
//                   inputRef={pickupLocationref}
//                   variant='outlined'
//                   fullWidth
//                   required
//                   >
//                   {data&&data.Location.map(e=><MenuItem key={e._id} value={e._id}>
//                   {e.specialName}
//                   </MenuItem>)} 
//                   </TextField><div
//                       style={{position:'absolute',
//                           display:'inline-flex',
//                           right:'22px',
//                           top:'100px',
//                           color:'#038FCF'}}></div>
//       </>
//   )
   
//   }