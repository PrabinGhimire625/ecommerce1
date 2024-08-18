import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/statusEnum/status";
import { API } from "../http/Api";

const productSlice=createSlice({
    name:"product",
    initialState:{
        product:[],
        status:STATUS.LOADING,
    },
    reducers:{
        setProduct(state,action){
           console.log(state.product)
            state.product=action.payload
            console.log(state.product)
        },
        setStatus(state,action){
            state.status=action.payload
        }
    }
})

export const {setProduct,setStatus} =productSlice.actions
export default productSlice.reducer

//fetch product

export function fetchProduct(){
    return async function fetchProductThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response=await API.get("/admin/product")
            if(response.status===200){
                const {data}=response.data
                console.log(data)
                dispatch(setProduct(data))
                dispatch(setStatus(STATUS.SUCCESS))
            }else {
                dispatch(setStatus(STATUS.ERROR));     
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR))
        } 
    }
}

