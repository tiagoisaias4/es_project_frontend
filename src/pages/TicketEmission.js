import "./TicketEmission.css";
import { Button } from "reactstrap";
import axios from "axios";
import { API_URL_TICKET, API_URL_PASSENGER, API_URL_PROCESS_PAYMENT, API_URL_DYNAMO, API_URL_UPDATE_SEAT } from "../constants";
import { useState, useEffect } from "react";

const TicketEmission = ({ setSelectedCities, setSelectedDate, seatNumber, setCurrentStep, selectedTrip, handleLogOut, passengerInformation, ticket }) => {

  console.log(ticket)

  const [done, setDone] = useState(true);

  console.log('selectedTrip.date:', selectedTrip.date, typeof(selectedTrip.date))

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

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = localStorage.getItem("access_token");
  
        console.log("token:", token)
        console.log('passengerInformation:\n', passengerInformation)
  
        const response = await axios.post(API_URL_PROCESS_PAYMENT, ticket, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Handle the response data here
        console.log('response from passenger API:',response.data);
  
      } catch (error) {
        console.error("Error fetching trips:", error);
      }

    };
    
    const x = async() => {
        setTimeout(() => {
          const fetchData = async () => {
            try {
      
              const token = localStorage.getItem("access_token");
        
              console.log("token:", token)
              console.log('passengerInformation:\n', passengerInformation)
        
              const response = await axios.post(API_URL_UPDATE_SEAT, ticket, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              
              // Handle the response data here
              console.log('response from passenger API:',response.data);
        
            } catch (error) {
              console.error("Error fetching trips:", error);
            }
      
          };

          fetchData();
          setCurrentStep('plan-your-trip');
      }, 35000);
    }

    fetchData(); // Call the async function
    x()
  });

  const handleConfirmation = async () => {
    // Ao clicar neste botão atualizar o status do bilhete no dynamoDB para 'paid' caso o tempo não tenha terminado
    // Guardar o ticket na base de dados
    try {

      const token = localStorage.getItem("access_token");

      console.log("token:", token)
      console.log('passengerInformation:\n', passengerInformation)

      const response = await axios.post(API_URL_DYNAMO, ticket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Handle the response data here
      console.log('response from passenger API:',response.data);

    } catch (error) {
      console.error("Error fetching trips:", error);
    }

    try {

      const token = localStorage.getItem("access_token");

      console.log("token:", token)
      console.log('passengerInformation:\n', passengerInformation)

      const response = await axios.post(API_URL_PASSENGER, passengerInformation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Handle the response data here
      console.log('response from passenger API:',response.data);

    } catch (error) {
      setDone(false);
      console.error("Error fetching trips:", error);
    }


    console.log('passengerInformation:', passengerInformation)

    try {

      const token = localStorage.getItem("access_token");

      console.log("token:", token)
      console.log((ticket))

      const response = await axios.post(API_URL_TICKET, ticket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Handle the response data here
      console.log('response from ticket API:',response.data);

    } catch (error) {
      setDone(false);
      console.error("Error fetching trips:", error);
    }




    if (done === true) {
      setSelectedDate("")
      setSelectedCities({
        departure: "",
        destination: ""    
      });
      setCurrentStep('plan-your-trip')
    }

    // setSelectedDate("");
    // setCurrentStep('plan-your-trip')


  };


  return (
    <div className="ticket-emission">
      <div className="thank-you-for-container">
        <span>{`Below is a summary of your trip. We'll send a copy of your booking confirmation to your email address. You can also find this page again in `}</span>
        <span className="my-tickets">My tickets</span>
        <span>.</span>
      </div>
      <b className="bon-voyage-jos1">Your trip awaits you...</b>
      <div className="confirmation-number-38102940">
        {/* Confirmation number: #381029404387 (Criar um hash para os tickets e desenvolver um codigo para o autocarro da viagem!!!!) */}
        {/* Upon confirming the ticket's payment we will send you an email with the details of the trip and the ticket confimation ID for the driver to check you in */}
        Thank you for booking your travel with Fluxbus, you're almost there
      </div>
      <b className="travel-summary1">Travel summary</b>
      <div className="departing-december-17th1">
        Departing {selectedTrip.date}
      </div>
      <div className="seat-n-91">Seat nº {seatNumber}</div>
      <div className="data-row-flights-in-cart1">
        <div className="data-row-chosen-flight-detai1">
          <div className="airline-details1">
            <div className="airline-name1"> {selectedTrip.departure} </div>
            <div className="airline-name1"> {selectedTrip.destination} </div>
          </div>
          <div className="flight-details1">
            <div className="airline-name1">Bus #{selectedTrip.bus_number} </div>
            <div className="airline-name1">
              {selectedTrip.departure_time} - {selectedTrip.arrival_time}
            </div>
            <div className="layover-info1">
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
      <b className="price-breakdown1">Price breakdown</b>
      <div className="subtotal-group">
        <div className="subtotal1">Subtotal</div>
        <div className="div3"> {Number(selectedTrip.price).toFixed(2)} €</div>
      </div>
      <div className="taxes-and-fees-group">
        <div className="subtotal1">Taxes and Fees</div>
        <div className="div3"> {Number(selectedTrip.IVA).toFixed(2)} €</div>
      </div>
      <div className="rectangle-group">
        <div className="frame-inner" />
        <div className="amount-paid-group">
          <div className="amount-paid1">Amount paid</div>
          <div className="div5"> {(Number(selectedTrip.price) + Number(selectedTrip.IVA)).toFixed(2)} €</div>
        </div>
        <div className="frame-inner" />
      </div>
      <Button className="button4" colorScheme="purple" variant="solid" onClick={handleConfirmation}>
        Confirm
      </Button>

      {/* <div className="button4">
        <div className="copyright">Confirm Payment fsfsdfsdfdsfsdfsdf</div>
      </div> */}
      {/* <div className="button5">
        <div className="label15">Add another</div>
      </div> */}

      <div className="menu2">
        <button className="logo1" onClick={onLogoClick}>
          Fluxbus
        </button>
        <div className="menu3">
          <button className="nav-list-item3" onClick={onNavListItemClick}>
            <div className="plan-your-trip1">Plan Your Trip</div>
          </button>
          <button className="nav-list-item3" onClick={onMyTicketsClick}>
            <div className="plan-your-trip1">My Tickets</div>
          </button>
          <button className="nav-list-item8" onClick={handleLogOut}>
                <div className="plan-your-trip3">Log Out</div>
          </button>
          {/* <button className="services1">
            <div className="nav-list-item4" />
            <div className="submenu1">
              <button className="my-tickets3">Definitions</button>
              <button className="costumer-support">Costumer Support</button>
            </div>
            <button className="my-account" onClick={handleLogOut} >Log Out</button>
          </button>
          <img className="image-1-icon" alt="" src="/image-1@2x.png" /> */}
        </div>
      </div>
    </div>
  );
};

export default TicketEmission;
