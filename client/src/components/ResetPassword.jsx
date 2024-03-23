import React, { useState } from "react";
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";
import "./css/login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword) return;

    setIsLoading(true);

    axios
      .post(`http://localhost:5000/api/v1/password/reset/${token}`, {
        password,
        confirmPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <div>
      <section>
        <div className="image-box">
          <img src="./login_img.png" alt="" />
        </div>
        <div className="content-box">
          <div className="form-box active" id="forget_form">
            <h2>Reset Password</h2>
            <form action="">
              <div className="input-box">
                <span>New Password</span>-
                <input type="password" name="newpassword" />
              </div>
              <div className="input-box">
                <span>Confirm Password</span>
                <input type="password" name="confirmpassword" />
              </div>

              <div className="input-box">
                <input
                  type="submit"
                  value="Change Password"
                  name="login"
                  onClick={handleSubmit}
                />
              </div>
              <div className="input-box">
                <p>
                  Don't have an account?
                  <NavLink to="/signup">Click Here</NavLink>
                </p>
              </div>
              <div className="input-box">
                <p>
                  Go to login ? <NavLink to="/login">Click Here</NavLink>
                </p>
              </div>
            </form>
            <h3>Follow us on</h3>
            <ul className="sci">
              <li>
                <a
                  href="https://www.youtube.com/@rajaranicoaching"
                  target="_blank"
                >
                  <FaYoutube />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/rajaranicoaching"
                  target="_blank"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/rajarani_coaching/"
                  target="_blank"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;
