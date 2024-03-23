import React, { useState } from "react";
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa6";
import "./css/login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/v1/login", {
        email,
        password,
      })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setIsLoading(false);
  }
  return (
    <div>
      <section>
        <div className="image-box">
          <img src="./login_img.png" alt="" />
        </div>
        <div className="content-box">
          <div className="form-box active" id="login_form">
            <h2>Login</h2>
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
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-box">
                {isLoading ? (
                  "Loading"
                ) : (
                  <input
                    type="submit"
                    value="Login"
                    name="login"
                    onClick={handleSubmit}
                  />
                )}
              </div>
              <div className="input-box">
                <p>
                  Don't have an account?
                  <NavLink to="/signup">Click Here</NavLink>
                </p>
              </div>
              <div className="input-box">
                <p>
                  Forgot Password ? <NavLink to="/forgot">Click Here</NavLink>
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

export default Login;
