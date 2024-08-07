import React, { useEffect, useState } from 'react';
import "./user.css"
import { FaRegUserCircle } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { MdMessage } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";

import axios from "axios"

const Messageuser = ({setUser2 , menuState}) => {

    const [state , setState] = useState([])
    const [showOptions , setShowOptions] = useState(false)
    const [searchTerm,setSearchTerm] = useState("")

    useEffect(()=>{
        const getUsers = async()=>{

            const response = await axios.get("http://localhost:5000/api/getusers")
            setState(response.data.eyup)
        }

        getUsers()
    }, [])

    const exitFunc = ()=>{
            window.sessionStorage.clear()
            window.location = "/"
    }

    const userFunc = (item)=>{
        setUser2(()=>item.username)
    }

    const handleMenuClick = () => {
        setShowOptions(!showOptions);
    };

    const handleSearch = (event)=>{
        setSearchTerm(event.target.value);
    }

    const filteredUsers = state.filter((user) => {
        return user.username.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const style = {
        display : menuState ? "none" : "block"
    }

    return (
        <div style={style} className='usercontainer'>
            <div className='userinfo'>
            <div className='profilimg'><FaRegUserCircle style={{fontSize:35 , margin:5}}/></div>
            <div className='userinfo-right-side'>
            <MdPeopleOutline className='profile-icone'/>
            <MdMessage className='profile-icone'/>
            <CiMenuKebab className='profile-icone' onClick={handleMenuClick}/>
            {showOptions && (
                <div className="options">
                    <option onClick={exitFunc}>Çıkış</option>
                </div>
            )}
            </div>
            </div>
            <div className='authInput'>
                <input type="text" placeholder='Ara...' onChange={handleSearch} />
               
            </div>

            <div className='filters'>
                <ul className='list-ul'>
                    <li className="list">Tümü</li>
                    <li className="list">Okunmamış</li>
                    <li className="list">Guruplar</li>
                </ul>
            </div>
            
            {filteredUsers.map((item , index)=>(
            <div key={index} className='users' onClick={()=>userFunc(item)}>
                <div className='profilimg'>{item.profileImage ? <img src={`http://localhost:5000${item.profileImage}`} alt="" className="profile-photo" style={{width:35, height:35 , margin:5, borderRadius:"50%"}} />: <FaRegUserCircle className="profile-photo" style={{fontSize:35 , margin:5 }}/>}</div>
                <div className='username'>{item.username}</div>
                <div className='usermail'>{item.email}</div>
                <div>
                
                </div>
            </div>    
            ))}
        </div>
    );
}

export default Messageuser;
