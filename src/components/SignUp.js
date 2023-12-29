import { useEffect } from "react";
import "./SignUp.css";

const SignUp = ({ onClose }) => {
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
  return (
    <div className="sign-up1" data-animate-on-scroll>
      <div className="sign-up2">
        <div className="header1">
          <div className="title-row1">
            <b className="title1">Sign up for Fluxbs</b>
            <img
              className="x-close-no6"
              alt=""
              src="/32--x-close-no2.svg"
              onClick={onClose}
            />
          </div>
          <div className="description2">
            Sign up using your email address or phone number below to get
            started.
          </div>
        </div>
        <div className="text-input11">
          <div className="base-text-input16">
            <img
              className="money-price-cost6"
              alt=""
              src="/32--money-price-cost1.svg"
            />
            <input
              className="label33"
              placeholder="Email or phone number"
              type="text"
            />
            <img
              className="money-price-cost6"
              alt=""
              src="/32--eye-show-visible1.svg"
            />
          </div>
          <div className="helper-text13">
            <div className="helpertext13">Helper text</div>
          </div>
        </div>
        <div className="text-input11">
          <div className="base-text-input16">
            <img
              className="money-price-cost6"
              alt=""
              src="/32--money-price-cost1.svg"
            />
            <input className="label33" placeholder="Password" type="text" />
            <img
              className="money-price-cost6"
              alt=""
              src="/32--eye-show-visible1.svg"
            />
          </div>
          <div className="helper-text13">
            <div className="helpertext13">Helper text</div>
          </div>
        </div>
        <div className="checkbox8">
          <div className="checkbox9">
            <div className="checkbox10">
              <div className="base-checkbox5">
                <div className="check5" />
                <div className="mixed5" />
              </div>
            </div>
            <div className="helpertext13">
              <span>{`I agree to the `}</span>
              <span className="terms-and-conditions1">
                terms and conditions
              </span>
            </div>
          </div>
          <div className="checkbox9">
            <div className="checkbox10">
              <div className="base-checkbox5">
                <div className="check5" />
                <div className="mixed5" />
              </div>
            </div>
            <div className="helpertext13">Send me the latest deal alerts</div>
          </div>
        </div>
        <div className="button16" onClick={onClose}>
          <div className="label37">Create account</div>
        </div>
        <div className="social-sign-up1">
          <div className="divider-group">
            <div className="divider2" />
            <div className="helpertext13">or</div>
            <div className="divider2" />
          </div>
          <button className="button17">
            <img className="google-icon2" alt="" src="/18--google1.svg" />
            <div className="label38">Continue with Google</div>
            <img
              className="arrowright-icon5"
              alt=""
              src="/18--arrowright2.svg"
            />
          </button>
          <button className="button17">
            <img className="apple-mac-icon1" alt="" src="/18--apple-mac.svg" />
            <div className="label38">Continue with Apple</div>
            <img
              className="arrowright-icon5"
              alt=""
              src="/18--arrowright2.svg"
            />
          </button>
          <button className="button17">
            <img className="google-icon2" alt="" src="/18--facebook.svg" />
            <div className="label38">Continue with Facebook</div>
            <img
              className="arrowright-icon5"
              alt=""
              src="/18--arrowright2.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
