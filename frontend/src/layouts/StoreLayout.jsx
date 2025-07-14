import React from 'react';
import Navbar from '../components/store/navbar';
import Footer from '../components/footer';

export default function LayoutStore({ children }) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar/>
      
      {/* Espaciado para el navbar fijo */}
      <div className='pt-20'>
        {children}
      </div>
      {/* Footer */}
      <Footer/>
    </div>
  );
}
