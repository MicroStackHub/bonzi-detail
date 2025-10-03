import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <Image src="/BonziLogo.png" alt="BonziCart Logo" width={60} height={60} className="mb-2" />
          <span className="text-2xl font-bold text-orange-600 mt-2">BonziCart</span>
        </div>
        <div className="flex w-full justify-center mb-6">
          <Link href="/login" className={`font-medium px-4 pb-1 focus:outline-none ${router.pathname === '/login' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 border-b-2 border-transparent hover:text-orange-500'}`}>
            SIGN IN
          </Link>
          <Link href="/register" className={`font-medium px-4 pb-1 ml-4 focus:outline-none ${router.pathname === '/register' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 border-b-2 border-transparent hover:text-orange-500'}`}>
            REGISTER
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-4">
          <input type="email" placeholder="Email address" className="border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-orange-500" required />
          <input type="password" placeholder="Password" className="border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-orange-500" required />
          <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold py-2 rounded mt-2 hover:from-orange-600 hover:to-orange-500 transition-colors">Sign In</button>
        </form>
        <div className="w-full flex flex-col items-center mt-2">
          <span className="text-gray-500 text-sm mb-2">Sign in With</span>
          <button className="flex items-center justify-center border border-gray-300 rounded-full w-12 h-12 text-2xl text-orange-500 hover:bg-orange-50 transition-colors">
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
}