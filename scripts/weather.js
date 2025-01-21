var form = document.querySelector("#weatherForm");
var context = document.querySelector("#weatherChart");

var searchCountry = document.querySelector("#city");

var weather_chart;

var positionValue = ["","",""];


//Affichage des ville correspondantes
function displayCountry(data) {
  console.log(data);
  let infoCountry = document.querySelector("#country").value;
   
  infoCountry === "" ? alert("Aucune ville trouver") :
  data.results.forEach((element) => {
    let elementSearch = document.createElement("option");
    let dataName = element.name;
    let dataLatitude = element.latitude;
    let dataLongitude = element.longitude;
    let dataCountryCode = element.country_code;

    elementSearch.innerText = "";
    positionValue[0] = dataLatitude;
    positionValue[1] = dataLongitude;
    positionValue[2] = dataCountryCode;
    elementSearch.innerText = `${dataName}   ${dataLatitude}°N  ${dataLongitude}°E - Code pays: ${dataCountryCode} `;


    elementSearch.setAttribute("class", "select");
    elementSearch.setAttribute("value", positionValue);
    searchCountry.appendChild(elementSearch);
    

    
    
  });

  
}

//RENVOI LES COORDONEES DE LA VILLE SELECTIONNE
searchCountry.addEventListener("change", function () {
  console.log(this.value);
  let flagCountry = document.querySelector("#flag");
  let latitude = document.querySelector("#latitude");
  let longitude = document.querySelector("#longitude");
  let citySelected = this.value.split(',');
  let imageExist = document.querySelector("#exist");
  
  latitude.setAttribute("value",citySelected[0]);
  longitude.setAttribute("value", citySelected[1]);
  let codeCountry = citySelected[2].toLowerCase();

    
  if(imageExist){
    console.log("hey")
    let attributes = {
      'id' : "exist",
      'src': `https://flagcdn.com/16x12/${codeCountry}.png`,
      'srcset': `https://flagcdn.com/32x24/${codeCountry}.png 2x, https://flagcdn.com/48x36/${codeCountry}.png 3x`,
      'width': '16',
      'height': '12',
      'alt': codeCountry
      
    };
    for(var[key,value] of Object.entries(attributes)){
      imageFlag.setAttribute(key,value)
    };
    
  }else{
    let imageFlag = document.createElement("img");
    let attributes = {
      'id' : "exist",
      'src': `https://flagcdn.com/16x12/${codeCountry}.png`,
      'srcset': `https://flagcdn.com/32x24/${codeCountry}.png 2x, https://flagcdn.com/48x36/${codeCountry}.png 3x`,
      'width': '16',
      'height': '12',
      'alt': codeCountry
      
    };
    for(var[key,value] of Object.entries(attributes)){
      imageFlag.setAttribute(key,value)
    };

    flagCountry.insertBefore(imageFlag, flagCountry.firstChild);


  }
  
    
  
});

//AFFICHE LES 10 VILLES CORRESPONDANT A REQUETE
city.addEventListener("click", (e) => {
  e.preventDefault();

  let infoCountry = document.querySelector("#country").value;
  let geocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${infoCountry}&count=10&language=en&format=json`;

  fetch(geocoding)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Donnée inaccessible : " + response.status);
    })
    .then((responseData) => displayCountry(responseData))
    .catch((error) => alert("Erreur: " + error.message));
});

//RECUPERATION DES DONNEES DE L'API OPEN METEO
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");
  const forecastDays = formData.get("forecast_days");

  let weather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=${forecastDays}`;

  fetch(weather)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Donnée inaccessible : " + response.status);
    })
    .then((responseData) => getDataAndDraw(responseData))
    .catch((error) => alert("Erreur: " + error.message));

});

//RECUPERATION DES DONNEES DE L'API OPEN METEO
function getDataAndDraw(data) {
  let labels = data.hourly.time;
  console.log(labels);

  let dataSets = data.hourly.temperature_2m;
  console.log(dataSets);

  //CONFIGURATION DU GRAPHIQUE
  if (weather_chart) {
    weather_chart.destroy();
  }

  //GRAPHIQE
  weather_chart = new Chart(context, {
    type: "line",
    options: {
      animation: false,
      plugins: {
        tooltip: {
          enabled: false,
        },
      },
      responsive: true,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour",
          },
        },
      },
      legend: { display: false },
    },
    data: {
      labels: labels,
      datasets: [
        {
          fill: false,
          lineTension: 0.5,
          data: dataSets,
        },
      ],
    },
  });
}
