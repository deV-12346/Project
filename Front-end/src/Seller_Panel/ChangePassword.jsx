import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axiosinstace from "../../Axiosinstance"
import {baseURL} from "../../config"

const ChangePassword = () => {
   const navigate = useNavigate()
   const [sentOtp,setsentOtp] = useState(true)
   const [verifyOtp,setVerifyOtp] = useState(false)
   const [ChangePassword,setChangepassword] = useState(false)
   const [Email,setEmail] = useState("")
  const onFinish = async (values) => {
      const {email,otp,new_password,confirm_password} = values
      console.log(email,otp,new_password,confirm_password)
       try {    
      if(sentOtp){  
         const response = await axiosinstace.post(`${baseURL}/api/seller/sentotp`,{email})
         console.log(email)
         if(response.data.success){
            toast.success(response.data.message)
            console.log(response.data.message)
            setsentOtp(false)
            setVerifyOtp(true)
            setEmail(email)
         }
      }else if(verifyOtp){
            const response = await axiosinstace.post(`${baseURL}/api/seller/verifyotp`,{email:Email,otp})
         if(response.data.success){
            toast.success(response.data.message)
            console.log(response.data.message)
            setVerifyOtp(false)
            setChangepassword(true)
         }
      }else{
            const response = await axiosinstace.put(`${baseURL}/api/seller/changepassword`,{email:Email,new_password,confirm_password})
         if(response.data.success){
            toast.success(response.data.message)
            console.log(response.data.message)
            setChangepassword(false)
            navigate("/sellerlogin")  
         }
      }
      } catch(err){
            console.log(err?.response?.data?.message)
            toast.error(err?.message)
      }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <ToastContainer position="top-center" />
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
         {sentOtp && <Form.Item 
            name="email" 
            rules={[{ type: 'email', required: true, message: 'Please enter a valid email!' }]}
          >

             <Input 
              placeholder="Enter E-mail" 
            />
          </Form.Item>
          }
         { verifyOtp  && 
           <Form.Item name="otp" rules={[{ required: true, max:6, min:6, message: "Enter a valid OTP" }]}>
              <Input placeholder="Verify OTP" />
            </Form.Item> 
         }

          {
          ChangePassword && 
           <div>
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
          </div>
           }

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
            {
               sentOtp ?
            "Send OTP"
                 :
              verifyOtp  ?
            "Verify OTP"
                  :
            "Change Password"
            }
            </Button>
          </Form.Item>
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