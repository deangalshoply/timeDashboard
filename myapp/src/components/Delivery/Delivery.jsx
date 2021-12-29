import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
export default function Delivery({domain}) {

    const SelectedData = useSelector((state) => state.Selected);
    const MbsData = useSelector((state) => state.Mbs);
    const HesedData = useSelector((state) => state.Hesed);

    const dispatch = useDispatch();
    let RenderMbs = 'Loading...'
    let RenderHesed = 'Loading...'
    let mbs = [...MbsData]
    let hesed = [...HesedData]

    //mbs load data
    if(mbs[2] != undefined){

        RenderMbs = mbs[2].data.map((element,index) => (
            <tr key={index}>
                <td>{element.id}</td>
                <td>{element.timestamp}</td>
            </tr>
             
         ));
    } 
    
    //hesed load data
    if(hesed[2] != undefined){

        RenderHesed = hesed[2].data.map((element,index) => (
            <tr key={index}>
                <td>{element.id}</td>
                <td>{element.timestamp}</td>
            </tr>
             
         ));
    }

    return (
        <table className='Table'>
            <thead>
                   <div className={(domain.domain == 'mbs') ? 'Header' : 'HeaderHesed'}>Delivery</div>

        <tr>
            <th className={(domain.domain == 'mbs') ? 'thMbs' : 'thHesed'}>id</th>
            <th className={(domain.domain == 'mbs') ? 'thMbs' : 'thHesed'}>timestamp</th>
        </tr>
            </thead>
           
        <tbody>
                {(domain.domain == 'mbs') ? RenderMbs : RenderHesed}

        </tbody>
       
        </table>
    )
}
