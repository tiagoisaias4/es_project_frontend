import { useState, useCallback } from "react";
import SelectsSeats from "../components/SelectsSeats";
import PortalDrawer from "../components/PortalDrawer";
import { useNavigate } from "react-router-dom";
import "./PaymentConfirmation.css";
import { Button } from "reactstrap";
import { AutoComplete } from "antd";
import DatePicket from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { API_URL_PAYMENT_CONFIRMATION } from "../constants";
import axios from "axios";

const PaymentConfirmation = ({ userID, setSelectedCities, setSelectedDate, seatNumber, setTicket, setPassengerInformation, passengerInformation, selectedTrip, setCurrentStep, handleLogOut }) => {
  // const [isSelectsSeatsOpen, setSelectsSeatsOpen] = useState(false);

  // const openSelectsSeats = useCallback(() => {
  //   setSelectsSeatsOpen(true);
  // }, []);

  // const closeSelectsSeats = useCallback(() => {
  //   setSelectsSeatsOpen(false);
  // }, []);

  const onLogoClick = () => {
    setSelectedDate("")
    setSelectedCities({
      departure: "",
      destination: ""
    });    setCurrentStep("plan-your-trip");
  };

  const onNavListItemClick = () => {
    setSelectedDate("")
    setSelectedCities({
      departure: "",
      destination: ""
    });    setCurrentStep('plan-your-trip')
  };

  const onButtonRowClick = async () => {
    const trip_id = selectedTrip.trip_id;
    console.log(trip_id)

    const ticket_id = trip_id.concat("", seatNumber);
    const bus_id = trip_id.concat("", selectedTrip.bus_number);

    const ticketData = ({
      ticket_id: ticket_id,
      trip_id: trip_id,
      seatNo: seatNumber,
      bus_id: bus_id
    }) 

    console.log("userID", localStorage.getItem('userID'))

    const newTicket = {
      ticket_id: ticketData.ticket_id,
      trip_id: ticketData.trip_id,
      seatNo: ticketData.seatNo,
      bus_id: ticketData.bus_id,
      user_id: localStorage.getItem('userID'),
    }

    setTicket(newTicket)

    setPassengerInformation(prevState => ({
      ...prevState, // Copy the existing state
      ticket_id: ticket_id // Update the ticket_id
    }));

    // try {

    //   const token = localStorage.getItem("access_token");

    //   console.log("token:", token)
    //   console.log('passengerInformation:\n', passengerInformation)

    //   const response = await axios.post(API_URL_PAYMENT_CONFIRMATION, newTicket, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
      
    //   // Handle the response data here
    //   console.log('response from passenger API:',response.data);

    // } catch (error) {
    //   console.error("Error fetching trips:", error);
    // }

    setCurrentStep('ticket-emission');
  };

  const handleChange = (e) => {
    // Guardar PassengerInformation
    setPassengerInformation({
      ...passengerInformation,
      [e.target.name]: e.target.value,
    });

  };


  const initialAvailability = Array(54).fill(1).map(x => (Math.random() >= .5) ? 1 : 0)
  const [seatAvailability, setSeatAvailability] = useState(initialAvailability);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelect = (seatNumber) => {
    // Set the selected seat from the dropdown
    setSelectedSeat(seatNumber);
  };

  const onMyTicketsClick = () => {
    setCurrentStep("my-tickets");
  };


  return (
    <>
      <div className="payment-confirmation">
        <div className="button10">
          <div className="label22">Select Seats</div>
        </div>
        <div className="flight-cart">
          <div className="data-row-flights-in-cart2">
            <div className="data-row-chosen-flight-detai2">
              <div className="airline-details2">
                <div className="airline-name2">{selectedTrip.departure}</div>
                <div className="airline-name2">{selectedTrip.destination}</div>
              </div>
              <div className="flight-details2">
                <div className="airline-name2"> Bus #{selectedTrip.bus_number}</div>
                  <div className="airline-name2">
                    {selectedTrip.departure_time} - {selectedTrip.arrival_time}
                  </div>
                <div className="layover-info2">
                  {selectedTrip.trip_duration && (
                    <>
                      {selectedTrip.trip_duration.split(':').map((component, index) => (
                        <span key={index}>
                          {index === 0 ? `${component}h` : `${component}m`}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="data-row-cart-price-summary">
            <div className="cart-labels">
              <div className="total">Subtotal</div>
              <div className="total">Taxes and Fees</div>
              <div className="total">Total</div>
            </div>
            <div className="cart-price-details">
              <div className="div64">{Number(selectedTrip.price).toFixed(2)} €</div>
              <div className="div64">{Number(selectedTrip.IVA).toFixed(2)} €</div>
              <div className="div64">{(Number(selectedTrip.price) + Number(selectedTrip.IVA)).toFixed(2)} €</div>
            </div>
          </div>
        </div>
        <div className="group-parent">
          <div className="enter-the-required-information-parent">
            <div className="enter-the-required">
              Enter the information related to the traveler.
              The default information registered in the account
              will the used to complete the fields not provided.
            </div>
            <b className="passenger-information">Passenger information</b>
            <div className="passenger-1">Passenger</div>
            <div className="text-input1">
              <input
                className="base-text-input4"
                placeholder="First name"
                type="text"
                name="firstName"
                value={passengerInformation.firstName}
                onChange={handleChange}
              />
              <div className="helper-text3">
                <div className="label22">Helper text</div>
              </div>
            </div>
            <div className="text-input2">
              <input
                className="base-text-input4"
                placeholder="Vat Number (NIF)"
                type="text"
                name="NIF"
                value={passengerInformation.NIF}
                onChange={handleChange}
              />
              <div className="helper-text3">
                <div className="label22">Helper text</div>
              </div>
            </div>
            <div className="text-input3">
              <input
                className="base-text-input4"
                placeholder="Email address"
                type="text"
                name="email"
                value={passengerInformation.email}
                onChange={handleChange}
              />
              <div className="helper-text3">
                <div className="label22">Helper text</div>
              </div>
            </div>
            <div className="text-input4">
              <input
                className="base-text-input4"
                placeholder="Phone Number"
                type="text"
                name="phoneNumber"
                value={passengerInformation.phoneNumber}
                onChange={handleChange}
              />
              <div className="helper-text3">
                <div className="label22">Helper text</div>
              </div>
            </div>
            <div className="text-input5">
              <input
                className="base-text-input4"
                placeholder="Last name"
                type="text"
                name="lastName"
                value={passengerInformation.lastName}
                onChange={handleChange}
              />
              <div className="helper-text3">
                <div className="label22">Helper text</div>
              </div>
            </div>
            <div className="text-input6">
              <input
                className="base-text-input4"
                placeholder="DD-MM-YYYY"
                type="text"
                name="dob"
                value={passengerInformation.dob}
                onChange={handleChange}
              />
              <div className="helper-text3">
                <div className="label22">Helper text</div>
              </div>
            </div>
          </div>
          <div className="button-row1" onClick={onButtonRowClick}>
              <div className="button11">
                <div className="label22">Confirm and pay</div>
              </div>
            </div>
        </div>  
        <div className="menu6">
          <button className="logo4" onClick={onLogoClick}>
            Fluxbus
          </button>
          <div className="menu7">
            <button className="nav-list-item8" onClick={onNavListItemClick}>
              <div className="plan-your-trip3">Plan Your Trip</div>
            </button>
            <button className="nav-list-item8" onClick={onMyTicketsClick}>
              <div className="plan-your-trip3">My Tickets</div>
            </button>
            <button className="nav-list-item8" onClick={handleLogOut}>
                <div className="plan-your-trip3">Log Out</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmation;
