import useFetch from "../../hooks/useFetch";

const PropertyList = () => {

  const { data, loading, error } = useFetch("/api/hotels/countByType");
    
  const images=[
  "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ]
    return (
      <div className="w-full max-w-4xl flex justify-between gap-5 items-center mx-auto mt-20">
        {
          loading ? "Loading Please Wait ..." :
          <>
        {data && images.map((img,i)=>(

          <div className="flex-1 rounded-lg overflow-hidden cursor-pointer" key={i}>
          <img
            src={img}
            alt=""
            className="w-full h-[150px] object-cover"
            />
          <div className="p-2">
            <h1 className="text-lg text-gray-800 capitalize">{data[i]?.type}</h1>
            <h2 className="text-sm font-light">{data[i]?.count} {data[i]?.type}</h2>
          </div>
        </div>
          ))}
        </>
    }
      </div>
    );
  };
  
  export default PropertyList;
  