import React from 'react';
import { categories } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 px-4">
      <p className="text-2xl md:text-3xl font-semibold mb-6">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.slice(0, 5).map((category, index) => (
          <div
            key={index}
            className="cursor-pointer py-6 px-4 rounded-lg flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 shadow-sm"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/Products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-20 h-20 object-contain mb-3"
            />
            <p className="text-base font-medium text-center">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;