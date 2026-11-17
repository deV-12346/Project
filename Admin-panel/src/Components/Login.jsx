import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from '../Components/Loadingspinner';
import axiosinstance from '../../axiosinstance';
import { baseURL } from '../../config';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setloading] = useState(false)

  // Get the redirect path from location state, default to dashboard
  const from = location.state?.from?.pathname || "/admindashboard";

  const onFinish = async (values) => {
     try {
      const { email, password } = values;
      const response = await axiosinstance.post(`${baseURL}/api/auth/adminlogin`, { email, password });
      if (response.data.success) {
        message.success(response.data.message);
        console.log(response.data.message)
        console.log(response.data.user)
        const token = response.data.token
        console.log(response.data.user)
        localStorage.setItem("token", token)
        setloading(true)
        setTimeout(() => {
          // Redirect to the original destination or dashboard
          navigate(from, { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.log("Error response:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      setloading(false)
    }
  };

  // Redirect if already logged in
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admindashboard', { replace: true });
    }
  }, [navigate]);

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