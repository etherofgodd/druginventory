import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterScreen = () => {
  const nameInput = useRef();
  const passwordInput = useRef();

  const signin = async (e) => {
    const name = nameInput.current.value;
    const password = passwordInput.current.value;
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6660/api/auth/users",
        {
          name,
          password,
        }
      );
      console.log(response);
      toast.dark("Register successful");
      if (response) return window.location.replace("/signin");
    } catch (error) {
      console.log(error);
      toast.error("Error Registering");
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
          <button className="btn">Register</button>
          <div className="regislink">
            <h4>Already have an account ?</h4>
            <div className="Link">
              <Link to="/signin">Login</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
