/* eslint-disable */ 

import './App.css';
import React,{useEffect,useState} from 'react'
import { w3cwebsocket }  from 'websocket'
import { Route,Routes } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import { fetchHesedData, fetchMbsData, postHesedData, postMbsData, deleteHesedData, deleteMbsData, clearMbsData, clearHesedData } from './redux/actions';
import { Topbar,AllLines } from './components/compnentsIndex';
import { currentTime } from './utils';
import axios from 'axios'
function App() {

  

let client = new w3cwebsocket("ws://localhost:8080");
client.onopen = message => {
  console.log("React Connected to 8080");
} 



  const SelectedData = useSelector((state) => state.Selected);
  const dispatch = useDispatch();

  let [mbsData, setMbsData] = useState([]);
  let [hesedData, setHesedData] = useState([]);
  let [sTime, setTime] = useState('');


  //time interval
  setInterval(function() {

    setTime(currentTime())
    },35000)

    useEffect(() => {
      
      console.log("Time: " + sTime);
      if(sTime == '2359'){
       
     
        
        var config = {
          method: 'post',
          url: 'http://localhost:8000/clear',
          headers: { 
            'domain': 'bundles', 
            'Content-Type': 'application/json'
          },
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log("Clear Succses!");

        })
        .catch(function (error) {
          console.log(error);
        });

        


      }
    }, [sTime])


//load data from api
  useEffect(async() => {
    
await fetch("http://localhost:8000/mbs")
.then(respone => respone.json())
.then(data => {
  setMbsData(data)
})

await fetch("http://localhost:8000/hesed")
.then(respone => respone.json())
.then(data => {
  setHesedData(data)
})

setTime(currentTime())


  // client.send("React Connected")
  }, [])

  useEffect(() => {
    dispatch(fetchMbsData(mbsData))

  }, [mbsData])

  useEffect(() => {

    dispatch(fetchHesedData(hesedData))

  }, [hesedData])

// post
client.onmessage = message => {
let msgData = message.data.split(", ");
console.log(msgData);

if(msgData[2] == 'new'){
  
  if(msgData[1] == "bundles" ){
   
    dispatch(postMbsData(JSON.parse(msgData[0]),'new'))
  
  } else if(msgData[1] == "hesed" ) {
    
    dispatch(postHesedData(JSON.parse(msgData[0]),'new'))
    
    }
  }

  if(msgData[2] == 'gather'){
    if(msgData[1] == "bundles" ){
   
      dispatch(postMbsData(JSON.parse(msgData[0]),'gather'))
    
    } else if(msgData[1] == "hesed" ) {
      
      dispatch(postHesedData(JSON.parse(msgData[0]),'gather'))
      //look for matchnig id in new redux
      //if match id get value and make  avg
      //dipatch avg in redux
      }
  }
  
  if(msgData[2] == 'deliver'){
    if(msgData[1] == "bundles" ){
   
      dispatch(postMbsData(JSON.parse(msgData[0]),'deliver'))
    
    } else if(msgData[1] == "hesed" ) {
      
      dispatch(postHesedData(JSON.parse(msgData[0]),'deliver'))
      
      }
  
  }

  if(msgData[2] == 'done'){
    if(msgData[1] == "bundles" ){
   
      dispatch(postMbsData(JSON.parse(msgData[0]),'done'))
    
    } else if(msgData[1] == "hesed" ) {
      
      dispatch(postHesedData(JSON.parse(msgData[0]),'done'))
      
      }
  
  }

  if(msgData[2] == 'delete'){
    if(msgData[1] == "bundles" ){
   
      dispatch(deleteMbsData(msgData[0]))
    
    } else if(msgData[1] == "hesed" ) {
      
      dispatch(deleteHesedData(msgData[0]))
      
      }
  
  }

  if(msgData[1] == 'clear'){
    if(msgData[0] == "bundles" ){
   
      dispatch(clearMbsData())
    
    } else if(msgData[0] == "hesed" ) {
      
      dispatch(clearHesedData())
      
      }
  
  }
}




      

  return (
    <div  className="App">
      <Topbar/>

      <Routes>
        {/* <Route path='/' element={<Intro/>}/> */}

        <Route path='/mbs' element={<AllLines domain={{domain:"mbs",domainNumber:0}}/>}/>
        <Route path='/hesed' element={<AllLines domain={{domain:"hesed",domainNumber:1}}/>}/>
        {/* <Route path='/create' element={<CreateFilter/>}/> */}

        {/* <Route path='/citysal' element={<AllLines domain={{domain:"citysal",domainNumber:2}}/>}/> */}

        {/* <Route path={'/' + SelectedData} element={<Filter/>}/> */}


      </Routes>
    </div>

      

  );
}

export default App;
