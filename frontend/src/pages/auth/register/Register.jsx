import React, { useEffect } from 'react'
import Form from '../Form'
import { useDispatch, useSelector } from 'react-redux'
import { register, resetStatus } from '../../../store/authSlice'
import { STATUS } from '../../../globals/statusEnum/status'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {status}=useSelector((state)=>state.auth)
 
  console.log("Status is : ",status)
  const handleReister=(data)=>{
    dispatch(register(data))
  }

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      dispatch(resetStatus())
      alert("Successfully register to the system!")
      navigate('/login');
    } 
  }, [status, navigate, dispatch]);

  return (
    <>
    <Form type="register" onSubmit={handleReister}/>
    </>
  )
}

export default Register
