import './App.css';
// 부트스트랩 css파일
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./Component/WeatherBox";
import WeatherBtn from "./Component/WeatherBtn";
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from 'react';

//1.앱이 실행되자마자 현재 위치 기반의 날씨가 보인다
//2.날씨 정보에는 도시,섭씨,화씨,날씨의 상태를 보여준다
//3.5개의 버튼이 있다(1개는 현재위치, 나머지는 다른 도시)
//4.도시버튼을 클릭할 때마다 도시별 날씨가 나온다
//5.현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6.데이터를 들고오는 동안 로딩스피너가 작동된다

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  //다른 곳에서 쓰일만한 부분은 어레이로 정리 해주기(*나라별 이름)
  const cities = ["New York", "Paris", "Canberra", "London", "Ottawa"];

  const getCurrentLocation = () => {
    // 현재 위치의 경도/위도를 찾아주는 함수
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getCurrentWeatherLocation(lat, lon);
    });
  };

  const setCurrentWeather = (city) => {
    if (city === "current") {
      setCity(" ");
    } else {
      setCity(city);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d7b889803d56cd0cc32310fd72d8d695&units=metric`;

      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      console.log(response);
      console.log('데이터는',data);

      setWeather(data);
      setLoading(false);
    } catch (error) {
      setAPIError(error.message);
      
    }
  };

  // 현재 위치의 온도 api
  const getCurrentWeatherLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d7b889803d56cd0cc32310fd72d8d695&units=metric`;

      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();

      console.log("날씨", data);
      setWeather(data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setAPIError(error.message);
    }
  };

  useEffect(() => {
    if (city === " ") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <HashLoader color="#d9a3e9" loading={loading} />
        </div>
      ) : !apiError ? (
        <div className="container">
          <h1>오늘의 날씨</h1>
          <WeatherBox weather={weather}></WeatherBox>
          <WeatherBtn
            cities={cities}
            selectedCity={city}
            currentWeather={setCurrentWeather}
          ></WeatherBtn>
        </div>
      ) : (setAPIError)}
    </div>
  );
}

export default App;
