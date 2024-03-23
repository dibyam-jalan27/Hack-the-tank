import React from 'react'
import './css/login.css';
function Forgot() {
  return (
    <div>
        <section>
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
  )
}

export default Forgot
       