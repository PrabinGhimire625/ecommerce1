import React, { useEffect } from 'react';
import Form from '../Form';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetStatus} from '../../../store/authSlice';
import { STATUS } from '../../../globals/statusEnum/status';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      dispatch(resetStatus())
      alert("Successfully login to the system!")
      navigate('/');
    } 
  }, [status, navigate, dispatch]);

  return (
    <>
      <Form type="login" onSubmit={handleLogin} />
    </>
  );
};

export default Login;
