import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../Context/AppContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard1 from '../Components/ProductCard1';
import { FaLocationArrow,  FaPhoneAlt, FaUser } from 'react-icons/fa';

const OldproductDetails = () => {
    const { oldproducts ,handleOldproductOrder } = UseAppContext()
    const navigate = useNavigate()
    const { id } = useParams()
    const [placeOrder,setPlaceOrder] = useState(false)
    const [relatedproducts, setrelatedproducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = oldproducts.find((item) => item._id === id)

  useEffect(() => {
    if (oldproducts.length > 0 && oldproducts) {
        let productCopy = oldproducts.slice()
        productCopy = productCopy.filter((item) => product.category === item.category)
        setrelatedproducts(productCopy.slice(0, 5))
    }
}, [oldproducts, product])

    useEffect(() => {
        setThumbnail(product?.images?.[0]?.url || null)
    }, [product])

    return product && (
        <div className=" sm: mx-10 my-16 md:m-16">
            <p>
                <Link to={"/"}>Home</Link>/
                <Link to={"/oldproducts"}>Products</Link> /
                <Link to={`/oldproducts/${product.category.toLowerCase()}`}>{product.category}/</Link>  
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

                    <div className="mt-6">
                        <p className="text-2xl font-medium">Rs {product.price}</p>
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
                    <div  className="flex justify-start items-center gap-3 mt-5">
                        <FaUser/> <span className=' text-xl font-sans'>{product.uploadedBy}</span> 
                    </div>
                    <div className="flex justify-start items-center gap-3 mt-5">
                        <FaPhoneAlt  /> <span className=' text-xl font-sans'>{product.mobilenumber}</span>
                    </div>
                     <div className="flex justify-start items-center gap-3 mt-5">
                        <FaLocationArrow  /><span className=' text-xl font-sans'>{product.address}</span>
                    </div>
                    { placeOrder ?
                     (
                        <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => {handleOldproductOrder(product._id,product.id)
                            ,navigate("/myorders")
                         }} className="w-50 py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Confirm Order
                        </button>
    
                         <button onClick={() => setPlaceOrder(false) } className="w-30 py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Not Yet 
                        </button>
                        </div>
                     )  

                    :   ( <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => setPlaceOrder(true) } className="w-50 py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                        </div>  )
                    }
                </div>
            </div>
            <div className='flex flex-col items-center mt-16'>
                <div className='flex flex-col items-center w-max'>
                    <p className='text-3xl font-medium'>Related Products</p>
                    <div className='w-20 h-0.5 bg-primary rounded-full mt-2'></div>
                </div>
                 <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-8 ">
                    {relatedproducts.filter((product) => product).map((product, index) =>
                        (<ProductCard1 key={index} product={product} />))}
                </div>
                <button className='mx-auto px-12 my-16 py-2.5 border rounded text-primary  cursor-pointer hover:bg-primary/10 transition' onClick={() => { navigate("/products"); scrollTo(0, 0) }}>See More</button>
            </div>
        </div>
    );
}

export default OldproductDetails