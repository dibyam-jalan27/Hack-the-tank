import React from 'react'
import Navbar from "./NavBar";
import Footer from './Footer';

function Layout(props) {
  return (
    <div>
      <Navbar/>
      {props.children}
      
      <Footer/>
  
    </div>
  )
}

export default Layout
