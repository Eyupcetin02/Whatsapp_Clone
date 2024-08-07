import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  auth: "",
};

export const authRegister = createAsyncThunk("authRegister", async (user) => {
  try {

    const formData = new FormData()
    formData.append("profileImage" , user.profileImage)
    formData.append("username" , user.username)
    formData.append("email" , user.email)
    formData.append("password" , user.password)



    const response = await axios.post(
      "http://localhost:5000/api/register",
      formData,
      { headers:{
        'Content-Type': 'multipart/form-data'
      }}
    );
    console.log(response.data.name.username);
    
    window.sessionStorage.setItem("user", response.data.name.username);
    window.location = "/home"

    return response.data;
    
  } catch (error) {
    console.log(error);
  }
});


export const authlogin = createAsyncThunk("authlogin", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/login",
      user
    );
    
    window.sessionStorage.setItem("user", response.data.name);
    console.log(response.data.name)
    window.location = "/home"

    return response.data;
    
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
      registerSuccess: (state, action) => {
          state.auth = action.payload; 
      },
  },
  extraReducers: (builder) => {
      builder.addCase(authRegister.fulfilled, (state, action) => {
          state.auth = action.payload;
      });
  }
})




export const {register} = authSlice.actions

export default authSlice.reducer