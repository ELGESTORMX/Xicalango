import React from 'react';
import Navbar from '../components/landing/navbar';
import Footer from '../components/footer';
export default function LandingLayout({ children }) {
  return (
    <div className='min-h-screen bg-gray-50'>
          <Navbar/>
            {children}
          <Footer/>
        </div>
  );
}
