import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { baseURL } from '../../config'
import axiosinstance from "../../Axiosinstance"

const InputField = ({type,placeholder, name,handlechange,address})=>(
      <input className='w-full mb-2 px-2 py-2.5  border border-gray-500/20 rounded outline-none text-gray-500 focus:border-primary transition'
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={handlechange}
      address={address[name]} 
      required />
)

const AddAddress = () => {

      const [address,setaddress] = useState({
            firstName :"",
            lastName : "",
            email : "",
            street : "",
            city : "",
            state : "",
            pincode : "",
            country : "",
            phone : "",
      })

      const handlechange = (e) =>{
            const {name,value} = e.target
            setaddress((prevAddress)=>({
                  ...prevAddress,
                  [name] : value
            }))
      }

      const HandleSubmit = async (formData)=>{
            e.preventDefault()
            try{
                  const userId = JSON.parse(localStorage.getItem("user"))?._id;
                  const dataToSend = { ...address, userId };
                  const response = await axiosinstance.post(`${baseURL}/api/product/address`,dataToSend)
                  if(response.data.success){
                        console.log("Adress addedd")
                  }
            }
            catch(err){
                  console.log(err)
            }
      }
  return (
    <div className='mt-16 mx-10 my-10 pb-16'>
     <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping 
      <span className='font-semibold text-primary'> Address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10 '>
            <div className='flex-1 max-w-md mt-10 md:mt-0'>
                  <form onSubmit={HandleSubmit}>

                       <div className='grid grid-cols-2 gap-4'>
                        <InputField handlechange={handlechange} address={address} name="firstName"
                        type="text" placeholder="First Name" />
                        <InputField handlechange={handlechange} address={address} name="lastName"
                        type="text" placeholder="Last Name" />
                       </div>

                        <InputField handlechange={handlechange} address={address} name="email"
                        type="email" placeholder="Email Address" />
                        <InputField handlechange={handlechange} address={address} name="street"
                        type="text" placeholder="Street" />

                        <div className='grid grid-cols-2 gap-4'>
                        <InputField handlechange={handlechange} address={address} name="city"
                        type="text" placeholder="city" />
                         <InputField handlechange={handlechange} address={address} name="state"
                        type="text" placeholder="state" />     
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                        <InputField handlechange={handlechange} address={address} name="zipcode"
                        type="number" placeholder="Zip Code" />
                        <InputField handlechange={handlechange} address={address} name="country"
                        type="text" placeholder="country" />     
                        </div>

                        <InputField handlechange={handlechange} address={address} name="phone"
                        type="number" placeholder="Mobile Number" />

                        <button className='w-full mt-6  bg-primary text-white py-3
                        hover:bg-primary-dull transition  cursor-pointer uppercase'>
                              Save Address
                        </button>

                  </form>
            </div>
            <img className='md:mr-16 mt-16 md:mt-0' src={assets.add_address_iamge} alt="addaddress" />
      </div>
    </div>
  )
}

export default AddAddress