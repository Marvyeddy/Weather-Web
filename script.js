const input = document.querySelector('input');
const button = document.querySelector('button');
const temperature = document.getElementById('temperature');
const cityName = document.getElementById('name');
const humid = document.getElementById('humid');
const wind = document.getElementById('wind');
const weather = document.getElementById('weather');
const container = document.getElementById('.weather');

button.addEventListener('click', () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=655e249e7b94a5237ec896d03e2e4e5d&units=metric`;

  async function render() {
    const res = await fetch(apiUrl);

    if (res.status == 404) {
      document.querySelector('.error').style.display = 'block';
      container.style.display = 'none';
    } else {
      const data = await res.json();
      const {
        name,
        main: { temp, humidity },
        wind: { speed },
      } = data;
      cityName.textContent = name;
      humid.textContent = `${humidity}%`;
      temperature.textContent = Math.round(temp) + '⁰C';
      wind.textContent = `${speed}km/hr`;

      if (data.weather[0].main == 'Clouds') {
        weather.src = 'static/images/clouds.png';
      } else if (data.weather[0].main == 'Clear') {
        weather.src = 'static/images/clear.png';
      } else if (data.weather[0].main == 'Rain') {
        weather.src = 'static/images/rain.png';
      } else if (data.weather[0].main == 'Drizzle') {
        weather.src = 'static/images/drizzle.png';
      } else if (data.weather[0].main == 'Mist') {
        weather.src = 'static/images/mist.png';
      }

      document.querySelector('.weather').style.display = 'block';
      document.querySelector('.error').style.display = 'none';
      container.style.display = 'none';
    }
  }

  render();
  input.value = '';
});
