import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../Context/AppContext'
import ProductCard from '../Components/ProductCard'

const Allproducts = () => {
  const { products, searchquery } = UseAppContext()
  const [filteredproducts, setfilteredproducts] = useState([])

  useEffect(() => {
    if (searchquery.length > 0) {
      setfilteredproducts(
        products.filter((product) =>
         (product.productName || "").toLowerCase().includes(searchquery.toLowerCase())
        )
      )
    } else {
      setfilteredproducts(products)
    }
  }, [products, searchquery])

  return (
    <div className='mt-16 mx-10 my-10 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-5'>
        {filteredproducts
          .filter((product) => product.inStock)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default Allproducts