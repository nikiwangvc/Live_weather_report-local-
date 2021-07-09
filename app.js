//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const appid = "da2a94256142d552900a1e54297c1f9c";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
  https.get(url,function(response){
    response.on("data",function(data){
      const weather_data = JSON.parse(data);
      const temp = weather_data.main.temp;
      const weatherDescription = weather_data.weather[0].description;
      const icon = weather_data.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
      res.write("<img scr=" + imgURL + ">");
      res.send();
    });
  });
});
app.listen(3000, function(){
  console.log("server is running on port 3000.");
});
