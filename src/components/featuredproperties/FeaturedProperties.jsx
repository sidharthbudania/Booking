import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data = [], loading, error } = useFetch("/api/hotels?featured=true&limit=3");

  // const images = [
  //   "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
  //   "https://cf.bstatic.com/xdata/images/hotel/square600/13125861.webp?k=a89ffeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
  //   "https://cf.bstatic.com/xdata/images/hotel/square600/13125862.webp?k=c29ffeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
  //   "https://cf.bstatic.com/xdata/images/hotel/square600/13125863.webp?k=d39ffeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
  // ];

  return (
    <div className="w-full max-w-6xl flex flex-wrap justify-between gap-5 mx-auto my-8">
      {loading ? (
  <p className="text-lg text-gray-600">Loading featured properties...</p>
) : error ? (
  <p className="text-red-500">Failed to load properties. Please try again.</p>
) : !data || data.length === 0 ? (
  <p className="text-lg text-gray-600">No featured properties found.</p>
) : (
  data.map((hotel) => (
    <div
      key={hotel._id}
      className="flex-1 flex flex-col gap-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <img
        src={hotel.photos?.[0] || "https://cf.bstatic.com/xdata/images/hotel/square600/13125863.webp?k=d39ffeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"}
        alt={hotel.name}
        className="w-full h-[200px] object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col gap-2">
        <span className="text-gray-800 font-bold text-lg">{hotel.name}</span>
        <span className="font-light text-gray-600">{hotel.city}</span>
        <span className="font-medium text-gray-800">
          Starting from ${hotel.cheapestPrice}
        </span>
        <div className="flex items-center mt-2">
          {hotel.rating ? (
            <>
              <button className="bg-blue-800 text-white border-none px-2 py-1 mr-2 font-bold rounded-md">
                {hotel.rating}
              </button>
              <span className="text-sm text-gray-600">
                {hotel.rating >= 9 ? "Exceptional" : "Excellent"}
              </span>
            </>
          ) : (
            <>
            <button className="bg-blue-800 text-white border-none px-2 py-1 mr-2 font-bold rounded-md">
                8.6
              </button>
              <span className="text-sm text-gray-600">
                "Excellent"
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  ))
)}

    </div>
  );
};

export default FeaturedProperties;

 

  
