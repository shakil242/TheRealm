import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Layout({ children }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet /> 
        {children} 
      </div>
      <div>
        <Footer /> 
      </div>
    </div>
  );
}

export default Layout;