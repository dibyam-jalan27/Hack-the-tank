import React, { useState } from "react";
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";
import "./css/login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    axios
      .post("http://localhost:5000/api/v1/password/forgot", {
        email,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
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
            <h2>Forget Password</h2>
            <form action="">
              <div className="input-box">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-box">
                <input
                  type="submit"
                  value="Send me"
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

export default Forgot;
