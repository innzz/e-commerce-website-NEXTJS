import Image from 'next/image'
import React from 'react';
import {GrCart} from 'react-icons/gr';
import {ImCross} from 'react-icons/im';
import { useRef } from 'react';
import Link from 'next/link';
import {AiFillPlusCircle, AiFillMinusCircle} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs';
import {MdAccountCircle} from 'react-icons/md'

function NavBar({cart,addToCart,removeFromCart,clearCart,subtotal}) {
  const ref = useRef();


  const toggleCart = ()=>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('transalte-x-0');
    }
    else if(!ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');
    }
  }
  return (
    <div className='shadow-md sticky top-0 bg-white z-10'>
<header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto font-bold">
      <Link href={'/tshirts'}><a className="mr-5 hover:text-gray-900 cursor-pointer">Tshirts</a></Link>
      <Link href={'/hoodies'}><a className="mr-5 hover:text-gray-900 cursor-pointer">Hoodies</a></Link>
      <Link href={'/stickers'}><a className="mr-5 hover:text-gray-900 cursor-pointer">Stickers</a></Link>
      <Link href={'/mugs'}><a className="hover:text-gray-900 cursor-pointer">Mugs</a></Link>
    </nav>
    <Link href={'/'}>
    <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center cursor-pointer text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <Image src={'/logo.png'} alt={'Logo'} height={60} width={60} />
    </a>
    </Link>
    <div  className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
      <Link href={'/login'}><MdAccountCircle className='mx-3 mt-4 md:mt-0 cursor-pointer'  size={33}/></Link>
      <button onClick={toggleCart} className="inline-flex items-center bg-gray-100 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Go to
       <GrCart style={{marginLeft: '8px'}} />
      </button>
    </div>
  </div>
</header >
    <div ref={ref} className="sideCart z-10 w-80 h-[100vh] absolute bg-green-100 top-0 right-0 py-10 px-6 transform transition-transform translate-x-full">
      <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
      <span onClick={toggleCart} className="absolute top-5 right-4 cursor-pointer text-xl"><ImCross /></span>
      <ol className='list-decimal font-semibold'>
        {Object.keys(cart).length == 0 && <div className="my-4 font-semibold">Your cart is empty.</div>}
        {Object.keys(cart).map((k)=>{
          return (<li key={k}>
            <div className="item flex my-5">
            <div className='w-2/3 font-semibold'>{cart[k].name}</div>
            <div className='w-1/3 flex justify-center items-center font-semibold text-lg'><AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='cursor-pointer text-green-800' /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={()=> addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)} className='cursor-pointer text-green-800'/></div>
            </div>
          </li>)
        })}
      </ol>
      <div className="total font-bold my-2">Subtotal: ₹{subtotal}</div>
      <div className="flex">
      <button className="flex mr-2 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-sm" onClick={clearCart}>Clear Cart</button>
      <Link href={'/checkout'}><a><button className="flex mx-2 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-sm"><BsFillBagCheckFill className='m-1'/>Checkout</button></a></Link>
      </div>
    </div>
    </div>
  )
}

export default NavBar