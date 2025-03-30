import { Link } from "react-router-dom";

const SearchItem = ({item}) => {
  return (
    <div className="border border-light-gray p-4 rounded-lg flex flex-col gap-5 mb-5">
  <img
    src={item.images && item.images.length > 0 
      ? item.images[0] 
      : "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"}
  alt=""
    className="w-full h-48 object-cover rounded-lg"
  />
  <div className="flex flex-col gap-2">
    <h1 className="text-xl text-[#0071c2]">{item.name}</h1>
    <span className="text-xs">{item.distance}m from center</span>
    <span className="text-xs bg-[#008009] text-white py-1 px-2 rounded">Free airport taxi</span>
    <span className="text-xs font-bold">Studio Apartment with Air conditioning</span>
    <span className="text-xs">{item.description}</span>
    <span className="text-xs text-[#008009] font-bold">Free cancellation</span>
    <span className="text-xs text-[#008009]">You can cancel later, so lock in this great price today!</span>
  </div>
  <div className="flex flex-col gap-2">
    {
    item.rating && <div className="flex justify-between">
    <span className="font-medium">Excellent</span>
    <button className="bg-[#003580] text-white py-1 px-3 font-bold border-none">{item.rating}</button>
    </div>
    }
    <div className="text-right flex flex-col gap-1">
      <span className="text-2xl">${item.cheapestPrice}</span>
      <span className="text-xs text-gray-400">Includes taxes and fees</span>
      <Link to={`/hotels/${item._id}`}>
      <button className="bg-[#0071c2] text-white font-bold py-2 px-4 rounded-lg cursor-pointer border-none">See availability</button>
      </Link>
    </div>
  </div>
</div>

  );
};

export default SearchItem;

