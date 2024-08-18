import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/statusEnum/status";
import { APIAuthenticated } from "../http/Api";

const cartSlice= createSlice({
    name:"cart",
    initialState:{
        items: [],
        status:STATUS.LOADING,
    },
    reducers:{
        setItems(state,action){
            state.items=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        }
    }
})

const {setItems,setStatus}=cartSlice.actions
export default cartSlice.reducer

export function addToCart(productId){
    return async function addToCartThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response =await APIAuthenticated.post("/customer/cart",{
                productId,
                quantity:1
            })
            console.log(response)
            if(response.status===200){
                dispatch(setStatus(STATUS.SUCCESS))
                dispatch(setItems(response.data.data))
            }else{
                dispatch(setStatus(STATUS.ERROR))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus(STATUS.ERROR))
        } 
    }
}