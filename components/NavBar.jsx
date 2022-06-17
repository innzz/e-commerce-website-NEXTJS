import Image from 'next/image'
import React from 'react';
import {GrCart} from 'react-icons/gr';
import {ImCross} from 'react-icons/im';
import { useRef } from 'react';
import Link from 'next/link';
import {AiFillPlusCircle, AiFillMinusCircle} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs'

function NavBar() {
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
    <div className='shadow-md '>
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
    <div onClick={toggleCart} className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
      <button  className="inline-flex items-center bg-gray-100 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Go to
       <GrCart style={{marginLeft: '8px'}} />
      </button>
    </div>
  </div>
</header >
    <div ref={ref} className="sideCart z-10 w-80 h-full absolute bg-green-100 top-0 right-0 py-10 px-6 transform transition-transform translate-x-full">
      <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
      <span onClick={toggleCart} className="absolute top-5 right-4 cursor-pointer text-xl"><ImCross /></span>
      <ol className='list-decimal font-semibold'>
        <li>
          <div className="item flex my-5">
          <div className='w-2/3 font-semibold'>Tshirts - Wear cool Tshirts</div>
          <div className='w-1/3 flex justify-center items-center font-semibold text-lg'><AiFillMinusCircle className='cursor-pointer text-green-800' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-green-800'/></div>
          </div>
        </li>
        <li>
          <div className="item flex my-5">
          <div className='w-2/3 font-semibold'>Tshirts - Wear cool Tshirts</div>
          <div className='w-1/3 flex justify-center items-center font-semibold text-lg'><AiFillMinusCircle className='cursor-pointer text-green-800' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-green-800'/></div>
          </div>
        </li>
        <li>
          <div className="item flex my-5">
          <div className='w-2/3 font-semibold'>Tshirts - Wear cool Tshirts</div>
          <div className='w-1/3 flex justify-center items-center font-semibold text-lg'><AiFillMinusCircle className='cursor-pointer text-green-800' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-green-800'/></div>
          </div>
        </li>
        <li>
          <div className="item flex my-5">
          <div className='w-2/3 font-semibold'>Tshirts - Wear cool Tshirts</div>
          <div className='w-1/3 flex justify-center items-center font-semibold text-lg'><AiFillMinusCircle className='cursor-pointer text-green-800' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-green-800'/></div>
          </div>
        </li>
      </ol>
      <button className="flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-sm"><BsFillBagCheckFill className='m-1'/>Checkout</button>
    </div>
    </div>
  )
}

export default NavBar