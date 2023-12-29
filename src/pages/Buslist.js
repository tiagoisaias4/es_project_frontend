import "./Buslist.css";
import React, { useState, useEffect} from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import { API_URL_TRIPS, API_URL_BUS } from "../constants";
import PortalDrawer from "../components/PortalDrawer";


const Buslist = ({ setSelectedCities, setSelectedDate, selectedDate, seatNumber, setSeatNumber, selectedCities, setCurrentStep, setSelectedTrip, handleLogOut }) => {
  const [trips, setTrips] = useState([]);
  const [seats, setSeats] = useState(null);
  const departureValues2 = ['Porto', 'Lisbon', 'Madrid', 'Paris', 'Berlin'];
  const [departureValues, setDepartureValue] = useState([]);
  const [departureTimeValues, setDepartureTimeValues] = useState([]);


  console.log('All Departure Values:', departureValues, typeof(departureValues));

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
    });    setCurrentStep('plan-your-trip')
  };

  const onMyTicketsClick = () => {
    setCurrentStep("my-tickets");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log("selectedCities:", selectedCities)
        const response = await axios.get(API_URL_TRIPS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            'departure': selectedCities.departure?.value,
            'destination': selectedCities.destination?.value,
            'date': selectedDate
          },
        });
  
        // Handle the response data here
        console.log('Trips:\n',response.data, "\n", typeof(response.data));
        setTrips(response.data)

        setDepartureValue(response.data.map((trip) => trip.departure));
        setDepartureTimeValues(response.data.map((trip => trip.departure_time)))

        console.log('All Departure Values:', departureValues, typeof(departureValues));

      } catch (error) {
        console.error("Error fetching trips:", error);
      }

    };
  
    fetchData(); // Call the async function
  }, [selectedCities.departure, selectedCities.destination]);

  const handleTicketPurchase = async (trip) => {
    console.log('trips.departures', trips.departures, typeof(trips.departures))

    console.log("ticket purchased:", trip.id)
    setSelectedTrip(trip)
    console.log(trip)
    console.log("trip_id", trip.trip_id)
    console.log("bus:", trip.bus_number)
    // console.log(trip.trip_id.concat("", bus_number))

    const bus = trip.trip_id.concat("", trip.bus_number);
    console.log(bus)

    try {
      const token = localStorage.getItem("access_token");
      console.log("selectedCities:", selectedCities)
      const response = await axios.get(API_URL_BUS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          'bus_id': bus,
        },
      });
  
      // Handle the response data here

      setSeatNumber(response.data.seatNumber)

      setCurrentStep("payment-confirmation");

      // Neste request deverá ser melhor devolver na resposta o lugar para se poder
      // atualizar logo no backend a base de dados dos lugares do atuocarro

      // Posetiormente, quando tivermos implementado o sistema de escolher os lugares,
      // basta fazer uma funcao no api que recebe o lugar antigo e o novo para poder
      // atualizar o valor do array no indice correspondente
      
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  // useEffect(() => {
  //   console.log("bus_seats", seats);
  //   console.log("seats:", seats.seats);
  //   console.log("type:", typeof seats);
  
  // }, [seats]);


  return (
    <div className="buslist">
      <img className="footer-divider5" alt="" src="/footer--divider1.svg" />
      <div className="bottom4">
        <div className="social-media-stack4">
          <img className="twitter-icon4" alt="" src="/24--twitter.svg" />
          <img className="twitter-icon4" alt="" src="/24--instagram.svg" />
          <img className="twitter-icon4" alt="" src="/24--facebook.svg" />
        </div>
        <div className="copyright4">
          <p className="engenharia-de-servios4">Engenharia de Serviços, MECD</p>
          <p className="engenharia-de-servios4">
            Universidade de Coimbra, 2023
          </p>
        </div>
      </div>
      <div className="menu8">
        <button className="logo5" onClick={onLogoClick}>
          Fluxbus
        </button>
        <div className="menu9">
          <button className="nav-list-item10" onClick={onNavListItemClick}>
            <div className="plan-your-trip4">Plan Your Trip</div>
          </button>
          <button className="nav-list-item10" onClick={onMyTicketsClick}>
            <div className="plan-your-trip4">My Tickets</div>
          </button>
          <button className="nav-list-item8" onClick={handleLogOut}>
                <div className="plan-your-trip3">Log Out</div>
          </button>
        </div>
      </div>
      
      <section className="lista-admins">
        <table className="trips-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Departure</th>
              <th>Departure Time</th>
              <th>Destination</th>
              <th>Arrival Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index}>
                <td>{trip.date}</td>
                <td>{trip.departure}</td>
                <td>{trip.departure_time}</td>
                <td>{trip.destination}</td>
                <td>{trip.arrival_time}</td>
                <td>{trip.price}</td>
                <button className="ativo4" onClick={() => handleTicketPurchase(trip)}>
                  CONTINUE
                </button>
              </tr>
              
            ))}
          </tbody>
        </table>
      </section> 
      <div className="choose-a-departing-container">
        <span>{`Choose a `}</span>
        <span className="departing">departing</span>
        <span> bus</span>
      </div>
    </div>
  );
};

export default Buslist;
