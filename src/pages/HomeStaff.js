import { useState, useCallback } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./HomeStaff.css";
import { API_URL_VALIDATE_TICKET } from "../constants";
import axios from "axios";

const HomeStaff = ({ staffId, setCurrentStep, handleLogOut }) => {

  const [ticketCode, setTicketCode] = useState("");
  // const navigate = useNavigate();

  // const onValidateTicketsClick = useCallback(() => {
  //   navigate("/");
  // }, [navigate]);

  // const onCopyrightText1Click = useCallback(() => {
  //   navigate("/staff");
  // }, [navigate]);

  const onFooterListItemClick = () => {
    setCurrentStep("about-fluxbus");
  };

  const handleTicketValidation = async () => {

    try {
      const token = localStorage.getItem("access_token");

      console.log('driver id:', localStorage.getItem("driverID"))
      
      console.log('localStorage token:', token)

      const response = await axios.get(API_URL_VALIDATE_TICKET, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          'ticket_id': ticketCode,
          'driver_id': staffId
        },
      });

      // Handle the response data here
      console.log('response:\n',response.data);

    } catch (error) {
      console.error("Error fetching trips:", error);
    }

    // try {
    //   // Make a request to the backend for authentication
    //   const response = await axios.get(API_URL_VALIDATE_TICKET, data);

    //   // console.log('response from login api:', response)
    //   console.log(response)

    //   // if (response.status === 200) {
    //   //   // Authentication successful
    //   //   console.log("Staff login successful");

    //   //   // Store the access token in localStorage
    //   //   const { access } = response.data;
    //   //   localStorage.setItem("access_token", access);

    //   //   setStaffId(response.data.id)
        
    //   //   onStaffSignInSuccess();
        
    //   // } else {
    //   //   console.log("Login failed");
    //   //   // Handle authentication failure
    //   // }
    // } catch (error) {
    //   console.error("Error during request:", error);
    //   // Handle other errors
    // }

    setTicketCode("")

  }

  return (
    <div className="home-staff">
      <div className="logo-parent">
        <button className="logo">Fluxbus</button>
        <div className="menu">
          {/* <button className="nav-list-item">
            <b className="validate-tickets">Validate Tickets</b>
          </button> */}
          <button className="nav-list-item"> { /* onClick={onValidateTicketsClick} */ }
            <b className="log-out" onClick={handleLogOut} >Log out</b>
          </button>
          {/* <img
            className="woman-portrait-face-icon-web-a"
            alt=""
            src="/womanportraitfaceiconwebavatarflatstylevector13201970-1@2x.png"
          /> */}
        </div>
      </div>
      <div className="bottom">
        {/* <div className="social-media-stack">
          <img className="twitter-icon" alt="" src="/24--twitter@2x.png" />
          <img className="twitter-icon" alt="" src="/24--instagram@2x.png" />
          <img className="twitter-icon" alt="" src="/24--facebook@2x.png" />
        </div> */}
        <div className="copyright">
          <p className="engenharia-de-servios">Engenharia de Serviços, MECD</p>
          <p className="engenharia-de-servios">Universidade de Coimbra, 2023</p>
        </div>
        <div
          className="copyright1"
          // onClick={onCopyrightText1Click}
        >{`Staff `}</div>
        <div className="footer-list-item" onClick={onFooterListItemClick}>
          <div className="list-item">About Fluxbus</div>
        </div>
      </div>
      <div className="validate-the-qr-codes-parent">
        {/* <b className="validate-the-qr">Validate the QR codes</b> */}
        <div className="manually-insert-the">
          Manually Insert the ticket code
        </div>
        <Button className="button-row" colorScheme="purple" variant="solid" onClick={handleTicketValidation}>
          Validate
        </Button>
        <div className="insert-ticket-input">
          <input
            className="base-text-input4"
            placeholder="Insert the ticket code"
            type="text"
            name="ticket-code"
            value={ticketCode}
            onChange={(event) => setTicketCode(event.target.value)}
          />
          <div className="helper-text3">
            <div className="label22">Helper text</div>
          </div>
        </div>
        {/* <div className="text-input">
          <input
            className="base-text-input"
            placeholder="Insert the ticket number"
            type="text"
            value={ticketCode}
            onChange={(event) => setTicketCode(event.target.value)}
          />
          <div className="helper-text">
            <div className="helpertext">Helper text</div>
          </div>
        </div> */}
        {/* <img
          className="base-text-input1"
          src="/mqmcrc93ryi2u4x5udzneyhqmybbyk71ycvm.gif"
        /> */}
      </div>
      <b className="title">Hello,</b>
      <div className="description">
        Choose a job you love and you will never have to work a day in your life
        :)
      </div>
    </div>
  );
};

export default HomeStaff;
