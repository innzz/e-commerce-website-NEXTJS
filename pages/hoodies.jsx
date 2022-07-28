import React from 'react';
import Link from 'next/link';
import mongoose, { connect } from "mongoose";
import Product from "../models/Product";

function Hoodies({products}) {
  return (
    <div>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      {Object.keys(products).length == 0 && <p>Np products available</p>}
      {Object.keys(products).map((item)=>{
        const colors = products[item].color;
        const sizes = products[item].size;
        return (<Link key={products[item]._id} href={`/product/${products[item].slug}`}>
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-md m-5">
        <a className="block relative rounded overflow-hidden">
          <img alt="ecommerce" className="m-auto h-[40vh] md:h-[50vh] block" src={products[item].img}/>
        </a>
        <div className="mt-4 text-center md:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].title}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].desc}</h2>
          <p className="mt-1">₹{products[item].price}</p>
          <div className="mt-1">
            {sizes.map((val,i)=>{
              return (
                <span key={i} className='border border-gray-300 px-1 mx-1'>{val}</span>
              )
            })}
            {/* {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
            {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
            {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
            {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
            {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>} */}
          </div>
          <div className="mt-1">
            {colors.map((val,i)=>{
              return (<button key={i} className={`border-2 border-gray-300 ml-1 bg-${val}-500 rounded-full w-6 h-6 focus:outline-none`}></button>)
            })}
          </div>
        </div>
      </div>
      </Link>)
      })}
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
}
let products = await Product.find({category: 'hoodies'});
let hoodies = {};
    for(let item of products){
        if (item.title in hoodies) {
            if (!hoodies[item.title].color.includes(item.color) && item.available > 0) {
                hoodies[item.title].color.push(item.color);
            }
            if (!hoodies[item.title].size.includes(item.size) && item.available > 0) {
                hoodies[item.title].size.push(item.size);
            }
        }
        else{
            hoodies[item.title] = JSON.parse(JSON.stringify(item));
            if(item.available > 0){
                hoodies[item.title].color = [item.color];
                hoodies[item.title].size = [item.size];
            }
        }
    }
  return {
    props: {products: JSON.parse(JSON.stringify(hoodies))}, // will be passed to the page component as props
  }
}

export default Hoodies