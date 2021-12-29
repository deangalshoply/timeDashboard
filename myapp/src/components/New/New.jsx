import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
export default function New({domain}) {

    const SelectedData = useSelector((state) => state.Selected);
    const MbsData = useSelector((state) => state.Mbs);
    const HesedData = useSelector((state) => state.Hesed);

    const dispatch = useDispatch();
    let RenderMbs = 'Loading...'
    let RenderHesed = 'Loading...'
    let mbs = [...MbsData]
    let hesed = [...HesedData]

    //mbs load data
    if(mbs[0] != undefined){

        RenderMbs = mbs[0].data.map(element => (
            <tr>
                <td>{element.id}</td>
                <td>{element.timestamp}</td>
            </tr>
             
         ));
    }

    //hesed load data
    if(hesed[0] != undefined){

        RenderHesed = hesed[0].data.map(element => (
            <tr>
                <td>{element.id}</td>
                <td>{element.timestamp}</td>
            </tr>
             
         ));
    }
        

    return (
        <table className='Table'>
        
        <thead>
        <div className={(domain == 'mbs') ? 'Header' : 'HeaderHesed'}>New</div>

        <tr>
            <th className={(domain == 'mbs') ? 'thMbs' : 'thHesed'}>id</th>
            <th className={(domain == 'mbs') ? 'thMbs' : 'thHesed'}>timestamp</th>
        </tr>
        </thead>

        <tbody>
        {(domain.domain == 'mbs') ? RenderMbs : RenderHesed}
        </tbody>

        </table>
    )
}
