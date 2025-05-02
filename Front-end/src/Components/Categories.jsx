import React from 'react'
import { categories } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate = useNavigate()
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-col-4  mt-6 gap-8'>
      {categories.map((category,index)=>(
      <div key={index} className='gruop cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col 
      justify-center items-center h-40 w-60 bg-gray-100' style={{backgroundColor:category.bgColor}}
      onClick={()=> {navigate(`/Products/${category.path.toLowerCase()}`)
       scrollTo(0,0)
      }}>
           <img src={category.image} alt={category.text} className='hover:scale-108 h-30 w-50 transition max-w-45 max-h-45' />
           <p className='text-sm font-medium'>{category.text}</p>
     </div>
      ))}

      </div>
      </div>
  )
}

export default Categories