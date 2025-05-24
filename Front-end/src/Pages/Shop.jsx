import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../Context/AppContext'
import ProductCard from '../Components/ProductCard'
const Allproducts = () => {
  const { products, searchquery } = UseAppContext()
  const [filteredproducts, setfilteredproducts] = useState([])
  const [showfilterfrom,setshowfilterform] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceMax, setPriceMax] = useState(200000)
  const [maxPossiblePrice, setMaxPossiblePrice] = useState(200000)

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
    if(selectedCategory){
      let filterproduct = products
      filterproduct = filterproduct.filter(product =>product.category === selectedCategory)
      filterproduct = filterproduct.filter(product=>product.offerPrice <= priceMax)
      setfilteredproducts(filterproduct)
    }
  }, [products, searchquery,selectedCategory,priceMax])

  return (
    <div className='mt-16 mx-10 my-10 flex flex-col'>
      <div className='flex justify-between items-center  w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
       
      { !showfilterfrom ? 
       <button onClick={()=>setshowfilterform(true)} className="bg-primary ml-5  px-4 py-2 cursor-pointer text-white hover:bg-primary/50">Apply Filter</button>
        :
        <button onClick={()=>setshowfilterform(false)} className="bg-primary ml-5  px-4 py-2 cursor-pointer text-white hover:bg-primary/50">Hide Filter</button>
      }
         { showfilterfrom && (
        <div className='bg-gray-100 p-4 ml-5  rounded-lg  flex gap-6'>
        
          <div>
            <label className='block mb-1 font-medium'>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='p-2 rounded border'
            >
              <option value=''>All</option>
               {['Laptop', 'Mobile', 'Earbuds',"Headphone","SmartWatch","WiredEarphone" ,"Speakers"].map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 font-medium'>
              Max Price: ₹{priceMax}
            </label>
            <input
              type='range'
              min='0'
              max={maxPossiblePrice}
              value={priceMax}
              onChange={(e) => setPriceMax(+e.target.value)}
              className='w-60'
            />
          </div>
        </div>
        
      )}

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