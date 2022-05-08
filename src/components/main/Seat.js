// mojor component which holds the seat selection and proceed to payment page
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";

import seat from "../../images/seat.png";
import screen from "../../images/screen.png";

import "../../css/main/navbar.css";
import "../../css/main/seat.css";
import "react-toastify/dist/ReactToastify.css";

const Seat = () => {
  const [showModal, setShowModal] = useState(true);

  const [enteredSeats, setEnteredSeats] = useState();
  const [seats, setSeats] = useState();

  // to hold the selected seats
  const [selectedSeat, setSelectedSeat] = useState([]);

  // first set of seats (farther from screen)
  const diamond = [
    { row: "A", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
    { row: "B", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
    { row: "C", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
    { row: "D", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
    { row: "E", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
  ];

  // second set of seats (nearer to screen)
  const pearl = [
    { row: "F", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
    { row: "G", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
    { row: "H", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
    { row: "I", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
    { row: "J", seat: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12, 13, 14] },
  ];

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setEnteredSeats(e.target.value);
  };

  // adding seat count to seats state
  const handleSubmit = (e) => {
    // check validity
    if (enteredSeats > 0 && Number.isInteger(+enteredSeats)) {
      if (enteredSeats > 140) {
        toast.error("Entered Seats are more than available seats");
      } else {
        setSeats(enteredSeats);
        setShowModal(!showModal);
      }
    } else {
      toast.warning("Enter valid seat number!");
    }
    e.preventDefault();
  };

  const handleSeatClick = (row, seat) => {
    // the seats should be greater than zero
    if (seats <= 0) {
      toast.warning("Please enter the Number of seats!");
    } else if (
      //selectedSeat array length < seats && the chosen seat should not be included in the selected seat array
      selectedSeat.length < seats &&
      !selectedSeat.includes(row + seat)
    ) {
      setSelectedSeat([...selectedSeat, row + seat]);
    } else if (
      // selectedSeat array length < seats && the chosen seat is already present in the selected seat array then -> remvoe that chosen seat from the selected seat array
      selectedSeat.length < seats &&
      selectedSeat.includes(row + seat)
    ) {
      setSelectedSeat((selected) =>
        selected.filter((value) => value !== row + seat)
      );
    } else if (
      selectedSeat.length >= seats &&
      selectedSeat.includes(row + seat)
    ) {
      setSelectedSeat((selected) =>
        selected.filter((value) => value !== row + seat)
      );
    } else if (
      selectedSeat.length >= seats &&
      !selectedSeat.includes(row + seat)
    ) {
      toast.error("Maximum seat selected");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className={showModal ? "show-modal" : "modal"}>
        <div className="modal-container">
          <span className="close" onClick={handleClick}>
            <i class="fa-solid fa-xmark"></i>
          </span>
          <div className="model-content">
            <img src={seat} alt="seat" className="seat-img" />

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="id"
                  value={enteredSeats}
                  placeholder="Enter the number of seats"
                  onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">
                  Add Seats &nbsp;
                  <i className="fa-solid fa-circle-chevron-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="seat-container">
        <div className="movie-info-container">
          <div className="seat-heading">
            <h2 className="heading">
              Please select your <span className="text-primary">Seats.</span>
            </h2>
            <button className="btn btn-primary" onClick={handleClick}>
              Update SeatCount{" "}
              <i className="fa-solid fa-circle-chevron-right"></i>
            </button>
          </div>

          <div className="seat-selction-container">
            <table>
              <tbody>
                {/* displaying the pearl session */}

                {diamond.map((seats, key) => {
                  return (
                    <tr key={key}>
                      <th scope="row">{seats.row}</th>

                      {/* Iteratin each seats in each row */}
                      {seats.seat.map((seat, key) => {
                        return (
                          <td key={key}>
                            {seat !== null ? (
                              <i
                                className="fa-solid fa-couch seat-icon"
                                style={{
                                  color: selectedSeat.includes(seats.row + seat)
                                    ? "#de3e34"
                                    : "#ddd",
                                }}
                                onClick={() => {
                                  handleSeatClick(seats.row, seat);
                                }}
                              ></i>
                            ) : (
                              <i
                                className="fa-solid fa-couch seat-icon"
                                style={{ visibility: "hidden" }}
                              ></i>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                <tr>
                  <td>
                    <i
                      class="fa-solid fa-couch seat-icon"
                      style={{ visibility: "hidden" }}
                    ></i>
                  </td>
                </tr>

                {/* displaying the diamond section */}
                {pearl.map((seats, key) => {
                  return (
                    <tr key={key}>
                      <th scope="row">{seats.row}</th>

                      {/* Iteratin each seats in each row */}
                      {seats.seat.map((seat, key) => {
                        return (
                          <td key={key}>
                            {seat !== null ? (
                              <i
                                class="fa-solid fa-couch seat-icon"
                                style={{
                                  color: selectedSeat.includes(seats.row + seat)
                                    ? "#de3e34"
                                    : "#ddd",
                                }}
                                onClick={() => {
                                  handleSeatClick(seats.row, seat);
                                }}
                              ></i>
                            ) : (
                              <i
                                class="fa-solid fa-couch seat-icon"
                                style={{ visibility: "hidden" }}
                              ></i>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="screen">
              <img src={screen} alt="screen" className="screen-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// <i class="fa-solid fa-couch"></i>

export default Seat;
