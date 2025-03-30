const MailList = () => {
  return (
    <div className="w-full mt-12 bg-blue-900 text-white flex flex-col items-center gap-5 py-12">
      <h1 className="text-3xl font-bold">Save time, save money!</h1>
      <span className="text-lg">Sign up and we'll send the best deals to you</span>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Your Email"
          className="w-72 h-10 p-3 rounded-md border-none mr-3 bg-white text-gray-400"
        />
        <button className="h-12 bg-blue-700 text-white font-medium rounded-md px-5 hover:bg-blue-800 transition duration-200">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default MailList;

