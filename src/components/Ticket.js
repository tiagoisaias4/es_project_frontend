import { useEffect, useState } from "react";
import "./Ticket.css";
import { API_URL_PASSENGER_INFO } from "../constants";
import axios from "axios";

const Ticket = ({ onClose, ticket }) => {

  const [ticketPassengerInformation, setTicketPassengerInformation] = useState([]);
  const timeComponents = ticket.trip_duration.split(':');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(API_URL_PASSENGER_INFO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            'ticket_code':ticket.ticket_code,
          },
        });
  
        // Handle the response data here
        console.log('Ticket Passenger Info:\n',response.data);
        setTicketPassengerInformation(response.data)

      } catch (error) {
        console.error("Error fetching trips:", error);
      }

    };

    fetchData();


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
    <div className="ticket" data-animate-on-scroll style={{ width: '28%' }}>
      <b className="bon-voyage-jos">Ticket #{ticket.ticket_code}</b>
      <b className="travel-summary">Travel summary</b>
      <div className="departing-december-17th">
        Departing {ticket.date}
      </div>
      <div className="seat-n-9">Seat nº {ticket.seatNo}</div>
      <div className="seat-9f-economy">
        Seat 9F (economy, window), 1 checked bag
      </div>
      <div className="data-row-flights-in-cart">
        <div className="data-row-chosen-flight-detai">
          <div className="airline-details">
            <b className="airline-name">
              <p className="airline-name1">{ticket.departure}</p>
            </b>
            <b className="airline-name1">{ticket.destination}</b>
          </div>
          <div className="flight-details">
            <div className="airline-name">Bus #{ticket.bus_number}</div>
            <div className="airline-name">
              {ticket.departure_time} - {ticket.arrival_time}            </div>
            <div className="layover-info1">
              {ticket.trip_duration && (
                <>
                  {ticket.trip_duration.split(':').map((component, index) => (
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
      <b className="price-breakdown">Price breakdown</b>
      <b className="payment-method">Passenger information</b>
      <div className="subtotal-parent">
        <div className="subtotal">Subtotal</div>
        <div className="div">{Number(ticket.price).toFixed(2)} €</div>
      </div>
      <div className="taxes-and-fees-parent">
        <div className="subtotal">Taxes and Fees</div>
        <div className="div">{Number(ticket.IVA).toFixed(2)} €</div>
      </div>
      <div className="rectangle-parent">
        <div className="frame-child" />
        <div className="amount-paid-parent">
          <div className="amount-paid">Amount paid</div>
          <div className="div2">{(Number(ticket.price) + Number(ticket.IVA)).toFixed(2)} €</div>
        </div>
        <div className="frame-child" />
      </div>
      <div className="credit-card1">
        <div className="data-row-chosen-flight-detai">
          <div className="airline-details">
            <b className="airline-name">
              <p className="airline-name1">{ticketPassengerInformation.firstName} {ticketPassengerInformation.lastName}</p>
            </b>
            <b className="airline-name1">{ticketPassengerInformation.email}</b>
          </div>
          <div className="flight-details">
            <div className="airline-name">NIF {ticketPassengerInformation.NIF}</div>
            <div className="airline-name1">
              {ticketPassengerInformation.phoneNumber}</div>
            <div className="layover-info1">
              {/* {ticket.trip_duration && (
                <>
                  {ticket.trip_duration.split(':').map((component, index) => (
                    <span key={index}>
                      {index === 0 ? `${component}h` : `${component}m`}
                    </span>
                  ))}
                </>
              )} */}
              DoB: {ticketPassengerInformation.dob}
            </div>
          </div>
      </div>
        {/* <div className="name1">Jose Dias</div>
        <div className="card-number1">
          <span className="span2">••••••••••••</span>
          <span className="span3">3456</span>
        </div>
        <div className="expiration-date1">01/24</div>
        <img className="logo-icon1" alt="" src="/logo.svg" /> */}
      </div>
      
      <img
        className="vector-icon1"
        alt=""
        src="/vector1.svg"
        onClick={onClose}
      />
      {/* <div className="button2" onClick={onClose}>
        <div className="label12">Send Copy to Email</div>
      </div> */}
    </div>
  );
};

export default Ticket;
