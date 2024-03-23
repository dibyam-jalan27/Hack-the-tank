import React, { useState } from "react";
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";
import "./css/login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !name || !phoneNumber) return;

    axios
      .post("http://localhost:5000/api/v1/register", {
        name,
        email,
        password,
        phoneNumber,
      })
      .then((res) => {
        navigate("/dashboard");
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
          <div className="form-box active" id="login_form">
            <h2>Sign up</h2>
            <form action="">
              <div className="input-box">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span>Phone</span>
                <input
                  type="phone"
                  name="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
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
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-box">
                <input
                  type="submit"
                  value="Sign up"
                  name="login"
                  onClick={handleSubmit}
                />
              </div>
              <div className="input-box">
                <p>
                  If you have an account?<NavLink to="/login"> Sign in</NavLink>
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

export default Signup;
