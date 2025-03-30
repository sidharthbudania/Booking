import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { SearchContext } from "../../context/SearchContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const {dispatch}=useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}});
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="bg-blue-900 text-white flex justify-center relative">
      <div
        className={`w-full max-w-[1024px] ${
          type === "list" ? "my-5" : "my-5 mb-[100px]"
        }`}
      >
        <div className="flex gap-10 mb-12">
          <div className="flex items-center gap-2 border p-2 rounded-2xl border-white">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="text-lg mb-6">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account.
            </p>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg mb-8">
              Sign in / Register
            </button>
            <div className="bg-white border-4 border-yellow-400 flex items-center justify-around py-4 px-5 rounded-md absolute bottom-[-25px] w-full max-w-[1024px]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBed} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-none outline-none text-gray-700"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-gray-400"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="text-gray-400 cursor-pointer"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="absolute top-12 z-10"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPerson} className="text-gray-400" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="text-gray-400 cursor-pointer"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="absolute top-12 bg-white text-gray-700 rounded-md shadow-lg p-4 z-10">
                    <div className="flex justify-between items-center mb-4">
                      <span>Adult</span>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={options.adult <= 1}
                          className="w-8 h-8 border rounded text-blue-600 border-blue-600 disabled:cursor-not-allowed"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span>{options.adult}</span>
                        <button
                          className="w-8 h-8 border rounded text-blue-600 border-blue-600"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span>Children</span>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={options.children <= 0}
                          className="w-8 h-8 border rounded text-blue-600 border-blue-600 disabled:cursor-not-allowed"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span>{options.children}</span>
                        <button
                          className="w-8 h-8 border rounded text-blue-600 border-blue-600"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Room</span>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={options.room <= 1}
                          className="w-8 h-8 border rounded text-blue-600 border-blue-600 disabled:cursor-not-allowed"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span>{options.room}</span>
                        <button
                          className="w-8 h-8 border rounded text-blue-600 border-blue-600"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
