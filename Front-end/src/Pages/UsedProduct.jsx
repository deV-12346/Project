import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../Context/AppContext'
import ProductCard1 from '../Components/ProductCard1'
import Pagination from '../Components/Pagination'

const Usedproducts = () => {
  const { oldproducts, searchquery } = UseAppContext()
  const [filteredproducts, setfilteredproducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const showproducts = oldproducts.filter(product => product.status === "Pending" || product.status === "Cancelled");
    
    if (searchquery.length > 0) {
      setfilteredproducts(
        showproducts.filter((product) =>
         (product.productName || "").toLowerCase().includes(searchquery.toLowerCase())
        )
      )
    } else {
      setfilteredproducts(showproducts)
    }
    // Reset to page 1 when search changes
    setCurrentPage(1)
  }, [oldproducts, searchquery])

  // Pagination calculations
  const totalPages = Math.ceil(filteredproducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredproducts.slice(startIndex, endIndex);

  return  (
    <div className='mt-20 mx-4 sm:mx-6 md:mx-10 my-10 flex flex-col'>
      {/* Header */}
      <div className='flex flex-col mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Used Products</h1>
        <p className='text-gray-500 mt-1'>
          {filteredproducts.length} {filteredproducts.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentProducts.map((product) => (
              <ProductCard1 key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredproducts.length}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500">
            {searchquery 
              ? `No products match "${searchquery}". Try adjusting your search.`
              : 'No used products are currently available.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default Usedproducts