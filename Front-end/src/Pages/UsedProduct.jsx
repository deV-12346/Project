import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../Context/AppContext'
import ProductCard1 from '../Components/ProductCard1'

const Usedproducts = () => {
  const { oldproducts, searchquery } = UseAppContext()
  const [filteredproducts, setfilteredproducts] = useState([])

  useEffect(() => {
    if (searchquery.length > 0) {
      setfilteredproducts(
        oldproducts.filter((product) =>
         (product.productName || "").toLowerCase().includes(searchquery.toLowerCase())
        )
      )
    } else {
      setfilteredproducts(oldproducts)
    }
  }, [oldproducts, searchquery])

  return (
    <div className='mt-16 mx-10 my-10 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-5'>
        {filteredproducts
          .filter((product) => product)
          .map((product) => (
            <ProductCard1 key={product._id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default Usedproducts