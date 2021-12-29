import React from 'react'
import { Delivery, Done, Gather, New } from './compnentsIndex'

export default function AllLines({domain}) {
    return (
        <div className='AllLines'>

         
            <New domain={domain}/>
            <Gather domain={domain}/>
            <Delivery domain={domain}/>
            <Done domain={domain}/>
          
           
          
        </div>
    )
}
