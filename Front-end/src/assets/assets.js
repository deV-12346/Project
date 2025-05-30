import laptop from './laptop.jpg'
import mobile from './mobile.jpg'
import headphone from './headphone.jpg'
import earbuds from './Earbuds.jpg'
import smartwatch from './smartwatch.jpg'
import speaker from './speaker.jpg'
import earphone from './earphone.jpg'
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import remove_icon from "./remove_icon.svg";
import add_address_iamge from "./add_address_image.svg";
export const assets = {
     star_icon,
     star_dull_icon,
     cart_icon,
     remove_icon,
     arrow_right_icon_colored,
     add_address_iamge
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
export const productcategoriescategories = [
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
]
export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
  {
    _id: "67b5b9e54ea97f71bbc196a9",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "G",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New Ssdfdgdg",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

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