import React, { useEffect, useState } from 'react';
import "./body.css"
import { IoSend } from "react-icons/io5";
import io from "socket.io-client"
import { IoMenuSharp } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { MdPeopleOutline } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';


const socket = io("http://localhost:5000")

const Messagebody = ({user , user2}) => {
   
    const [state , setState] = useState("")
    const [mesaj , setMesaj] = useState([])

    const schemaKey = [user, user2].sort().join('');

    useEffect(() => {

        socket.on("connection" , ()=>{
             console.log("bağlandi");

         })

    }, []);

    useEffect(()=>{

        socket.emit("users" ,  { user1: user, user2: user2})

        socket.on(schemaKey , (data)=>{
           
            if(data.length === 0){
                setMesaj([])
            }else{
                setMesaj(data)
                console.log("data" , data);
            }
        })  
        console.log("user2" , user2);

    },[user2])

    const handleMessageChange = (e) => {
        setState(e.target.value);
        
    };

    const sendMessage = () => {
         socket.emit('users', { user1: user, user2: user2, message: state });
        setState("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };
    

    return (
        <div className='bodycontainer'>
            <div className='message-body-navbar'>
                <div className='message-body-lefside'>
                    <FaRegUserCircle className='mesage-body-profile-photo'/>
                </div>

                <div className='message-body-rightside'>
                    <IoSearchOutline style={{cursor:"pointer"}}/>
                    <CiMenuKebab style={{cursor:"pointer"}}/>
                </div>
            </div>
            <div className='message-container'>

            
            <div className='message'>
                {mesaj.map((item , index)=>{

            const date = new Date(item.date);
            const options = {
                        timeZone: 'Europe/Istanbul',
                        hour: 'numeric',
                        minute: 'numeric'
                };
                const turkishTime = date.toLocaleTimeString('tr-TR', options);
                const kişi = window.sessionStorage.getItem("user")
                const sorgu = (item)=>{
                    if (item.user === kişi) {
                        return true
                    }
                    else{
                        return false
                    }
                }
                return(
               item.message && (<div key={index} className={sorgu(item) ? "truemessageBox" : "falsemessageBox"}>
                 <span className='messageSpan'>{item.message}</span>
                 <div className='dateSpan'>{turkishTime}</div>
             </div>))})}
            </div>
            </div>
            <div className='input'>
                <input onKeyDown={handleKeyPress} value={state} placeholder='Bir mesaj yazın' onChange={handleMessageChange} type="text" />
                <button className='iconeButton' onClick={sendMessage}><IoSend/></button>
            </div>
        </div>
    );
}

export default Messagebody;
