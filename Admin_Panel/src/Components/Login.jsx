import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from '../Components/Loadingspinner';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [loading,setloading] = useState(false)

  const onFinish = async (values) => {
     try {
      const { email, password } = values;
      const response = await axios.post("http://localhost:5000/api/auth/adminlogin", { email, password });
      if (response.data.success) {
        message.success(response.data.message);
        console.log(response.data.message)
        console.log(response.data.user)
        const token = response.data.token
        console.log(response.data.user)
        setloading(true)
        setTimeout(() => {
        navigate("/admindashboard");
        localStorage.setItem("token",token)
        }, 4000);
      }
    } catch (error) {
      console.log("Error response:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      setloading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <ToastContainer position='top-center' />
        { loading ? (<LoadingSpinner/> ) : ( 
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
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
      </div>   )}
    </div>
  );
};

export default Login;