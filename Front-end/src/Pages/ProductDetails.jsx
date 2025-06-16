import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../Context/AppContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../Components/ProductCard';

const ProductDetails = () => {
    const { products, addtocart } = UseAppContext()
    const navigate = useNavigate()
    const { id } = useParams()

    const [relatedproducts, setrelatedproducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id)

  useEffect(() => {
    if (products.length > 0 && product) {
        let productCopy = products.slice()
        productCopy = productCopy.filter((item) => product.category === item.category)
        setrelatedproducts(productCopy.slice(0, 5))
    }
}, [products, product])

    useEffect(() => {
        setThumbnail(product?.images?.[0]?.url || null)
    }, [product])

    return product && (
        <div className=" sm: mx-10 my-16 md:m-16">
            <p>
                <Link to={"/"}>Home</Link>/
                <Link to={"/products"}>Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}>{product.category}</Link>  
                <span className="text-indigo-500"> {product.productName}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.images.map((img, index) => (
                            <div key={index} onClick={() => setThumbnail(img.url)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={img.url} alt={`Thumbnail ${index + 1}`}  />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100  rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.productName}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            <img src={i < 4 ? assets.star_icon : assets.star_dull_icon} className='md:w-4 w:3.5' />
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: Rs{product.productPrice}</p>
                        <p className="text-2xl font-medium">MRP: Rs {product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500">
                        {Array.isArray(product.productDescription) ? (
                            product.productDescription.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))
                        ) : (
                            product.productDescription.split('.').map((line, index) => (
                                line.trim() && <li key={index}>{line.trim()}.</li>
                            ))
                        )}
                    </ul>
                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => addtocart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => { addtocart(product._id); navigate("/cart") }} className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center mt-16'>
                <div className='flex flex-col items-center w-max'>
                    <p className='text-3xl font-medium'>Related Products</p>
                    <div className='w-20 h-0.5 bg-primary rounded-full mt-2'></div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-8 ">
                    {relatedproducts.filter((product) => product).map((product, index) =>
                        (<ProductCard key={index} product={product} />))}
                </div>
                <button className='mx-auto px-12 my-16 py-2. 5 border rounded text-primary  cursor-pointer hover:bg-primary/10 transition' onClick={() => { navigate("/products"); scrollTo(0, 0) }}>See More</button>
            </div>
        </div>
    );
}

export default ProductDetails