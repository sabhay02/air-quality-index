const latinp=document.querySelector("#latitude");
const loninp=document.querySelector("#longitude");
const airquality=document.querySelector(".air-quality");
const airquailtysts=document.querySelector(".air-quality-status");
const searchbtn=document.querySelector(".search-btn");
const errorlbl=document.querySelector("label[for='error-msg']");
const componentele=document.querySelectorAll(".component-val");

const apiid="";
const link="https://api.openweathermap.org/data/2.5/air_pollution";

const getuserlocation=()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onpossition,onpositionerror);
    }else{
        onpositionerror({message :"can't access location. Try again"});
    }
}

const onpossition=pos=>{
    let lat=pos.coords.latitude.toFixed();
    let lon=pos.coords.longitude.toFixed();

    latinp.value=lat;
    loninp.value=lon;
    getairquailty(lat,lon);
}

const getairquailty = async (lat, lon) => {
    try {
        const response = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${apiid}`);
        if (!response.ok) throw new Error("Failed to fetch air quality data.");
        const airdata = await response.json();
        setValuesOfAir(airdata);
        componentofair(airdata);
    } catch (err) {
        onpositionerror(err);
    }
};


const setValuesOfAir = airData => {
	const aqi = airData.list[0].main.aqi;
	let airStat = "", color = "";

	// Set Air Quality Index
	airquality.innerText = aqi

	// Set status of air quality

	switch (aqi) {
		case 1:
			airStat = "Good"
			color = "rgb(19, 201, 28)"
			break
			case 2:
				airStat = "Fair"
				color = "rgb(15, 134, 25)"
				break
			case 3:
				airStat = "Moderate"
				color = "rgb(201, 204, 13)"
				break
			case 4:
				airStat = "Poor"
				color = "rgb(204, 83, 13)"
				break
		case 5:
			airStat = "Very Poor"
			color = "rgb(204, 13, 13)"
			break
		default:
			airStat = "Unknown"
	}

	airquailtysts.innerText = airStat;
	airquailtysts.style.color = color;
}
const componentofair=airdata=>{
    let components = {...airdata.list[0].components}
	componentele.forEach(ele => {
		const attr = ele.getAttribute('data-comp')
		ele.innerText = components[attr] += " μg/m³"
	})
}

const onpositionerror=e=>{
    errorlbl.innerText=e.message;
}
searchbtn.addEventListener("click",()=>{
    let lat=parseFloat(latinp.value).toFixed(4);
    let lon=parseFloat(loninp.value).toFixed(4);
    getairquailty(lat,lon);
})
getuserlocation();