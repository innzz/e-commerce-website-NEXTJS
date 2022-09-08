import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Order from '../models/Order';
import mongoose from 'mongoose';

function MyOrder({cart,addToCart,removeFromCart,clearCart,subtotal,order, paymentStatus}) {
  let router = useRouter();
  let products = order.products;
  // console.log(products)
  
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">JhuluLulu.com</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: {order.orderId}</h1>
        <p className="leading-relaxed mb-4">Your order has been successfully placed. Your Payment Status is: {order.status}</p>
        <div className="flex mb-4">
          <a className="flex-grow text-center  text-green-500   py-2 text-lg px-1">Description</a>
          <a className="flex-grow text-center  border-gray-300 py-2 text-lg px-1">Reviews</a>
          <a className="flex-grow text-center  border-gray-300 py-2 text-lg px-1">Details</a>
        </div>
        {Object.keys(products).map((key,i)=>{
          return (
          <div key={i} className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
            <span className="ml-auto text-gray-900">{products[key].qty}</span>
            <span className="ml-auto text-gray-900">₹{products[key].price}</span>
          </div>
          )
        })}
        {/* <div className="flex border-t border-gray-200 py-2">
        <span className="text-gray-500">Puma (Xl/Black)</span>
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">499</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
        <span className="text-gray-500">Puma (Xl/Black)</span>
          <span className="ml-auto text-gray-900">1</span>
          <span className="ml-auto text-gray-900">499</span>
        </div> */}
        <div className="flex flex-col">
          <span className="title-font font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount}</span>
          <button className="flex my-2 mr-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Track Order</button>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
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
const data = {orderId: context.query.orderId};
let paymentRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, {
  method: "POST", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
let paymentResJson = await paymentRes.json();
let order = await Order.findOne({orderId: context.query.orderId});

  return {
    props: {order: JSON.parse(JSON.stringify(order)), paymentStatus: paymentResJson}, // will be passed to the page component as props
  }
}

export default MyOrder