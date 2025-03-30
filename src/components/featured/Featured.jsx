import useFetch from "../../hooks/useFetch";

const featuredCities = [
  { name: "Berlin", imageUrl: "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" },
  { name: "Madrid", imageUrl: "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=" },
  { name: "London", imageUrl: "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=" }
];

const Featured = () => {
  const { data, loading, error } = useFetch("/api/hotels/countByCity?cities=Berlin,Madrid,London");

  return (
    <div className="w-full max-w-5xl flex justify-between gap-5 z-10 mx-auto my-8">
      {loading ? (
        <p className="text-lg font-bold text-gray-700">Loading, please wait...</p>
      ) : error ? (
        <p className="text-lg font-bold text-red-500">Failed to load data! Try again later.</p>
      ) : data && Array.isArray(data) && data.length >= 3 ? (
        featuredCities.map((city, index) => (
          <div key={city.name} className="relative text-white rounded-lg overflow-hidden h-64 flex-1">
            <img
              src={city.imageUrl}
              alt={city.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 left-5">
              <h1 className="text-2xl font-bold">{city.name}</h1>
              <h2 className="text-lg">{data[index]}</h2>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg font-bold text-gray-700">No data available</p>
      )}
    </div>
  );
};

export default Featured;



