let firstCity = document.querySelector(".firstCity");
let secondCity = document.querySelector(".secondCity");
let thirdCity = document.querySelector(".thirdCity");

let degK = document.querySelector("#degK");
let degC = document.querySelector("#degC");

function getCityWeather(city, url){
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let cityName = data.name;
            let temperature = Math.round(data.main.temp);
            city.querySelector(".cityName").innerHTML = cityName;
            city.querySelector(".temperature").innerHTML = temperature + "&deg;C";
            city.querySelector(".clouds").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            city.querySelector(".windSpeed").innerHTML = data.wind.speed + "m/s";
            city.querySelector(".windDirection").style.transform = `rotate(${data.wind.deg}deg)`;
            city.querySelector(".pressure").innerHTML = data.main.pressure + "hPa";
            let timezone = data.timezone;
            city.querySelector(".sunrise").innerHTML = convertTime(data.sys.sunrise, timezone);
            city.querySelector(".sunset").innerHTML = convertTime(data.sys.sunset, timezone);

            let sideInfoAll = city.querySelectorAll(".sideInfo");
            for(let sideInfo of sideInfoAll){
                for (let i = 1; i < 8; i++){
                    let sideDiv = document.createElement("div");
                    sideDiv.innerHTML =  `${getForecastDate(i)} ${getForecastTemperature(31, 20)}&deg;C`;
                    sideInfo.append(sideDiv);
                }
            }

            // Degrees Buttons C & K

            degK.addEventListener("click", tempDegK);

            function tempDegK(){
                city.querySelector(".temperature").innerHTML = Math.round(data.main.temp + 273.15) + "&deg;K";
                this.classList.remove("degBtn-off");
                this.classList.add("degBtn-on");
                degC.classList.add("degBtn-off");
                for(let sideInfo of sideInfoAll){
                    sideInfo.innerHTML = "";
                    for (let i = 1; i < 8; i++){
                        let sideDiv = document.createElement("div");
                        sideDiv.innerHTML = `${getForecastDate(i)} ${Math.round(getForecastTemperature(31+273.15, 20+273.15))}&deg;K`;
                        sideInfo.append(sideDiv);
                    }
                }
            }


            degC.addEventListener("click", tempDegC);

            function tempDegC(){
                if (degK.hasAttribute("degBtn-off")){
                    return;
                } else {
                    city.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "&deg;C";
                    this.classList.remove("degBtn-off");
                    this.classList.add("degBtn-on");
                    degK.classList.add("degBtn-off")
                    for(let sideInfo of sideInfoAll){
                        sideInfo.innerHTML = "";
                        for (let i = 1; i < 8; i++){
                            let sideDiv = document.createElement("div");
                            sideDiv.innerHTML = `${getForecastDate(i)} ${Math.round(getForecastTemperature(31, 20))}&deg;C`;
                            sideInfo.append(sideDiv);
                        }
                    }
                }
            }
        })

        .catch(function (){
            console.log(error => error.message);
        })
}

getCityWeather(firstCity, "https://api.openweathermap.org/data/2.5/weather?id=703448&units=metric&appid=bf35cac91880cb98375230fb443a116f");
getCityWeather(secondCity, "https://api.openweathermap.org/data/2.5/weather?id=2643743&units=metric&appid=bf35cac91880cb98375230fb443a116f");
getCityWeather(thirdCity, "https://api.openweathermap.org/data/2.5/weather?id=5128638&units=metric&appid=bf35cac91880cb98375230fb443a116f");