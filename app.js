const cityForm= document.querySelector('form');
const card= document.querySelector('.card');
const details= document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const temp=document.querySelector('.temp');
//update UI details
const updateUI= data =>{
	const cityDets=data.cityDets;
	const weather=data.weather;
	details.innerHTML= `
	<h5 class="my-3 ">${cityDets.EnglishName}</h5>
	<div class="my-3">${weather.WeatherText}</div>
	<div class="display-4 my-4">
		<span>${weather.Temperature.Metric.Value}</span>
		<span>&deg;C</span>
	</div>
	`;

	//update icon
	const iconSrc=`img/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src',iconSrc);

	//update image day or night
	const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
	time.setAttribute('src',timeSrc);

	if(card.classList.contains('d-none')){
		card.classList.remove('d-none');
	}
}

//update city when searching
const updateCity= async (city)=>{
	const cityDets=await getCity(city);
	const weather=await getWeather(cityDets.Key);
	return{cityDets,weather};
}

//listens after submit
cityForm.addEventListener('submit',e=>{
	e.preventDefault();
	const city=cityForm.city.value.trim();
	cityForm.reset();
	updateCity(city)
	.then(data => updateUI(data))
	.catch(err => temp.innerHTML=(`<h2>City not found</h2>`));
	scrollTo({
		top: document.documentElement.scrollHeight,
		behavior: 'smooth'
	  });
})
