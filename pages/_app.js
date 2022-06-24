import { useState, useEffect } from 'react';
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subtotal,setSubtotal] = useState(0);
  const [user,setUser] = useState({value : null});
  const [key,setKey] = useState(0);

  useEffect(() => {
   try {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem("cart")));
      saveCart(JSON.parse(localStorage.getItem("cart")))
     }
   } catch (error) {
    console.log(error);
    localStorage.clear();
   }
   const token = localStorage.getItem('token');
   if(token){
    setUser({value: token});
    setKey(Math.random());
   }

  }, [router.query])
  

  const saveCart = (myCart)=>{
    localStorage.setItem("cart",JSON.stringify(myCart));
    let subT = 0;
    let keys = Object.keys(myCart);
    for (let index = 0; index < keys.length; index++) {
      subT += myCart[keys[index]].price * myCart[keys[index]].qty;
    }
    setSubtotal(subT);
  }

  const buyNow = (itemCode,qty,price,name,size,variant)=>{
    let newCart = {itemCode:{qty: 1,price,name,size,variant}};
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout');
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
    toast.success('Added to Cart', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const logout = ()=>{
    localStorage.removeItem('token');
    setKey(Math.random());
    setUser({value: null});
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
  
  return <><NavBar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
  <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
  <Footer />
  </>
}

export default MyApp
