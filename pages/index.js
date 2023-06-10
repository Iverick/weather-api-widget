import { converter } from '@/utils/converter'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [city, setCity] = useState("")
  const [currentCity, setCurrentCity] = useState({
    name: "", weather: "", temp: "", pressure: "", humidity: "", wind: "", date: "", temp_f: "", wind_mile: ""
  })
  const [weatherForecastArray, setWeatherForecastArray] = useState([])

  const fetchWeather = async () => {
    try {
      const { data } = await axios.get(`/api/weather?city=${city}`)
      const { mainData } = data

      console.log("Data: ", mainData)

      setCurrentCity({
        ...currentCity,
        name: mainData.location.name,
        weather: mainData.current.condition.text,
        temp: mainData.current.temp_c,
        temp_f: mainData.current.temp_f,
        pressure: mainData.current.pressure_mb,
        humidity: mainData.current.humidity,
        wind: mainData.current.wind_kph,
        wind_mile: mainData.current.wind_mph,
        date: mainData.current.last_updated,
      })
      setWeatherForecastArray(mainData.forecast.forecastday)
    } catch (err) {
      console.log("Error occured while fetching weather data", err.message)
    }
  }

  return (
    <div className="bg-blue-50 mx-20 mt-20">
      <div className="flex items-center justify-center m-4">
        <input 
          className="placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-600 border-2 border-gray-200 rounded-lg p-2 my-2"
          id="search-bar-id"
          name="search-bar"
          type="search"
          placeholder="Your city or zip code..."
          onChange = {(e) => setCity(e.target.value)} />
        <button 
          onClick={() => fetchWeather()}
          className="m-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
          Search
        </button>
      </div>
      <div className="bg-amber-50 p-10">
        <h1 className="text-xl">Your city: <span className="font-bold m-2">{ currentCity.name }</span></h1>
        <h3 className="text-sm my-2">Weather: <span className="font-bold m-2">{ currentCity.weather }</span></h3>
        <h3 className="text-sm my-2">Temperature: <span className="font-bold m-2">{ currentCity.temp }</span></h3>
        <h3 className="text-sm my-2">Pressure: <span className="font-bold m-2">{ currentCity.pressure }</span></h3>
        <h3 className="text-sm my-2">Humidity: <span className="font-bold m-2">{ currentCity.humidity }</span></h3>
        <h3 className="text-sm my-2">Wind: <span className="font-bold m-2">{ currentCity.wind }</span></h3>
        <h3 className="text-sm my-2">Date: <span className="font-bold m-2">{ currentCity.date }</span></h3>
      </div>
      <div className="m-6 font-bold">Weather Forecast: </div>
      <div className="grid sm:grid-cols-3 sm:m-4 grid-cols-1 gap-4 p-2">
        {weatherForecastArray.map((value, index) => {
          if (index > 0) {
            return (
              <div key={index} className="bg-orange-100 rounded-md shadow-md p-6">
                <h4>
                  Day: <span className="font-bold m-2">{converter(weatherForecastArray[index].date)}</span>
                </h4>
                <h4>
                  Weather: <span className="font-bold m-2">{weatherForecastArray[index].day.condition.text}</span>
                </h4>
                <h4>
                  Min: <span className="font-bold m-2">{weatherForecastArray[index].day.mintemp_c}</span>
                </h4>
                <h4>
                  Max: <span className="font-bold m-2">{weatherForecastArray[index].day.maxtemp_c}</span>
                </h4>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
