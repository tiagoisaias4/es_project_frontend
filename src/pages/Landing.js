import { useState, useCallback } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import SignUp from "../components/SignUp";
import PortalDrawer from "../components/PortalDrawer";
import Login from "../components/Login";
import LoginStaff from "../components/LoginStaff"
import "./Landing.css";
import HeaderNav from "../components/HeaderNav";

const Landing = ({ setUserId, setCurrentStep, setStaffId, staffId }) => {
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isStaffLoginOpen, setStaffLoginOpen] = useState(false);

  const handleSignInSuccess = () => {
    setCurrentStep("plan-your-trip")
  }

  const handleStaffSignInSuccess = () => {
    console.log("staffff logged in")
    setStaffId(localStorage.getItem('driverID'))
    setCurrentStep("home-staff")
  }

  const openFrame = useCallback(() => {
    setFrameOpen(true);
  }, []);

  const closeFrame = useCallback(() => {
    setFrameOpen(false);
  }, []);

  const openLogin = useCallback(() => {
    setLoginOpen(true);
  }, []);

  const openStaffLogin = useCallback(() => {
    setStaffLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setLoginOpen(false);
  }, []);

  return (
    <div>
      <div className="landing">
        {/* <img className="footer-divider3" alt="" src="/footer--divider1.svg" /> */}
        <div className="bottom2">
        </div>
        <div className="hero">
          <button className="logo3">Fluxbus</button>
          <img
            className="hero-text-gradient"
            alt=""
            src="/hero-text-gradient@2x.png"
          />
          <Button
            className="button8"
            colorScheme="purple"
            variant="solid"
            w="95px"
            onClick={openStaffLogin}
          >
            Staff
          </Button>
          <Button
            className="nav-list-item7"
            colorScheme="purple"
            variant="outline"
            w="69px"
            onClick={openLogin}
          >
            Sign in
          </Button>
        </div>
      </div>
      {isFrameOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeFrame}
        >
          <SignUp onClose={closeFrame} />
        </PortalDrawer>
      )}
      {isLoginOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeLogin}
        >
          <Login setUserId={setUserId} onClose={closeLogin} onSignInSuccess={handleSignInSuccess} />
        </PortalDrawer>
      )}
      {isStaffLoginOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeLogin}
        >
          <LoginStaff onClose={closeLogin} staffId={staffId} setStaffId={setStaffId} onStaffSignInSuccess={handleStaffSignInSuccess} />
        </PortalDrawer>
      )}
    </div>
  );
};

export default Landing;
