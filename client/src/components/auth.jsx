import React, { useState } from 'react';
import { authRegister , authlogin} from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import "./auth.css"
const Auth = () => {
    const dispatch = useDispatch()

    const [state , setState] = useState({username : "" , email : "" , password : "" , profileImage:null})
    const [auth , setAuth] = useState(true)

   const setauthfunc = ()=>{
    setAuth(!auth)
    console.log(auth)
   }
   const loginFunc = ()=>{
console.log(2)
    dispatch(authlogin(state))
    
   }

    const reqFunc = ()=>{
        dispatch(authRegister(state))
    }
    


    const onFileChange = (e) => {
        const { name, value, files } = e.target;
        setState((prevState) => ({
          ...prevState,
          [name]: files ? files[0] : value
        }));
        console.log(state);
      };



    

    return (
        <div className='authContainer'>
        <div className='authChildContainer'>
            {auth && <input type="text" placeholder='username' value={state.name} onChange={onFileChange} name='username'/>}
            <input type="text" placeholder='email' value={state.email} onChange={onFileChange} name='email'/>
            <input type="text" placeholder='password'  value={state.password} onChange={onFileChange} name='password'/>
            {auth && <div class="file-input-container">
        <input name='profileImage' onChange={onFileChange} type="file" className="file-input" id="file"/>
        <label htmlFor="file" className="file-input-label">Fotoğraf Yükle</label>
    </div>}
            <span onClick={setauthfunc} className='span'>{auth ? "or login" : "or signin"}</span>
            <div className='buttonDiv'>{auth ? <span onClick={reqFunc}>register</span> : <span onClick={loginFunc}>login</span>}</div>
        </div>
            
        </div>
    );
}

export default Auth;
