import React from 'react';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
          About Our Marketplace
        </h1>
        <p className="text-lg mb-4">
          Welcome to our online marketplace, where buyers can easily come  in one platform to discover a wide range of products. Whether you're shopping for electronics, home goods, or fashion, we have something for everyone. Our goal is to make shopping an easy and enjoyable experience, with a vast selection of trusted products and great deals.
        </p>
        <p className="text-lg mb-4">
          Our platform is designed with you in mind, offering a smooth user experience, secure transactions, and a variety of payment options. We provide sellers with a powerful platform to showcase their products, and buyers can enjoy the convenience of shopping from anywhere at any time.
        </p>
        <p className="text-lg mb-4">
          At Our Marketplace, we value transparency, customer satisfaction, and innovation. We are committed to building a marketplace that is accessible to all, where everyone can find what they need and more. Our customer support team is always ready to assist you with any inquiries or issues you may have.
        </p>
        <h2 className="text-2xl font-semibold text-blue-700 mt-8 mb-4">
          Our Vision
        </h2>
        <p className="text-lg mb-4">
          To become the most trusted and user-friendly marketplace where buyers  can meet, transact, and build long-lasting relationships. We believe in making e-commerce accessible and affordable for everyone.
        </p>
        <h2 className="text-2xl font-semibold text-blue-700 mt-8 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-disc pl-6">
          <li className="text-lg mb-2">Wide range of products across various categories</li>
          <li className="text-lg mb-2">Secure and fast payment methods</li>
          <li className="text-lg mb-2">Reliable customer support</li>
          <li className="text-lg mb-2">Easy returns and exchanges</li>
        </ul>
      </div>
      <div className='flex items-center justify-center'><Link to={'/'} className='pb-10 text-2xl text-blue-900 hover:underline'>Back To home</Link></div>
    </div>
  );
};

export default About;