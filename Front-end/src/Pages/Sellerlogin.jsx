import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../Context/authcontext";  // Import useAuth

const Sellerlogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
   // Get login function from context

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      const response = await axios.post("http://localhost:5001/api/auth/sellerlogin", { email, password });

      if (response.data.success) {
        toast.success(response.data.message);
        message.success(response.data.message);
        login(response.data.user);
        navigate('/');  // Redirect to home page or dashboard
      } 
    } catch (error) {
      console.log("Error response:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <ToastContainer position='top-center' />
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
    </div>
  );
};

export default Sellerlogin;