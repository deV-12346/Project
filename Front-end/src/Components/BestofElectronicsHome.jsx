import React from "react";
import { useParams } from "react-router-dom";
import {electroniclist, earbudss,smartwatches,speakers,wiredearphones} from "../assets/assets";

const BestofElectronicsHome = () => {
  const { id } = useParams();

  // Check if the clicked product is a single product or 'Buy Laptop' category
  const product = products.find((item) => item.id.toString() === id);

  // If ID is '0' (Buy Laptop), show the laptop list
  if (id === "4") {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Available Laptops</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {earbudss.map((earbud) => (
            <div key={earbud.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <img
                src={earbud.image}
                alt={earbud.name}
                className="w-full h-32 rounded-md object-cover"
              />
              <h2 className="mt-2 font-semibold text-sm text-center">{earbud.name}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (id === "5") {
      return (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Available Mobiles</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {smartwatches.map((smartwatch) => (
              <div key={mobile.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <img
                  src={smartwatch.image}
                  alt={smartwatch.name}
                  className="w-full h-32 rounded-md object-cover"
                />
                <h2 className="mt-2 font-semibold text-sm text-center">{smartwatch.name}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (id === "6") {
      return (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Available Mobiles</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-32 rounded-md object-cover"
                />
                <h2 className="mt-2 font-semibold text-sm text-center">{speaker.name}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (id === "7") {
      return (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Available Mobiles</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wiredearphones.map((wiredearphone) => (
              <div key={earphone.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <img
                  src={wiredearphone.image}
                  alt={wiredearphone.name}
                  className="w-full h-32 rounded-md object-cover"
                />
                <h2 className="mt-2 font-semibold text-sm text-center">{wiredearphone.name}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    }

  // If the product does not exist, show an error message
  if (!electroniclist) {
    return <h1 className="text-red-500 text-center mt-10">Product Not Found</h1>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <img
        src={electroniclist.image}
        alt={electroniclist.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-4">{electroniclist.name}</h2>
      <p className="text-gray-600 mt-2">This is a detailed view of the product.</p>
    </div>
  );
};

export default BestofElectronicsHome;