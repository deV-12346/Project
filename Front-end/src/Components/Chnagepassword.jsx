import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import  {useNavigate}  from 'react-router-dom';

const Chnagepassword = () => {
      const navigate = useNavigate();
        const onFinish = async (values) => {
            try {
              const {  old_password , new_password , confirm_password } = values;
              const response = await axios.put("http://localhost:5001/api/auth/changepassword", { old_password , new_password , confirm_password});
              if (response.data.success) {
                toast.success(response.data.message);
                message.success(response.data.message);
                navigate('/');  // Redirect to home page or dashboard
              } 
            } catch (error) {
              console.log("Error response:", error.response?.data);
              const errorMessage = error.response?.data?.message || "Process failed";
              toast.error(errorMessage);
              message.error(errorMessage)
            }
          };
          return (
            <div className="flex items-center justify-center min-h-screen bg-gray-500">
              <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <ToastContainer position='top-center' />
                <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
                <Form name="basic" onFinish={onFinish} autoComplete="off">

                <Form.Item name="old_password" rules={[{ required: true, message: 'Please enter old password!' }]}>
                    <Input.Password placeholder="Old Password" />
                  </Form.Item>
        
                  <Form.Item name="new_password" rules={[{ required: true, message: 'Please enter new password!' }]}>
                    <Input.Password placeholder="New Password" />
                  </Form.Item>

                  <Form.Item name="confirm_password" rules={[{ required: true, message: 'password does not match' }]}>
                    <Input.Password placeholder="Confrim Password" />
                  </Form.Item>
        
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                      Change Password
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
)
}

export default Chnagepassword