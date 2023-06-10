import { converter } from '@/utils/converter'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [city, setCity] = useState("")
  const [currentCity, setCurrentCity] = useState({
    name: "", weather: "", temp: "", pressure: "", humidity: "", wind: "", date: "", temp_f: "", wind_mile: ""
  })
  const [weatherForecastArray, setWeatherForecastArray] = useState([])
  const [imperial, setImperial] = useState(false)

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

  const handleImperialCheckbox = () => {
    setImperial(!imperial)
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

      <label className="relative inline-flex items-center cursor-pointer m-4">
        <input type="checkbox" checked={imperial} onChange={handleImperialCheckbox} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>      
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          { imperial ? `Imperial Units` : `Metric Units` }
        </span>
      </label>

      <div className="bg-amber-50 p-10">
        <h1 className="text-xl">Your city: <span className="font-bold m-2">{ currentCity.name }</span></h1>
        <h3 className="text-sm my-2">Weather: <span className="font-bold m-2">{ currentCity.weather }</span></h3>
        <h3 className="text-sm my-2">Temperature: 
          <span className="font-bold m-2">
            { imperial ? (
              <span className="font-bold m-2">{currentCity.temp_f} {currentCity.temp && <span>F</span>}</span>
            ) : (
              <span className="font-bold m-2">{currentCity.temp} {currentCity.temp && <span>C</span>}</span>
            )}
          </span>
        </h3>
        <h3 className="text-sm my-2">Pressure: <span className="font-bold m-2">{ currentCity.pressure }</span></h3>
        <h3 className="text-sm my-2">Humidity: <span className="font-bold m-2">{ currentCity.humidity }</span></h3>
        <h3 className="text-sm my-2">Wind: 
          { imperial ? (
            <span className="font-bold m-2">{currentCity.wind_mile} {currentCity.wind_mile && <span>m/h</span>}</span>
          ) : (
            <span className="font-bold m-2">{currentCity.wind} { currentCity.wind && <span>km/h</span>}</span>
          )}
        </h3>
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
                  Min: <span className="font-bold m-2">
                    { imperial ? (
                      <span className="font-bold m-2">{weatherForecastArray[index].day.mintemp_f} F</span>
                    ) : (
                      <span className="font-bold m-2">{weatherForecastArray[index].day.mintemp_c} C</span>
                    )}
                  </span>
                </h4>
                <h4>
                  Max: <span className="font-bold m-2">
                    { imperial ? (
                      <span className="font-bold m-2">{weatherForecastArray[index].day.maxtemp_f} F</span>
                    ) : (
                      <span className="font-bold m-2">{weatherForecastArray[index].day.maxtemp_c} C</span>
                    )}
                  </span>
                </h4>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
