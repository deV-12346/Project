import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { UseAppContext } from "../Context/AppContext";  
import LoadingSpinner from '../Components/Loadingspinner';
import { baseURL } from "../../config"
const Sellerlogin = () => {
  const navigate = useNavigate();
  const { login } = UseAppContext(); 
  const [loading,setloading] = useState(false)

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      const response = await axios.post(`${baseURL}/api/auth/sellerlogin`, { email, password });

      if (response.data.success) {
        toast.success(response.data.message);
        message.success(response.data.message);
        localStorage.setItem("token",response.data.token)
        console.log("Token received:",response.data.token);
        axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        setloading(true)
        setTimeout(() => {
          login(response.data.user,response.data.token);
          navigate('/Seller/products'); 
        }, 2000);
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
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
         <ToastContainer position='top-center' />
         { loading ? ( <LoadingSpinner/> ) : (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Login</h2>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item name="email" rules={[{ type: "email", required: true }]}>
            <Input placeholder="Enter E-mail" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login as seller
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Link to="/changesellerpassword" className="text-blue-500 hover:underline">
                        Forget Password
                      </Link> <br />
          <span className="text-gray-600">Don't have seller account? </span>
          <Link to="/Sellerregister" className="text-blue-500 hover:underline">
           Register
          </Link>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-600"> Become a buyer  </span>
          <Link to="/Signup" className="text-blue-500 hover:underline">
             Register
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to home
          </Link>
        </div>
      </div>  
         )}
    </div>
  );
};

export default Sellerlogin;