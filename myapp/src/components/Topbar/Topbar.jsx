import './Topbar.css'
import { useState } from 'react';
import Button from '@mui/material/Button';
// import TemporaryDrawer from '../Drawer/Drawer';
import { useNavigate  } from 'react-router-dom';
import { useKey } from '../../utils';
export default function Topbar() {

    let navigate = useNavigate();
    
    const [active, setActive] = useState(false)

    function handleClick(e) {
      e.preventDefault();
      navigate(e.target.name)
      
    }

    function handleEsc() {
        setActive(!active)
    }
    
      useKey("Escape",handleEsc)
    

    return (
        <div className={"Topbar" + (active ? ' active' : '')}>
            {/* <TemporaryDrawer /> */}
            <Button variant="contained" name='/mbs' onClick={handleClick} sx={{ width: 150 , height:70, borderRadius:'20px', backgroundColor: '#6EB3CA', fontSize:'23px',fontWeight:'bolder' }}>מיי באנדלס</Button>
            <Button variant="contained" name='/hesed' onClick={handleClick} sx={{ width: 150 , height:70, borderRadius:'20px', backgroundColor: '#FEB866',fontSize:'25px' ,fontWeight:'bolder' }}>חסד</Button>
            {/* <Button variant="contained" name='/citysal' onClick={handleClick} sx={{ width: 150 , height:70, borderRadius:'20px' }}>סיטיסל</Button> */}

        </div>
    )
}


