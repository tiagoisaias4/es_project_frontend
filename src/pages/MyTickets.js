import { useState, useEffect, useCallback } from "react";
import Ticket from "../components/Ticket";
import PortalDrawer from "../components/PortalDrawer";
import { useNavigate } from "react-router-dom";
import "./MyTickets.css";
import { API_URL_MY_TICKETS } from "../constants";
import axios from "axios";

const MyTickets = ({ myTicketsTrips , myTickets, setSelectedCities, setSelectedDate, handleLogOut, setCurrentStep }) => {
  const [isTicketOpen, setTicketOpen] = useState(false);
  const navigate = useNavigate();
  // const [myTickets, setMyTickets] = useState([]);
  const [openedTicket, setOpenedTicket] = useState("");

  const openTicket = useCallback((item) => {
    setTicketOpen(true);
    setOpenedTicket(item);
  }, [setTicketOpen, setOpenedTicket]);

  const closeTicket = useCallback(() => {
    setOpenedTicket("");
    setTicketOpen(false);
  }, []);

  const onLogoClick = () => {
    setSelectedDate("")
    setSelectedCities({
      departure: "",
      destination: ""
    });
    setCurrentStep("plan-your-trip");
  };

  const onNavListItemClick = () => {
    setSelectedDate("")
    setSelectedCities({
      departure: "",
      destination: ""
    });
    setCurrentStep('plan-your-trip')
  };

  const onMyTicketsClick = () => {
    setCurrentStep("my-tickets");
  };

  const combinedData = myTickets.map(ticket => {
    // Find the corresponding trip based on the common attribute 'trip_id'
    const correspondingTrip = myTicketsTrips.find(trip => trip.trip_id === ticket.trip_id);
  
    // Combine the information from ticket and correspondingTrip
    return {
      ticket_id: ticket.ticket_id,
      seatNo: ticket.seatNo,
      // Add other ticket attributes as needed
      ...correspondingTrip,
    };
  });

  return (
    <>
      <div className="my-tickets4">
        <div className="menu4">
          <button className="logo2" onClick={onLogoClick}>
            Fluxbus
          </button>
          <div className="menu5">
            <button className="nav-list-item5" onClick={onNavListItemClick}>
              <div className="plan-your-trip2">Plan Your Trip</div>
            </button>
            <button className="nav-list-item5" onClick={onMyTicketsClick}>
              <div className="plan-your-trip2">My Tickets</div>
            </button>
            <button className="nav-list-item5" onClick={handleLogOut}>
                <div className="plan-your-trip2">Log Out</div>
            </button>
          </div>
        </div>
        <section className="lista-admins">
          <table className="trips-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Departure</th>
                <th>Departure Time</th>
                <th>Destination</th>
                <th>Arrival Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.ticket_id}</td>
                  <td>{item.departure}</td>
                  <td>{item.departure_time}</td>
                  <td>{item.destination}</td>
                  <td>{item.arrival_time}</td>
                  <td>{item.date}</td>
                  <button className="open-button" onClick={() => openTicket(item)}>
                    open
                  </button>                
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="menu4">
          <button className="logo2" onClick={onLogoClick}>
            Fluxbus
          </button>
          <div className="menu5">
            <button className="nav-list-item5" onClick={onNavListItemClick}>
              <div className="plan-your-trip2">Plan Your Trip</div>
            </button>
            <button className="nav-list-item5" onClick={onMyTicketsClick}>
              <div className="plan-your-trip2">My Tickets</div>
            </button>
            <button className="nav-list-item5" onClick={handleLogOut}>
                <div className="plan-your-trip2">Log Out</div>
            </button>
          </div>
        </div>
        <img className="hero-icon" alt="" src="/hero@2x.png" />
        <div className="booked-travels">Booked Travels</div>
      </div>
      {isTicketOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeTicket}
        >
          <Ticket  onClose={closeTicket} ticket={openedTicket} />
        </PortalDrawer>
      )}
    </>
  );
};

export default MyTickets;
