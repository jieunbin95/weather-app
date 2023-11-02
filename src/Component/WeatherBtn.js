import { Button } from 'react-bootstrap';
import React from "react";

const WeatherBtn = ({cities,selectedCity,currentWeather}) => {
  console.log(cities)
  return (
    <div className="btn">
      <Button onClick={()=>currentWeather("current")} variant="outline-light">Current Location</Button>
      

      {/* 자바를 쓸 때에는 {}로 먼저 입력 */}
      {cities.map((item)=>(
        <Button className='btn' variant={`${selectedCity === item ? "dark" : "outline-dark"}`} onClick={()=>currentWeather(item)}>{item}</Button>
      ))}
    </div>

    
  );
};

export default WeatherBtn;
