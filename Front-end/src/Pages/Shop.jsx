import React, { useEffect, useState } from 'react';
import { UseAppContext } from '../Context/AppContext';
import ProductCard from '../Components/ProductCard';

const Allproducts = () => {
  const { products, searchquery } = UseAppContext();
  const [filteredproducts, setfilteredproducts] = useState([]);
  const [showfilterfrom, setshowfilterform] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceMax, setPriceMax] = useState(200000);
  const [maxPossiblePrice, setMaxPossiblePrice] = useState(200000);

  useEffect(() => {
    if (searchquery.length > 0) {
      setfilteredproducts(
        products.filter((product) =>
          (product.productName || '').toLowerCase().includes(searchquery.toLowerCase())
        )
      );
    } else {
      setfilteredproducts(products);
    }
    let filterproduct = products;
    if (selectedCategory) {
      filterproduct = filterproduct.filter((product) => product.category === selectedCategory);
    }
     filterproduct = filterproduct.filter((product) => Number(product.offerPrice) <= priceMax);
    setfilteredproducts(filterproduct);
  }, [products, searchquery, selectedCategory, priceMax]);

  return (
    <div className="mt-16 px-4 sm:px-6 md:px-10 mb-10 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p className="text-2xl font-medium uppercase">All Products</p>

        <button
          onClick={() => setshowfilterform(!showfilterfrom)}
          className="bg-primary w-full sm:w-auto px-4 py-2 text-white rounded hover:bg-primary/70 transition"
        >
          {showfilterfrom ? 'Hide Filter' : 'Apply Filter'}
        </button>
      </div>

      {showfilterfrom && (
        <div className="bg-gray-100 p-4 mt-4 rounded-lg flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded border"
            >
              <option value="">All</option>
              {['Laptop', 'Mobile', 'Earbuds', 'Headphone', 'SmartWatch', 'WiredEarphone', 'Speakers'].map(
                (item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <label className="mb-1 font-medium">Max Price: ₹{priceMax}</label>
            <input
              type="range"
              min="0"
              max={maxPossiblePrice}
              value={priceMax}
              onChange={(e) => setPriceMax(+e.target.value)}
              className="w-full sm:w-60"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-8">
        {filteredproducts
          .filter((product) => product.inStock)
          .map((product) => (
            <div key={product._id} className="flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Allproducts;