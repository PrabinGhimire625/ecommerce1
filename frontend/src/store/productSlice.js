import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/statusEnum/status";
import { API } from "../http/Api";

const productSlice=createSlice({
    name:"product",
    initialState:{
        product:[],
        status:STATUS.LOADING,
        singleProduct:null
    },
    reducers:{
        setProduct(state,action){
            state.product=action.payload
            console.log(state.product)
        },
        setStatus(state,action){
            state.status=action.payload
        }, 
        setSingleProduct(state,action){
            state.singleProduct=action.payload
            console.log(state.singleProduct)
        }
    }
})

export const {setProduct,setStatus,setSingleProduct} =productSlice.actions
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

//fetch single product
export function fetchSingleProduct(productId) {
    return async function fetchSingleProductThunk(dispatch, getState) {
        const state = getState();  // Added getState to access the state
        const existingProduct = state.products.product.find((product) => product.id === productId);
        if (existingProduct) {
            dispatch(setSingleProduct(existingProduct));
            dispatch(setStatus(STATUS.SUCCESS));
        } else {
            dispatch(setStatus(STATUS.LOADING));
            try {
                const response = await API.get(`/admin/product/${productId}`);
                if (response.status === 200) {
                    const { data } = response.data;
                    dispatch(setSingleProduct(data));
                    dispatch(setStatus(STATUS.SUCCESS));
                } else {
                    dispatch(setStatus(STATUS.ERROR));
                }
            } catch (err) {
                dispatch(setStatus(STATUS.ERROR));
            }
        }
    };
}