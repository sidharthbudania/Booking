import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();

  // Default state in case location.state is undefined
  const defaultState = {
    destination: "",
    date: [{ startDate: new Date(), endDate: new Date(), key: "selection" }],
    options: { adult: 1, children: 0, room: 1 },
  };

  const state = location.state || defaultState;
  const [destination, setDestination] = useState(state.destination);
  const [dates, setDates] = useState(state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const {data,loading,error,reFetch}=useFetch(`/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const handleClick=()=>{
    reFetch();
  }


  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Header type="list" />
      <div className="flex flex-col gap-10 py-8 px-4 md:px-20">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-6">Search</h1>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Fields */}
            <div className="flex-1">
              <div className="mb-4">
                <label className="block font-medium">Destination</label>
                <input
                  placeholder={destination || "Enter destination"}
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Check-in Date</label>
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="cursor-pointer text-gray-700"
                >
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                    className="absolute bg-white border border-gray-300 rounded-md mt-2 z-10"
                  />
                )}
              </div>
            </div>

            {/* Options Section */}
            <div className="flex-1">
              <div className="mb-4">
                <label className="block font-medium">Options</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Min Price */}
                  <div className="flex flex-col">
                    <span className="text-sm">Min price <small>per night</small></span>
                    <input 
                    onChange={e=>setMin(e.target.value)}
                    type="number" 
                    className="p-2 border border-gray-300 rounded-md" />
                  
                  </div>
                  {/* Max Price */}
                  <div className="flex flex-col">
                    <span className="text-sm">Max price <small>per night</small></span>
                    <input 
                    onChange={e=>setMax(e.target.value)}
                    type="number" className="p-2 border border-gray-300 rounded-md" />
                  </div>
                  {/* Adult */}
                  <div className="flex flex-col">
                    <span className="text-sm">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="p-2 border border-gray-300 rounded-md"
                      placeholder={options.adult}
                      onChange={(e) =>
                        setOptions({ ...options, adult: e.target.value })
                      }
                    />
                  </div>
                  {/* Children */}
                  <div className="flex flex-col">
                    <span className="text-sm">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="p-2 border border-gray-300 rounded-md"
                      placeholder={options.children}
                      onChange={(e) =>
                        setOptions({ ...options, children: e.target.value })
                      }
                    />
                  </div>
                  {/* Room */}
                  <div className="flex flex-col">
                    <span className="text-sm">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="p-2 border border-gray-300 rounded-md"
                      placeholder={options.room}
                      onChange={(e) =>
                        setOptions({ ...options, room: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={handleClick} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loading ? "Loading..." : <>
          {data && data.map(item=>(
          <SearchItem item={item} key={item._id}/>
          ))}
          </>}
        </div>
      </div>
    </div>
  );
};

export default List;
