import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../Context/authcontext";  // Import useAuth
import LoadingSpinner from '../Components/Loadingspinner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [loading,setloading] = useState(false)

  const onFinish = async (values) => {

    try {
      const { email, password } = values;
      const response = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      if (response.data.success) {
        toast.success(response.data.message);
        message.success(response.data.message);
        setloading(true)
        setTimeout(() => {
          login(response.data.user);
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log("Error response:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      message.error(errorMessage);
      setloading(false)
    } 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <ToastContainer position='top-center' />
        { loading ? (<LoadingSpinner/> ) : ( 
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
         <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item name="email" rules={[{ type: "email", required: true }]}>
            <Input placeholder="Enter E-mail" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, min:6 }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>  
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-600">Become a seller </span>
          <Link to="/Sellerregister" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to home
          </Link>
        </div> 
      </div>   )}
    </div>
  );
};

export default Login;