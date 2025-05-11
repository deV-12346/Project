import React from 'react'
import { UseAppContext } from '../Context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../Components/ProductCard'

const ProductCategories = () => {
  const { products } = UseAppContext()
  const { category } = useParams()

  const searchcategory = categories.find(
    (item) => item.path.toLowerCase() === category
  )

  const filteredProducts = products.filter(
    (product) => (product.category || "").toLowerCase() === category
  )

  return (
    <div className='mt-16 mx-10 my-10'>
      {searchcategory && (
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium'>{searchcategory.text.toUpperCase()}</p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 md:gap-6'>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-2xl font-medium text-primary'>
            No product found in this category
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductCategories