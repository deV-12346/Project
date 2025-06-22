import React from 'react'
import ProductCard from './ProductCard'
import { UseAppContext } from '../Context/AppContext'

const BestSellers = () => {
    const {products} = UseAppContext()
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
       <div className="grid ml-17  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:ml-0 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-8">
       {products.filter((product)=>product.inStock).slice(0,5).map((product,index)=>(
              <ProductCard key={index} product={product} />
      ))}
      </div>
    </div>
  )
}

export default BestSellers