import { useEffect, useState } from 'react'
import WeatherForm from './WeatherForm'
import WeaterMainInfo from './WeatherMainInfo'
import styles from './WeatherApp.module.css'

export default function WeatherApp(){
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    loadInfo()
  }, [])

  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ''}`
  }, [weather])

  async function loadInfo(city = 'London'){
    const url = `http://api.weatherapi.com/v1/current.json?key=01007df0520d475d94e183401222505&q=${city}&aqi=no`    
    try {
      const request = await fetch(url)    
      const json = await request.json()
      setWeather(json)
    } catch (error) {
      
    }    
  }

  function handleChangeCity(city){
    setWeather(null)
    loadInfo(city)
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity}/>
      {weather ? <WeaterMainInfo weather={weather} /> : <span>Cargando...</span>}
    </div>
  )
}