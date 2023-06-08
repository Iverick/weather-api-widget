import { Inter } from 'next/font/google'

export default function Home() {
  return (
    <div className="bg-blue-50 mx-20 mt-20">
      <div className="flex items-center justify-center m-4">
        <input 
          className="placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-600 border-2 border-gray-200 rounded-lg p-2 my-2"
          id="search-bar-id"
          name="search-bar"
          type="search"
          placeholder="Your city or zip code..." />
        <button 
          onClick={() => console.log("xuy!")}
          className="m-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
          Search
        </button>
      </div>
      <div className="bg-amber-50 p-10">
        <h1 className="text-xl">Your city: <span className="font-bold m-2"></span></h1>
        <h3 className="text-sm my-2">Weather: <span className="font-bold m-2"></span></h3>
        <h3 className="text-sm my-2">Temperature: <span className="font-bold m-2"></span></h3>
        <h3 className="text-sm my-2">Pressure: <span className="font-bold m-2"></span></h3>
        <h3 className="text-sm my-2">Humidity: <span className="font-bold m-2"></span></h3>
        <h3 className="text-sm my-2">Wind: </h3>
        <h3 className="text-sm my-2">Date: <span className="font-bold m-2"></span></h3>
      </div>
    </div>
  )
}
