import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false); 
  const  [timeRemaining,settimeRemaining] = useState(60) 
  const onFinish = async (values) => {
    try {
      const { email, new_password, confirm_password, otp} = values;
      const token = localStorage.getItem("token")
      if (!otpSent) {
        const response = await axios.post("http://localhost:5000/api/auth/generateotp", { email, new_password, confirm_password,otp}      );
        if (response.data.success) {
          toast.success(response.data.message);
          console.log(response.data.message);
          setOtpSent(true);

          const timerID = setInterval(() => {
            settimeRemaining((prevTime) => {
              if (prevTime === 1) {
                clearInterval(timerID);
              }
              return prevTime - 1;
            });
          }, 1000);

        }
      } else {
        const response = await axios.put("http://localhost:5000/api/auth/changepassword", { email , new_password, confirm_password, otp });
        if (response.data.success){
          toast.success(response.data.message);
          console.log(response.data.message);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      }
    } catch (error) {
      console.log("Error response:", error?.response?.data.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <ToastContainer position="top-center" />
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item 
            name="email" 
            rules={[{ type: 'email', required: true, message: 'Please enter a valid email!' }]}
          >
            <Input 
              placeholder="Enter E-mail" 
              disabled={otpSent}  // Disable after OTP sent
            />
          </Form.Item>

          <Form.Item 
            name="new_password" 
            rules={[{ required: true, min: 6, max: 10, message: 'Please enter new password!' }]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item 
            name="confirm_password" 
            rules={[ {  required: true,  min: 6, max: 10,  message: 'Please enter confirm password!'  },]}>
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          {otpSent && (
            <Form.Item name="otp" rules={[{ required: true, max:6, min:6, message: "Enter a valid OTP" }]}>
              <Input placeholder="Verify OTP" />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {otpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </Form.Item>
          {(otpSent && timeRemaining!==0)  &&  <p>Expires in <span className='text-red-600'>{timeRemaining}</span></p>}
          
        </Form>

        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;