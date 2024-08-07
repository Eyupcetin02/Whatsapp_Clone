import React, { useState } from 'react';
import Messagebody from './messageitem/Messagebody';
import Messageuser from './messageitem/Messageuser';
import "./whatsapp.css"
import { IoMenuSharp } from 'react-icons/io5';
const Whatsapp = ({user}) => {
    const [user2 , setUser2] = useState("eyup")
    const [menuState , setMenuState] = useState(false)

    return (
        <div className='container'>
            <IoMenuSharp onClick={()=>setMenuState(!menuState)} className="menu-icone"/>
            <Messageuser menuState={menuState} setUser2={setUser2} user2={user2}/>
            <Messagebody user2={user2} user={user}/> 
        </div>
    );
}

export default Whatsapp;
