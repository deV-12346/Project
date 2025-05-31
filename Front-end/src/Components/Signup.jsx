import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useGoogleLogin } from "@react-oauth/google";
import { UseAppContext } from "../Context/AppContext";
import { baseURL } from "../../config";
import  axioinstance from "../../Axiosinstance"
import LoadingSpinner from "./Loadingspinner";
import { useState } from "react";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    Number: "${label} is not a valid number",
    password: "${label} is not a valid password",
  },
};

const Signup = () => {
  const [loading,setloading] = useState(false)
  const navigate = useNavigate();
  const {login} = UseAppContext()
  const onFinish = (values) => {
    console.log("Form Values:", values);
     axioinstance.post(`${baseURL}/api/auth/register`, values) 
      .then((response) => {
        console.log("Response:", response);
        if (response.data.success) {
          toast.success(response.data.message); 
          setTimeout(() =>
           navigate("/login"), 3000); 
        } else {
          toast.error(response.data.message || "Registration failed!"); 
         console.log(response.data.message)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        const errorMessage = error.response?.data?.message || "Registration failed! Please try again.";
        toast.error(errorMessage); // Show actual error message from backend
      });
    };
    
      const responseGoogle = async(authResult)=>{
             console.log("auth result :",authResult)
             try{
              if(authResult.code){
                const response = await  axioinstance.get(`${baseURL}/api/auth/google?code=${authResult.code}`)
                login(response.data.user, response.data.token);
                setloading(true)
                setInterval(() => {
                   toast.success(response.data.message)
                   navigate("/")
                },5000)
              }
             }
             catch(error){
              console.log(error.response?.data?.message)
              toast.error(error.response.data.message)
             }
      }

      const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
       {loading ? (<LoadingSpinner/>): (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Form
          name="signup-form"
          onFinish={onFinish}
          className="w-full"
          validateMessages={validateMessages}
        >
          <Form.Item name="username" rules={[{ required: true, min: 3, max: 15 }]}>
            <Input placeholder="Enter full name" />
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
              Register
            </Button>
          </Form.Item>
        </Form>
        <div>
        <button
              onClick={googleLogin}
              className="flex items-center justify-center gap-2 w-full text-[#000] bg-white border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-100 transition mb-4"
              >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="G" className="w-5 h-5" />
                    Continue with Google
              </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already registered? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-600">Become a seller </span>
          <Link to="/Sellerregister" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
        <ToastContainer position="top-center"/>
      </div>
      )}
    </div>
   );
};

export default Signup;