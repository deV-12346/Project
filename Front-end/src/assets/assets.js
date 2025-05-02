import laptop from './laptop.jpg'
import mobile from './mobile.jpg'
import car from './car.jpg'
import headphone from './headphone.jpg'
import phone from './phone.png'
import earbuds from './earbuds.jpg'
import smartwatch from './smartwatch.jpg'
import speaker from './speaker.jpg'
import earphone from './earphone.jpg'
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
export const assets = {
     star_icon,
     star_dull_icon,
     cart_icon
}
export const categories = [
      {   
          text:"Laptop",
          path: "laptop",
          image: laptop,
      },
      {   
            text:"Mobile Phone",
            path: "mobile",
            image: mobile,
        },
        {   
            text:"Car",
            path: "car",
            image: car,
        },
        {   
            text:"Headphone",
            path: "headphone",
            image: headphone,
        },
    {   
           text:"Earbuds",
           path: "earbuds",
           image: earbuds,
    },
    {   
           text:"SmartWatch",
           path: "smartwatch",
          image: smartwatch,
      },
      {   
          text:"Speaker",
          path: "Speakers",
          image: speaker,
      },
      {   
          text:"Wired Earphones",
          path: "wiredarphones",
          image: earphone,
      },
]
export const dummyProducts = [
    {
      _id: "gd46g23h",
      name: "Lenovo thinkpad",
      category: "Laptop",
      price: 50000,
      offerPrice: 2000,
      image: laptop,
      description: [
        "Fresh and organic",
        "Rich in carbohydrates",
        "Ideal for curries and fries",
      ],
      createdAt: "2025-03-25T07:17:46.018Z",
      updatedAt: "2025-03-25T07:18:13.103Z",
      inStock: true,
    },
    {
      _id: "gd47g34h",
      name: "Iphone 16",
      category: "Mobile",
      price: 78000,
      offerPrice: 5000,
      image: mobile,
      description: [
        "Juicy and ripe",
        "Rich in Vitamin C",
        "Perfect for salads and sauces",
        "Farm fresh quality",
      ],
      createdAt: "2025-03-25T07:17:46.018Z",
      updatedAt: "2025-03-25T07:18:13.103Z",
      inStock: true,
    },
]