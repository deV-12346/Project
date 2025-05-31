import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { baseURL } from "../../config";
import axiosinstance from "../../Axiosinstance"

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    Number: "${label} is not a valid number",
    password: "${label} is not a valid password",
  },
};

const Selleregister = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Form Values:", values);

    // Make API call
    axiosinstance
      .post(`${baseURL}/api/auth/sellerregister`, values) // Corrected endpoint
      .then((response) => {
        console.log("Response:", response);

        if (response.data.success) {
          toast.success(response.data.message || "Registered successfully!"); // Success toast
          setTimeout(() => navigate("/Sellerlogin"), 1000); // Redirect after 3 seconds
        } else {
          toast.error(response.data.message || "Registration failed!"); // Show error message
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        const errorMessage = error.response?.data?.message || "Registration failed! Please try again.";
        toast.error(errorMessage); // Show actual error message from backend
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Sign Up</h2>
        <Form
          name="signup-form"
          onFinish={onFinish}
          className="w-full"
          validateMessages={validateMessages}
        >
          <Form.Item name="sellername" rules={[{ required: true, min: 3, max: 15 }]}>
            <Input placeholder="Enter full sellername" />
          </Form.Item>

          <Form.Item name="email" rules={[{ type: "email", required: true }]}>
            <Input placeholder="Enter E-mail" />
          </Form.Item>

          <Form.Item
            name="mobileno"
            rules={[
              {
                required: true,
                pattern: /^(\+91)?[6-9]\d{9}$/,
                message: "Enter a valid mobile number",
              },
            ]}
          >
            <Input placeholder="Enter mobile number" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, min: 6, max: 10, message: "Create a valid password!" },
            ]}
          >
            <Input.Password placeholder="Create password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Register as seller
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already registered? </span>
          <Link to="/Sellerlogin" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default Selleregister;