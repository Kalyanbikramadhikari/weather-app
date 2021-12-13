
import React, { useState , useEffect} from 'react';
import "./style.css";
function Temp() {
    const [searchValue , setSearchValue] = useState('kathmandu');
    const [tempinfo, settempinfo]= useState({})
 
    // for on click of search button
    const getWeatherInfo = async()=>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metic&appid=515412e52170b30cb2bb267f8c3a1e01`;
            const res =  await fetch(url);
            const data = await res.json()
            
            const {temp,humidity, pressure} = data.main
            
            const {main:weathermood}= data.weather[0] 
            const {name}= data;
            const {speed} = data.wind
            const {counrty, sunset}= data.sys
            const myNewWeatherInfo= {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                counrty,
                sunset 
            }
            settempinfo(myNewWeatherInfo)
            console.log(data)
            
        }
        catch(error){
            console.log(error);
        }
 
    }
   useEffect(() => {
      getWeatherInfo();
   },  );

   let sec = tempinfo.sunset;
   let date = new Date(sec * 1000);
   let timeStr = `${date.getHours()}: ${date.getMinutes()}`
    return ( 
        <div >
            <div className = "wrap">
                <div className = "search">
                    <input type="search" name="" placeholder="search......" autoFocus id  = "search" className ="searchTerm" value ={searchValue} onChange = { (e)=>setSearchValue(e.target.value)}/>
                </div>
                <button className ="searchButton" type= "button" onClick = {getWeatherInfo}>Search</button>
            </div>
            <article className = "widget">
                <div className = "weatherIcon">
                <i className = {"wi wi-day-fog"}></i>
                
                </div>
                <div className ="weatherInfo">
                    <div className = "temperature">
                        <span> {tempinfo.temp}&deg;</span>
                    </div>
                    <div className ="description">
                        <div className = "weatherCondition">
                            {tempinfo.weathermood}
                        </div>
                        <div className ="place">
                            {tempinfo.name} 
                        </div>
                    </div>
                    
                </div>

                <div className ="date">
                    {new Date().toLocaleString()}
                </div>
                <div className = "extra-temp">
                    <div className ="temp-info-minmax">
                        <div className = "two-sided-section">
                            <p><i className = {"wi wi-sunset"}> </i></p>
                            
                            <p className = "extra-info-leftside"> {timeStr} PM<br/>Sunset</p>
                        </div>
                        <div className = "two-sided-section">
                            <p><i className = {"wi wi-humidity"}> </i></p>
                            <p className = "extra-info-leftside">{tempinfo.humidity} Humidity</p>
                        </div>
                    </div>
                        <div className = "weather-extra-info">
                            
                        
                            <div className = "two-sided-section">
                                <p><i className = {"wi wi-rain"}> </i></p>
                                <p className = "extra-info-leftside"> {tempinfo.pressure} Pressure</p>
                            </div>
                            <div className = "two-sided-section">
                                <p><i className = {"wi wi-strong-wind"}> </i></p>
                                <p className = "extra-info-leftside"> {tempinfo.speed} Speed</p>
                            </div>
                        </div>
                    </div>
                
            </article>
        </div>
     );
}

export default Temp;