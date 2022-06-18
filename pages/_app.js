import { useState, useEffect } from 'react';
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subtotal,setSubtotal] = useState(0);

  useEffect(() => {
   try {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem("cart")));
     }
   } catch (error) {
    console.log(error);
    localStorage.clear();
   }

  }, [])
  

  const saveCart = (myCart)=>{
    localStorage.setItem("cart",JSON.stringify(myCart));
    let subT = 0;
    let keys = Object.keys(myCart);
    for (let index = 0; index < keys.length; index++) {
      subT += myCart[keys[index]].price * myCart[keys[index]].qty;
    }
    setSubtotal(subT);
  }

  const addToCart = (itemCode,qty,price,name,size,variant)=>{
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else{
      newCart[itemCode] = {qty: 1, price, name, size, variant}
    }
    setCart(newCart);
    saveCart(newCart);
  }
  
  const removeFromCart = (itemCode,qty,price,name,size,variant)=>{
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if(newCart[itemCode]["qty"]<= 0){
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const clearCart = ()=>{
    setCart({});
    saveCart({})
  }
  
  return <><NavBar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
  <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
  <Footer />
  </>
}

export default MyApp
