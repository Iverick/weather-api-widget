import axios from "axios"

// http://api.weatherapi.com/v1/forecast.json
export default async (req, res) => {
  try {
    const city = req.query.city
    const weather = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=10`)  
    const data = weather.data
    return res.status(200).json({ message: "Sent successfully", mainData: data })
  } 
  catch(err) {
    console.log(err)
    return res.status(500).json({ message: "Internal server error" })
  }
}
