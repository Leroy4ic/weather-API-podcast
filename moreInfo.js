let moreInfo = document.querySelectorAll(".moreInfoHide");
let btnsArrows = document.querySelectorAll(".moreInfoArrow");

//показать/скрыть moreInfo
for (let btnArrow of btnsArrows){
    btnArrow.addEventListener("click", function (){
        btnArrow.nextElementSibling.classList.toggle("moreInfoShow");
        if (btnArrow.style.transform == "rotate(180deg)"){
            btnArrow.style.transform = "rotate(0deg)";
        }
        else {btnArrow.style.transform = "rotate(180deg)"}
    })
}

function getForecastTemperature(max, min){
    let forecastTemperature = Math.floor(Math.random() * (max - min + 1)) + min;
    if (degK.hasAttribute("degBtn-on")){
        return forecastTemperature + 273.15 + "&deg;K";
    }
    else {
        return forecastTemperature
    }

}