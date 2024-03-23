import React from 'react'
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";
import './css/login.css';
import { NavLink } from "react-router-dom";
function ResetPassword() {
  return (
    <div>
    <section>
 <div class="image-box">
     <img src="./login_img.png" alt="" />
 </div>
 <div class="content-box">
 <div class="form-box active" id="forget_form">
         <h2>Reset Password</h2>
         <form action="">
             <div class="input-box">
                 <span>New Password</span>
                 <input type="password" name="newpassword" />
             </div>
             <div class="input-box">
                 <span>Confirm Password</span>
                 <input type="password" name="confirmpassword" />
             </div>

             <div class="input-box">
                 <input type="submit" value="Change Password" name="login" />
             </div>
             <div class="input-box">
             <p>Don't have an account?<NavLink to="/signup">Click Here</NavLink></p>
             </div>
             <div class="input-box">
                 <p>Go to login ?  <NavLink to="/login">Click Here</NavLink></p>
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

export default ResetPassword
