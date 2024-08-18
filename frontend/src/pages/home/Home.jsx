import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../globals/card/Card'
import { STATUS } from '../../globals/statusEnum/status'
import { useNavigate } from 'react-router-dom'
import { fetchProduct } from '../../store/productSlice'

const Home = () => {
  const dispatch=useDispatch();
  // const {product}=useSelector((state)=>state.products)

  const navigate=useNavigate()
  
  const {status,product}=useSelector((state)=>state.products) //"products" store ko reducer bhitra bata ayo  //check status
  console.log("Status is : ",status)
    console.log(product)
  useEffect(()=>{
    dispatch(fetchProduct()) //dispatch the fetchProduct function
  },[])

  console.log(product)


  return (
   <>
    <div className='flex flex-col items-center mt-8'>
      <h1 className='text-4xl font-bold text-center mb-6 text-gray-800'>Top products</h1>
       
       <div className="flex flex-wrap justify-center gap-6">
          
          {product.length>0 && product.map((pd)=>{
            return(
              <Card key={pd.id} data={pd} />
            )
          })}

       </div>
      </div>
   
   </>
  )
}

export default Home
