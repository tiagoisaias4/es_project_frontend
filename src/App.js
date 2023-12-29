import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import TicketEmission from "./pages/TicketEmission";
import MyTickets from "./pages/MyTickets";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import Buslist from "./pages/Buslist";
import PlanYourTrip from "./pages/PlanYourTrip";
import HomeStaff from "./pages/HomeStaff"

function App() {
  const [currentStep, setCurrentStep] = useState("Landing");
  const [selectedDate, setSelectedDate] = useState("");
  const [queryDate, setQueryDate] = useState("");
  const [userId, setUserId] = useState("");

  const [selectedCities, setSelectedCities] = useState({
    departure: [],
    destination: [],
  });
  const [selectedTrip, setSelectedTrip] = useState("");
  const [ticket, setTicket] = useState({
    fk_user_id: userId,
    ticket_code: "",
    trip_id: "",
    seatNo: "",
    bus_id: ""
  });
  const [passengerInformation, setPassengerInformation] = useState({
    ticket_code: "",
    firstName: "",
    lastName: "",
    NIF: "",
    dob: "",
    email: "",
    phoneNumber: ""
  });
  const [seatNumber, setSeatNumber] = useState("");
  const [bus, setBus] = useState("");
  const [staffId, setStaffId] = useState("");
  const [myTickets, setMyTickets] = useState([]);
  const [myTicketsTrips, setMyTicketsTrips] = useState([]);

  const resetState = () => {
    setCurrentStep("Landing");
    setSelectedCities({
      departure: "",
      destination: ""
    });
    setSelectedTrip("");
    // setTicketFormData(null);
    setPassengerInformation({
      ticket_code: "",
      firstName: "",
      lastName: "",
      NIF: "",
      dob: "",
      email: "",
      phoneNumber: ""
    });
    setSeatNumber("");
    setBus("");
    setTicket({
      ticket_code: "",
      trip_id: "",
      seatNo: "",
      bus_id: "",
      user_id: "",
    })
    setStaffId("");
    setSelectedDate("");
    setQueryDate("");
    setMyTickets([])
    setUserId("");
  };

  const handleSignIn = () => {
    // Move to "ticketForm" step
    setCurrentStep("plan-you-trip");
  };

  const handleLogOut = () => {
    localStorage.clear()
    resetState()
  }

  return (
    <div>

        {currentStep === "Landing" && <Landing setUserId={setUserId} staffId={staffId} setStaffId={setStaffId} onSignIn={handleSignIn} setCurrentStep={setCurrentStep}/>}
        {currentStep === "plan-your-trip" && <PlanYourTrip userId={userId} setMyTicketsTrips={setMyTicketsTrips} setMyTickets={setMyTickets} setQueryDate={setQueryDate} setSelectedDate={setSelectedDate} selectedDate={selectedDate} handleLogOut={handleLogOut} setCurrentStep={setCurrentStep} setSelectedCities={setSelectedCities} selectedCities={selectedCities}/>}
        {currentStep === "my-tickets" && <MyTickets myTicketsTrips={myTicketsTrips} myTickets={myTickets} setSelectedCities={setSelectedCities} setSelectedDate={setSelectedDate} handleLogOut={handleLogOut} setCurrentStep={setCurrentStep}/>}
        {currentStep === "bus-list" && <Buslist setSelectedCities={setSelectedCities} setSelectedDate={setSelectedDate} selectedDate={selectedDate} seatNumber={seatNumber} handleLogOut={handleLogOut} setSeatNumber={setSeatNumber} setSelectedTrip={setSelectedTrip} selectedCities={selectedCities} setCurrentStep={setCurrentStep}/>}
        {/* {currentStep === "ticketForm" && <TicketForm onTicketFormSubmit={handleTicketFormSubmit} setTicketFormData={setTicketFormData} />} */}
        {currentStep === "payment-confirmation" && <PaymentConfirmation userId={userId} setSelectedCities={setSelectedCities} setSelectedDate={setSelectedDate} handleLogOut={handleLogOut} setTicket={setTicket} seatNumber={seatNumber} setPassengerInformation={setPassengerInformation} passengerInformation={passengerInformation} selectedTrip={selectedTrip} setCurrentStep={setCurrentStep} />}
        {currentStep === "ticket-emission" && <TicketEmission setSelectedCities={setSelectedCities} setSelectedDate={setSelectedDate} ticket={ticket} handleLogOut={handleLogOut} seatNumber={seatNumber} passengerInformation={passengerInformation} setCurrentStep={setCurrentStep} selectedTrip={selectedTrip} />}
        {currentStep === "home-staff" && <HomeStaff staffId={staffId} handleLogOut={handleLogOut} />}

    </div>
  );
}
export default App;
