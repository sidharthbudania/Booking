import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

const Hotel = () => {
  const location =useLocation();
  const path=location.pathname;
  const id=path.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const {data,loading,error}=useFetch(`/api/hotels/find/${id}`)
  const {dates,options}=useContext(SearchContext);

  const MILLISECONDS_PER_dAY=1000*60*60*24;
  function dayDifference(date1,date2){
    const timeDiff=Math.abs(date2.getTime()-date1.getTime());
    const diffDays=Math.ceil(timeDiff/MILLISECONDS_PER_dAY);
    return diffDays;
  }

  const days=dayDifference(dates[0].endDate,dates[0].startDate);


  const photos = [
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1" },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1" },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1" },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1" },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1" },
    { src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1" },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "Loading..." : 
      
     data && (<div className="flex flex-col items-center mt-5">
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="absolute top-5 right-5 text-4xl text-gray-300 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="text-5xl text-gray-300 cursor-pointer mx-5"
              onClick={() => handleMove("l")}
            />
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={data.photos[slideNumber]}
                alt=""
                className="w-4/5 h-4/5 object-cover"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="text-5xl text-gray-300 cursor-pointer mx-5"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="w-full max-w-4xl flex flex-col gap-4 relative">
          <button className="absolute top-2 right-0 bg-blue-700 text-white font-bold py-2 px-5 rounded-md">
            Reserve or Book Now!
          </button>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="text-blue-700 font-medium">
            Excellent location – {data.distance}m from center
          </span>
          <span className="text-green-700 font-medium">
            Book a stay over ${data.cheapestprice} at this property and get a free airport taxi
          </span>
          <div className="flex flex-wrap justify-between">
            {data.photos?.map((photo, i) => (
              <div className="w-1/3 p-1" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={data.photos}
                  alt=""
                  className="w-full h-32 object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-5 mt-5">
            <div className="flex-1">
              <h1 className="text-xl font-bold">{data.title}</h1>
              <p className="text-sm mt-4">
              {data.description}
              </p>
            </div>
            <div className="flex-1 bg-blue-100 p-5 flex flex-col gap-4 rounded-md">
              <h1 className="text-lg text-gray-700">Perfect for a {days}-night stay!</h1>
              <span className="text-sm">
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2 className="text-2xl font-light">
                <b>${days*data.cheapestprice*options.room}</b> ({days} nights)
              </h2>
              <button className="bg-blue-700 text-white font-bold py-2 px-5 rounded-md">
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>)}
    </div>
  );
};

export default Hotel;
