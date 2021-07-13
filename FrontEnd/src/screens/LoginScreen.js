import axios from "axios";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginScreen = () => {
  const nameInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      window.location.replace("/");
    }
  }, []);

  const signin = async (e) => {
    const name = nameInput.current.value;
    const password = passwordInput.current.value;
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6660/api/auth/login",
        {
          name,
          password,
        }
      );
      const token = response.data.token;
      toast.dark("Login successful");

      localStorage.setItem("token", token);
      window.location.replace("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Error loging in");
    }
  };
  return (
    <div className="signin">
      <form onSubmit={signin}>
        <div className="container">
          <div className="name">
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              ref={nameInput}
              className="input"
            />
          </div>
          <div className="password">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordInput}
              required
              className="input"
            />
          </div>
          <button className="btn">Log in</button>
          <div className="regislink">
            <h4>Don't have an account ?</h4>
            <div className="Link">
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
