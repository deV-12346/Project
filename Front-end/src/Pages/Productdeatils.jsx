import React from "react";
import { useParams } from "react-router-dom";
import { products, laptoplist, mobilelist,earphones ,cars} from "../assets/assets";

const ProductDetail = () => {
  const { id } = useParams();

  // Check if the clicked product is a single product or 'Buy Laptop' category
  const product = products.find((item) => item.id.toString() === id);

  // If ID is '0' (Buy Laptop), show the laptop list
  if (id === "0") {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Available Laptops</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {laptoplist.map((laptop) => (
            <div key={laptop.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <img
                src={laptop.image}
                alt={laptop.name}
                className="w-full h-32 rounded-md object-cover"
              />
              <h2 className="mt-2 font-semibold text-sm text-center">{laptop.name}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (id === "1") {
      return (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Available Mobiles</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mobilelist.map((mobile) => (
              <div key={mobile.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <img
                  src={mobile.image}
                  alt={mobile.name}
                  className="w-full h-32 rounded-md object-cover"
                />
                <h2 className="mt-2 font-semibold text-sm text-center">{mobile.name}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (id === "2") {
      return (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Available Cars</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cars.map((car) => (
              <div key={car.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-32 rounded-md object-cover"
                />
                <h2 className="mt-2 font-semibold text-sm text-center">{car.name}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (id === "3") {
      return (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Available earphones</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {earphones.map((earphone) => (
              <div key={earphone.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <img
                  src={earphone.image}
                  alt={earphone.name}
                  className="w-full h-32 rounded-md object-cover"
                />
                <h2 className="mt-2 font-semibold text-sm text-center">{earphone.name}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    }

  // If the product does not exist, show an error message
  if (!product) {
    return <h1 className="text-red-500 text-center mt-10">Product Not Found</h1>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2">This is a detailed view of the product.</p>
    </div>
  );
};

export default ProductDetail;