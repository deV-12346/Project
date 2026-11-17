import React, { useEffect, useState } from 'react';
import { UseAppContext } from '../Context/AppContext';
import ProductCard from '../Components/ProductCard';
import Pagination from '../Components/Pagination';

const Allproducts = () => {
  const { products, searchquery } = UseAppContext();
  const [filteredproducts, setfilteredproducts] = useState([]);
  const [showfilterfrom, setshowfilterform] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceMax, setPriceMax] = useState(200000);
  const [maxPossiblePrice, setMaxPossiblePrice] = useState(200000);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Apply filters and search
  useEffect(() => {
    let filterproduct = products;

    // Filter by search query
    if (searchquery.length > 0) {
      filterproduct = filterproduct.filter((product) =>
        (product.productName || '').toLowerCase().includes(searchquery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filterproduct = filterproduct.filter((product) => product.category === selectedCategory);
    }

    // Filter by price
    filterproduct = filterproduct.filter((product) => Number(product.offerPrice) <= priceMax);

    // Filter by stock
    filterproduct = filterproduct.filter((product) => product.inStock);

    setfilteredproducts(filterproduct);
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [products, searchquery, selectedCategory, priceMax]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredproducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredproducts.slice(startIndex, endIndex);

  return (
    <div className="mt-20 px-4 sm:px-6 md:px-10 mb-10 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-500 mt-1">
            {filteredproducts.length} {filteredproducts.length === 1 ? 'product' : 'products'} available
          </p>
        </div>

        <button
          onClick={() => setshowfilterform(!showfilterfrom)}
          className="bg-primary w-full sm:w-auto px-6 py-3 text-white rounded-lg hover:bg-primary/80 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          {showfilterfrom ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Form */}
      {showfilterfrom && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 mb-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
            {/* Category Filter */}
            <div className="flex flex-col flex-1">
              <label className="mb-2 font-semibold text-gray-700 text-sm">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-white"
              >
                <option value="">All Categories</option>
                {['Laptop', 'Mobile', 'Earbuds', 'Headphone', 'SmartWatch', 'WiredEarphone', 'Speakers'].map(
                  (item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col flex-1">
              <label className="mb-2 font-semibold text-gray-700 text-sm">
                Max Price: <span className="text-primary">₹{priceMax.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="0"
                max={maxPossiblePrice}
                value={priceMax}
                onChange={(e) => setPriceMax(+e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹{maxPossiblePrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCategory('');
                setPriceMax(maxPossiblePrice);
              }}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
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
              ? `No products match "${searchquery}". Try adjusting your search or filters.`
              : 'Try adjusting your filters to see more products.'}
          </p>
          {(searchquery || selectedCategory || priceMax !== maxPossiblePrice) && (
            <button
              onClick={() => {
                setSelectedCategory('');
                setPriceMax(maxPossiblePrice);
              }}
              className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-all duration-200"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Allproducts;