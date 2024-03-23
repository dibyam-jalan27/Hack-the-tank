import React from 'react'
import '../components/css/NavBar.css';
function NavBar() {
  return (
    <div>
      <header className="header">

    <div className="header-1">

        <a href="#" className="logo"> <img src="./rajaranilogo.webp" alt="" /> </a>

        <form action="" className="search-form">
            <input type="search" name="" placeholder="search here..." id="search-box" />
            <label for="search-box" className="fas fa-search"></label>
        </form>

        <div className="icons">
            <div id="search-btn" className="fas fa-search"></div>
            <div id="login-btn" className="fas fa-user"></div>
        </div>

    </div>

    <div className="header-2">
        <nav className="navbar">
            <a href="#home">home</a>
            <a href="#featured">featured</a>
            <a href="#arrivals">arrivals</a>
            <a href="#reviews">reviews</a>
            <a href="#blogs">blogs</a>
        </nav>
    </div>

</header>

<nav className="bottom-navbar">
    <a href="#home" className="fas fa-home"></a>
    <a href="#featured" className="fas fa-list"></a>
    <a href="#arrivals" className="fas fa-tags"></a>
    <a href="#reviews" className="fas fa-comments"></a>
    <a href="#blogs" className="fas fa-blog"></a>
</nav>

    </div>
  )
}

export default NavBar
