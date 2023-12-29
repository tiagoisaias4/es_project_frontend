import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { API_URL_LOGIN } from "../constants";


const Login = ({ setUserId, onClose, onSignInSuccess, staffLogin, onStaffSignInSuccess }) => {
  const navigate = useNavigate();
  // State for login credentials
  const [loginData, setLoginData] = useState({
    email: "",
    pass: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the backend for authentication
      const response = await axios.post(API_URL_LOGIN, loginData);

      console.log('response from login api:', response)

      if (response.status === 200) {
        // Authentication successful
        console.log("Login successful");

        // Store the access token in localStorage
        const { access } = response.data;
        localStorage.setItem("access_token", access);

        console.log("access_token", access)

        localStorage.setItem("userID", response.data.id)

        
        onSignInSuccess();

      } else {
        console.log("Login failed");
        // Handle authentication failure
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors
    }
  };

  return (
    <div className="login" data-animate-on-scroll>
      <div className="sign-up">
        <div className="header">
          <div className="title-row">
            <b className="title">Sign in for Fluxbs</b>
            <img
              className="x-close-no5"
              alt=""
              src="/32--x-close-no2.svg"
              onClick={onClose}
            />
          </div>
          <div className="description">
            Sign in using your email address or phone number below to get
            started.
          </div>
        </div>
        <div className="text-input9">
          <div className="base-text-input14">
            <img
              className="money-price-cost4"
              alt=""
              src="/32--money-price-cost1.svg"
            />
            <input
              className="label25"
              placeholder="Email"
              type="text"
              name="email" // Add the name attribute
              value={loginData.email} // Bind the value to the state
              onChange={handleChange} // Add the onChange handler
            />
            <img
              className="money-price-cost4"
              alt=""
              src="/32--eye-show-visible1.svg"
            />
          </div>
          <div className="helper-text11">
            <div className="helpertext11">Helper text</div>
          </div>
        </div>
        <div className="text-input9">
          <div className="base-text-input14">
            <img
              className="money-price-cost4"
              alt=""
              src="/32--money-price-cost1.svg"
            />
            <input
              className="label25"
              placeholder="Password"
              type="password" // Change the type to 'password' for password input
              name="pass" // Add the name attribute
              value={loginData.pass} // Bind the value to the state
              onChange={handleChange} // Add the onChange handler
            />
            <img
              className="money-price-cost4"
              alt=""
              src="/32--eye-show-visible1.svg"
            />
          </div>
          <div className="helper-text11">
            <div className="helpertext11">Helper text</div>
          </div>
        </div>
        <div className="checkbox3">
          <div className="checkbox4">
            <div className="checkbox5">
              <div className="base-checkbox3">
                <div className="check3" />
                <div className="mixed3" />
              </div>
            </div>
            <div className="helpertext11">
              <span>{`I agree to the `}</span>
              <span className="terms-and-conditions">terms and conditions</span>
            </div>
          </div>
          <div className="checkbox4">
            <div className="checkbox5">
              <div className="base-checkbox3">
                <div className="check3" />
                <div className="mixed3" />
              </div>
            </div>
            <div className="helpertext11">Send me the latest deal alerts</div>
          </div>
        </div>
        <div className="button12" onClick={onSubmit}>
          <div className="label29">Sign In</div>
        </div>
        <div className="social-sign-up">
          <div className="divider-parent">
            <div className="divider" />
            <div className="helpertext11">or</div>
            <div className="divider" />
          </div>
          <button className="button13">
            <img className="google-icon1" alt="" src="/18--google1.svg" />
            <div className="label30">Continue with Google</div>
            <img
              className="arrowright-icon2"
              alt=""
              src="/18--arrowright2.svg"
            />
          </button>
          <button className="button13">
            <img className="apple-mac-icon" alt="" src="/18--apple-mac.svg" />
            <div className="label30">Continue with Apple</div>
            <img
              className="arrowright-icon2"
              alt=""
              src="/18--arrowright2.svg"
            />
          </button>
          <button className="button13">
            <img className="google-icon1" alt="" src="/18--facebook.svg" />
            <div className="label30">Continue with Facebook</div>
            <img
              className="arrowright-icon2"
              alt=""
              src="/18--arrowright2.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
