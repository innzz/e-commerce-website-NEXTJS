import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [])
  

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = {email,password};
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const response = await res.json();
    // console.log(response);
    setEmail('');
    setPassword('');
    if (response.success) {
      localStorage.setItem('token', response.token);
      toast.success('Successfully logged in.', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_HOST}`)
        }, 1000);
    }
    else{
      toast.error(response.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

  const handleChange = (e)=>{
      if (e.target.name === 'email') {
        setEmail(e.target.value);
      }
      else if (e.target.name === 'password') {
        setPassword(e.target.value);
      }
  }
  return (
    <div>
<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
<ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
  <div className="max-w-md w-full space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Workflow" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or
        <Link href={'/signup'}><a className="font-medium text-green-600 hover:text-green-500"> Signup</a></Link>
      </p>
    </div>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Email address" />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Password" />
        </div>
      </div>

      <div className="flex items-center justify-between">

        <div className="text-sm">
          <Link href={'/forgot'}><a className="font-medium text-green-600 hover:text-green-500"> Forgot your password? </a></Link>
        </div>
      </div>

      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default Login