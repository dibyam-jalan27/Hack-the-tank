import React from 'react'
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";
import './css/login.css';
import { NavLink } from "react-router-dom";
function Login() {

    return (
                <div>
            <section>
                <div class="image-box">
                    <img src="./login_img.png" alt="" />
                </div>
                <div class="content-box">
                    <div class="form-box active" id="login_form">
                        <h2>Login</h2>
                        <form action="">
                            <div class="input-box">
                                <span>Email</span>
                                <input type="email" name="email" />
                            </div>
                            <div class="input-box">
                                <span>Password</span>
                                <input type="password" name="password" />
                            </div>
                            <div class="remember">
                                <label for="checkbox"><input type="checkbox" name="remember-me" id="checkbox" />Remember me</label>
                            </div>

                            <div class="input-box">
                                <input type="submit" value="Login" name="login" />
                            </div>
                            <div class="input-box">
                                <p>Don't have an account?<NavLink to="/signup">Click Here</NavLink></p>
                            </div>
                            <div class="input-box">
                                <p>Forgot Password ?  <NavLink to="/forgot">Click Here</NavLink></p>
                            </div>
                        </form>
                        <h3>Follow us on</h3>
                        <ul class="sci">
                        <li><a href='https://www.youtube.com/@rajaranicoaching' target='_blank'><FaYoutube /></a></li>
                            <li><a href='https://www.facebook.com/rajaranicoaching' target='_blank'><FaFacebookF /></a></li>
                            <li><a href='https://www.instagram.com/rajarani_coaching/' target='_blank' ><FaInstagram /></a></li>
                        </ul>
                    </div>

                </div>
            </section>
        </div>
    )
 }

export default Login
