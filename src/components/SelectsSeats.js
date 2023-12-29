import { useEffect, useState } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { Select } from '@chakra-ui/react';
import "./SelectsSeats.css";

const SelectsSeats = ({ onClose, passengerInformation }) => {
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

  // const initialAvailability = [
  //   1, 0, 1, 0, 1, 0, 1, 0,
  //   1, 0, 1, 0, 1, 0, 1, 0,
  //   1, 0, 1, 0, 1, 0, 1, 0,
  //   1, 0, 1, 0, 1, 0, 1, 0,
  //   1, 0, 1, 0, 1, 0, 1, 0,
  //   1, 0, 1, 0, 1, 0, 1, 0,
  // ];

  const initialAvailability = Array(54).fill(1).map(x => (Math.random() >= .5) ? 1 : 0)

  console.log(initialAvailability)

  const [seatAvailability, setSeatAvailability] = useState(initialAvailability);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelect = (seatNumber) => {
    // Set the selected seat from the dropdown
    setSelectedSeat(seatNumber);
  };

  return (
    <div className="selects-seats" data-animate-on-scroll>
      {/* <img className="selects-seats-child" alt="" src="/group-12@2x.png" /> */}
      <section className="save-button">
        <div className="content">
          <div className="user-selections">
            <div className="passenger-data">
              <div className="label10">Passenger</div>
              <div className="name4">{passengerInformation.firstName} {passengerInformation.lastName}</div>
            </div>
            <div className="passenger-data1">
              <div className="label11">Seat number</div>
              <div className="name4"></div>
            </div>
          </div>
          <Button
            className="nav-list-item16"
            colorScheme="purple"
            size="md"
            variant="outline"
            w="111px"
            onClick={onClose}
          >
            Select Seats
          </Button>
        </div>
      </section>
      <div className="frame-parent">
        <button className="wrapper" style={{ backgroundColor: seatAvailability[0] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="div10">1</div>
        </button>
        <div className="container" style={{ backgroundColor: seatAvailability[4] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">5</div>
        </div>
        <div className="frame" style={{ backgroundColor: seatAvailability[8] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">9</div>
        </div>
        <div className="wrapper1" style={{ backgroundColor: seatAvailability[12] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">13</div>
        </div>
        <div className="wrapper2" style={{ backgroundColor: seatAvailability[16] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">17</div>
        </div>
        <div className="wrapper3" style={{ backgroundColor: seatAvailability[20] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">21</div>
        </div>
        <div className="wrapper4" style={{ backgroundColor: seatAvailability[24] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">25</div>
        </div>
        <div className="wrapper5" style={{ backgroundColor: seatAvailability[28] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">29</div>
        </div>
        <div className="wrapper6" style={{ backgroundColor: seatAvailability[32] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">33</div>
        </div>
        <div className="wrapper7" style={{ backgroundColor: seatAvailability[34] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">35</div>
        </div>
        <div className="wrapper8" style={{ backgroundColor: seatAvailability[36] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">37</div>
        </div>
        <div className="wrapper9" style={{ backgroundColor: seatAvailability[40] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">41</div>
        </div>
        <div className="wrapper10" style={{ backgroundColor: seatAvailability[44] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">45</div>
        </div>
        <div className="wrapper11" style={{ backgroundColor: seatAvailability[48] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">49</div>
        </div>
        <button className="frame-button" style={{ backgroundColor: seatAvailability[2] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="div10">3</div>
        </button>
        <div className="wrapper12" style={{ backgroundColor: seatAvailability[6] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">7</div>
        </div>
        <div className="wrapper13" style={{ backgroundColor: seatAvailability[10] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">11</div>
        </div>
        <div className="wrapper14" style={{ backgroundColor: seatAvailability[14] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">15</div>
        </div>
        <div className="wrapper15" style={{ backgroundColor: seatAvailability[18] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">19</div>
        </div>
        <div className="wrapper16" style={{ backgroundColor: seatAvailability[22] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">23</div>
        </div>
        <div className="wrapper17" style={{ backgroundColor: seatAvailability[26] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">27</div>
        </div>
        <div className="wrapper18" style={{ backgroundColor: seatAvailability[30] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">31</div>
        </div>
        <div className="wrapper19" style={{ backgroundColor: seatAvailability[38] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">39</div>
        </div>
        <div className="wrapper20" style={{ backgroundColor: seatAvailability[42] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">43</div>
        </div>
        <div className="wrapper21" style={{ backgroundColor: seatAvailability[46] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">47</div>
        </div>
        <div className="wrapper22" style={{ backgroundColor: seatAvailability[52] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">53</div>
        </div>
        <div className="wrapper23" style={{ backgroundColor: seatAvailability[50] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">51</div>
        </div>
        <button className="wrapper24" style={{ backgroundColor: seatAvailability[1] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="div10">2</div>
        </button>
        <div className="wrapper25" style={{ backgroundColor: seatAvailability[5] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">6</div>
        </div>
        <div className="wrapper26" style={{ backgroundColor: seatAvailability[9] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">10</div>
        </div>
        <div className="wrapper27" style={{ backgroundColor: seatAvailability[13] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">14</div>
        </div>
        <div className="wrapper28" style={{ backgroundColor: seatAvailability[17] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">18</div>
        </div>
        <div className="wrapper29" style={{ backgroundColor: seatAvailability[21] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">22</div>
        </div>
        <div className="wrapper30" style={{ backgroundColor: seatAvailability[25] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">26</div>
        </div>
        <div className="wrapper31" style={{ backgroundColor: seatAvailability[29] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">30</div>
        </div>
        <div className="wrapper32" style={{ backgroundColor: seatAvailability[33] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">34</div>
        </div>
        <div className="wrapper33" style={{ backgroundColor: seatAvailability[35] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">36</div>
        </div>
        <div className="wrapper34" style={{ backgroundColor: seatAvailability[37] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">38</div>
        </div>
        <div className="wrapper35" style={{ backgroundColor: seatAvailability[41] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">42</div>
        </div>
        <div className="wrapper36" style={{ backgroundColor: seatAvailability[45] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">46</div>
        </div>
        <div className="wrapper37" style={{ backgroundColor: seatAvailability[49] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">50</div>
        </div>
        <div className="wrapper38" style={{ backgroundColor: seatAvailability[3] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">4</div>
        </div>
        <div className="wrapper39" style={{ backgroundColor: seatAvailability[7] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">8</div>
        </div>
        <div className="wrapper40" style={{ backgroundColor: seatAvailability[11] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">12</div>
        </div>
        <div className="wrapper41" style={{ backgroundColor: seatAvailability[15] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">16</div>
        </div>
        <div className="wrapper42" style={{ backgroundColor: seatAvailability[19] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">20</div>
        </div>
        <div className="wrapper43" style={{ backgroundColor: seatAvailability[23] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">24</div>
        </div>
        <div className="wrapper44" style={{ backgroundColor: seatAvailability[27] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">28</div>
        </div>
        <div className="wrapper45" style={{ backgroundColor: seatAvailability[31] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">32</div>
        </div>
        <div className="wrapper46" style={{ backgroundColor: seatAvailability[39] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">40</div>
        </div>
        <div className="wrapper47" style={{ backgroundColor: seatAvailability[43] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">44</div>
        </div>
        <div className="wrapper48" style={{ backgroundColor: seatAvailability[47] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">48</div>
        </div>
        <div className="wrapper49" style={{ backgroundColor: seatAvailability[53] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">54</div>
        </div>
        <div className="wrapper50" style={{ backgroundColor: seatAvailability[51] === 0 ? 'blue' : seatAvailability[0] === 1 ? 'grey' : selectedSeat === 1 ? 'green' : 'inherit' }} >
          <div className="label11">52</div>
        </div>
      </div>
      <div className="wc-wrapper">
        <div className="wc">WC</div>
      </div>
      <b className="b1" onClick={onClose}>
        +
      </b>
    </div>
  );

};

export default SelectsSeats;
