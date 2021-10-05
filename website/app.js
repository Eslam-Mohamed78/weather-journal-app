/* Global Variables */
const apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=c0a4d7574dc1af20ff21cc87a2770ad6";
const generator = document.getElementById("generate");
const dateElement = document.getElementById("date");
const tempElement = document.getElementById("temp");
const contentElement = document.getElementById("content");

// Create a new date instance dynamically with JS
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let d = new Date();
let newDate = `${d.getDate()}_${months[d.getMonth()]}_${d.getFullYear()}`;

// async function that gets information from OpenWeatherMap API.
const getWeather = async (x, y) => {
  const zipCode = document.getElementById("zip").value;

  const request = await fetch(x + zipCode + y);

  try {
    const allData = await request.json();
    console.log(allData);
    return allData;
  } catch (error) {
    console.log(`We Have Error: ${error}`);
  }
};

// POST request to add the API data, as well as data entered by the user.
const postWeather = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  try {
    const targetData = await res.json();
    console.log(targetData);
    return targetData;
  } catch (error) {
    console.log(`We Have Error: ${error}`);
  }
};

// getting data from the server after storing it.
const getSpecificInfo = async (url = "") => {
  const req = await fetch(url);
  try {
    const specificData = await req.json();
    dateElement.innerHTML = `<span>Date:</span> ${specificData.date}`;
    tempElement.innerHTML = `<span>Temp:</span> ${specificData.temp}`;
    contentElement.innerHTML = `I am feeling ${specificData.userResponse} today.`;
    console.log(specificData);
  } catch (e) {
    console.log(`We Have Error: ${e}`);
  }
};

generator.addEventListener("click", () => {
  const userFeeling = document.getElementById("feelings").value;

  getWeather(apiBaseUrl, apiKey)
    .then((allData) => {
      postWeather("/api/weatherInfo", {
        temperature: (allData.main.temp - 273).toFixed(2),
        date: newDate,
        userInput: userFeeling,
      });
    })
    .then(() => {
      getSpecificInfo("/api/serverData");
    });
});
