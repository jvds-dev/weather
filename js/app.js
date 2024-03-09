function get_weather(city){

    const url = 'https://jvds.pythonanywhere.com/weather/' + city;
    // const url = 'http://127.0.0.1:5000/weather/' + city

    fetch(url)
    .then(response  => response.json())
    .then(data => {
        console.log(data);

        const city_name = data.name;
        const temp_value = data.main.temp - 273.15;
        const feels_temp_value = data.main['feels_like'] - 273.15;
        const min_temp_value = data.main['temp_min'] - 273.15 - 8;
        const max_temp_value = data.main['temp_max'] - 273.15 + 2;
        const icon_id = data.weather[0]['icon'];
        const icon_src = `https://openweathermap.org/img/wn/${icon_id}@4x.png`;
        const code = data.weather[0]['id'];
        const condition_code = checkConditionCode(code);
        const description = data.weather[0]['description'];

        displayData(city_name, 
                    temp_value.toFixed(0), 
                    feels_temp_value.toFixed(0), 
                    min_temp_value.toFixed(0), 
                    max_temp_value.toFixed(0),
                    icon_src,
                    condition_code,
                    description)
    })
    .catch(error => {
        console.error('Erro ao buscar dados', error);
    });
}

function displayData(city_name, 
                     temp_value, 
                     feels_temp_value, 
                     min_temp_value, 
                     max_temp_value, 
                     icon_src, 
                     condition_code, 
                     description){

    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const feelsTempElement = document.getElementById('feels-temp');
    const minTempElement = document.getElementById('min-temp');
    const maxTempElement = document.getElementById('max-temp');
    const iconElement = document.getElementById('icon');
    const bgElement = document.getElementById('main');
    const descriptionElement = document.getElementById('description');


    cityNameElement.textContent = city_name;
    temperatureElement.textContent = temp_value + '°C';
    feelsTempElement.textContent = feels_temp_value + '°C';
    minTempElement.textContent = min_temp_value + '°C';
    maxTempElement.textContent = max_temp_value + '°C';
    iconElement.src = icon_src; 
    descriptionElement.textContent = description;

    const date = document.getElementById('date');
    const dateTime = new Date();
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    date.textContent = `${dateTime.getDate()} de ${months[dateTime.getMonth()]}, ${dateTime.getFullYear()}`

    // bgElement.style.backgroundImage = `url(../images/${condition_code}.jpg)`
    bgElement.style.backgroundImage = `url(https://github.com/jvds-dev/weather/blob/main/images/${condition_code}.jpg?raw=true)`

}

get_weather('Palmares')


function toggleSearch(){
    const toggleBtn = document.getElementById('toggle-input');
    const searchContainer = document.getElementById('search-container');

    if(searchContainer.classList.contains('active')){
        searchContainer.classList.remove('active');
        toggleBtn.classList.remove('active');
    }
    else{
        searchContainer.classList.add('active');
        toggleBtn.classList.add('active');
    }
    
}

const weathers = {'thunderstorm': [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
                  'rain': [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
                  'snow': [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
                  'fog': [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
                  'clear':[800],
                  'cloud': [801, 802, 803, 804]}
function checkConditionCode(code){

    for(let condition in weathers){
        if(weathers[condition].includes(code)){
            return condition;
        }
    }
    return null;
    
}

function search(){
    // const searchBtn = document.getElementById('search');
    const inputElement = document.getElementById('input');
    const inputValue = inputElement.value;

    if(inputValue != null && inputValue != ''){
        get_weather(inputValue);
        inputElement.value = ''
        toggleSearch();
    }

}

document.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        search();
    }
})