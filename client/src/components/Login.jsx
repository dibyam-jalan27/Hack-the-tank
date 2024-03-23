import React from 'react'
import { FaGoogle,FaFacebookF,FaInstagram } from "react-icons/fa6";
import './css/login.css';
import { NavLink } from "react-router-dom";
function Login() {
  return (
    <div>
          <section>
    <div class="image-box">
        <img src="./login_img.png" alt=""/>
    </div>
    <div class="content-box">
        <div class="form-box active" id="login_form">
            <h2>Login</h2>
            <form action="">
                <div class="input-box">
                    <span>Email</span>
                    <input type="email" name="email"/>
                </div>
                <div class="input-box">
                    <span>Password</span>
                    <input type="password" name="password"/>
                </div>
                <div class="remember">
                    <label for="checkbox"><input type="checkbox" name="remember-me" id="checkbox"/>Remember me</label>
                </div>

                <div class="input-box">
                    <input type="submit" value="Login" name="login"/>
                </div>
                <div class="input-box">
                    <p>Don't have an account?<a href="#"> Sign up</a></p>
                </div>
                <div class="input-box">
                    <p>Forgot Password ?  <div class="login">Click Here</div></p>
                </div>
            </form>
            <h3>Follow us on</h3>
            <ul class="sci">
                <li><a href="" class="fa-brands fa-facebook-f"></a></li>
                <li><a href="" class="fa-brands fa-twitter"></a></li>
                <li><a href="" class="fa-brands fa-instagram"></a></li>
            </ul>
        </div>
        <div class="form-box" id="forget_form">
            <h2>Forget Password</h2>
            <form action="">
                <div class="input-box">
                    <span>Email</span>
                    <input type="email" name="email"/>
                </div>
                
                <div class="input-box">
                    <input type="submit" value="Send me" name="login"/>
                </div>
                <div class="input-box">
                    <p>Don't have an account?<a href="#"> Sign up</a></p>
                </div>
                <div class="input-box">
                    <p>Go to login ?  <NavLink to="/forgot">Click Here</NavLink></p>
                </div>
            </form>
            <h3>Follow us on</h3>
            <ul class="sci">
                <li><div><FaGoogle/></div></li>
                <li><div ><FaFacebookF/></div></li>
                <li><div ><FaInstagram/></div></li>
            </ul>
        </div>
    </div>
</section>
    </div>
  )
}

export default Login
   