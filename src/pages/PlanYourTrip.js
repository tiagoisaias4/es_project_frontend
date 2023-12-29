import "./PlanYourTrip.css";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL_CITIES, API_URL_MY_TICKETS } from "../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import HeaderNav from "../components/HeaderNav";

const PlanYourTrip = ({ userID, setMyTicketsTrips ,setMyTickets ,selectedDate, setSelectedDate, setCurrentStep, setSelectedCities, selectedCities, handleLogOut }) => {

  const [calendarVisible, setCalendarVisible] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().substr(0, 10); // YYYY-MM-DD
  };

  const [cities, setCities] = useState({
    departureCities: [],
    destinationCities: [],
  });

  const [warning, setWarning] = useState(null);

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

  const onButtonClick = () => {
    const formattedDate = formatDate(selectedDate)
    console.log(formattedDate)
    setCalendarVisible(!calendarVisible);
    console.log(selectedDate)
    setSelectedDate(formattedDate)

    console.log(cities.departureCities)
    console.log(cities.destinationCities)
    console.log(selectedCities.departure)
    console.log(selectedCities.destination)
    setCurrentStep("bus-list");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get(API_URL_CITIES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { departure_cities, destination_cities } = response.data;
        setCities({
          departureCities: departure_cities,
          destinationCities: destination_cities,
        });
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });

      const fetchData = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const response = await axios.get(API_URL_MY_TICKETS, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          console.log("response from my-tickets api:\n", response.data)
          setMyTickets(response.data.tickets)
          setMyTicketsTrips(response.data.trips)
  
        } catch (error) {
          console.error("Error fetching trips:", error);
        }
  
      };
      
      console.log("userID", userID)

      fetchData(); // Call the async function
  }, []);

  const handleCityChange = (field, value) => {
    setSelectedCities({
      ...selectedCities,
      [field]: value,
    });
  };

  // Define custom styles for the react-select components
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%", // Set the width according to your design
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc", // Add border styles as needed
      borderRadius: "8px", // Adjust border-radius as needed
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid #ccc", // Add border styles as needed
      borderRadius: "8px", // Adjust border-radius as needed
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add box-shadow as needed
    }),
    // You may customize other styles according to your design
  };

  return (
    <div>
      <div className="plan-your-trip5">
        {/* <div>
        <HeaderNavlogo6
          onLogoClick={onLogoClick}
          onNavListItemClick={onNavListItemClick}
          onMyTicketsClick={onMyTicketsClick}
          handleLogOut={handleLogOut}
          />
        </div> */}
        <div className="menu10">
          <button className="logo6" onClick={onLogoClick}>
            Fluxbus
          </button>
          <div className="menu11">
            <button className="nav-list-item12" onClick={onNavListItemClick}>
              <div className="plan-your-trip6">Plan Your Trip</div>
            </button>
            <button className="nav-list-item12" onClick={onMyTicketsClick}>
              <div className="plan-your-trip6">My Tickets</div>
            </button>
            <button className="nav-list-item12" onClick={handleLogOut}>
                <div className="plan-your-trip6">Log Out</div>
            </button>
          </div>
        </div>
        <div className="hero1">
          <img
            className="hero-text-gradient1"
            alt=""
            src="/hero-text-gradient@2x.png"
          />
          <div className="flight-search">
            <div className="text-input13">
              <div className="base-text-input18">
                <img
                  className="map-location-marker"
                  alt=""
                  src="/32--map-location-marker.svg"
                />
                <Select
                  value={selectedCities.departure}
                  onChange={(selectedOption) =>
                    handleCityChange("departure", selectedOption)
                  }
                  options={cities.departureCities.map((city) => ({
                    label: city,
                    value: city,
                  }))}
                />
                <img
                  className="eye-show-visible8"
                  alt=""
                  src="/32--eye-show-visible2.svg"
                />
              </div>
              <div className="helper-text15">
                <div className="copyright5">Helper text</div>
              </div>
            </div>
            {/* ... (other existing code) */}
            <div className="text-input13">
              <div className="base-text-input18">
                <img className="arrival-icon" alt="" src="/32--arrival.svg" />
                <Select
                value={selectedCities.destination}
                onChange={(selectedOption) =>
                  handleCityChange("destination", selectedOption)
                }
                options={cities.destinationCities.map((city) => ({
                  label: city,
                  value: city,
                }))}
              />
                <img
                  className="eye-show-visible8"
                  alt=""
                  src="/32--eye-show-visible2.svg"
                />
              </div>
              <div className="helper-text15">
                <div className="copyright5">Helper text</div>
              </div>
            </div>
            
            <div className="date-calendar">
              <div className="base-text-input18">
                <img
                  className="arrival-icon"
                  alt=""
                  src="/32--calendar-with-dates.svg"
                />
                <div className="label43">
                  <DatePicker 
                    // className="label43"
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    placeholderText="Departure Date"
                  /> 
                </div>

              </div>

            </div>

            <button className="button20" onClick={onButtonClick}>
              <div className="search">Search</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanYourTrip;
