import { createSlice } from "@reduxjs/toolkit";
import {STATUS} from "../globals/statusEnum/status"
import { API } from "../http/Api";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        data : [],
        status : STATUS.LOADING,
        token:""
    },
    reducers:{
        setUser(state,action){
            state.data=action.payload
        }, 
        setStatus(state,action){
            state.status=action.payload
        },
        resetStatus(state){
            state.status=STATUS.LOADING
        },
        setToken(state,action){
            console.log("Setting token:", action.payload);  // Log the payload
            state.token=action.payload
        }
    }
})

export const {setUser,setStatus,resetStatus, setToken}=authSlice.actions
export default authSlice.reducer

export function register(data){
    return async function registerThunk(dispatch) {
        dispatch(setUser(STATUS.SUCCESS))
        try{
            const response=await API.post("/signup",data)
            if(response.status===200){
                dispatch(setStatus(STATUS.SUCCESS))
            }else{
                dispatch(setStatus(STATUS.ERROR))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus(STATUS.ERROR))
        }  
    } 
}

export function login(data){
    return async function loginThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response=await API.post("login",data)
            if(response.status===200){
                const {data}=response.data
                console.log("Data is stored",data)
                dispatch(setStatus(STATUS.SUCCESS))
               // dispatch(setUser(data)) //optional needed if set inside the data
                dispatch(setToken(data))
                localStorage.setItem('token',data)
            }else{
                dispatch(setStatus(STATUS.ERROR))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}



