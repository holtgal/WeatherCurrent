var apiError = "Error with API!";
var theTemp ="";
var theConditions ="";
var ipAdd;
var theCity;
var loc;            //format "lat, lon"
var apiKey = "1e993fd4687df43a86e24bf84e45812e";




$(document).ready(function (){  

//get lat long from ipinfo, send to weather api

   $.ajax({
    url: 'https://ipinfo.io/',
    data:{},
    dataType: 'json',
    success: coordinates    //store coordinates json data in coordinates
                 
    });

function coordinates(point){    //callback and parse coordinates
 var loc =point.loc, //lat, -lon
     theCity= point.city,
     theState = point.region;
  
  //weather api endpoint
  var api = 'https://api.darksky.net/forecast/1e993fd4687df43a86e24bf84e45812e/' + loc;
 
  getWeather(api); //insert th eurl for api into weather callback
 
 document.getElementById('city').innerHTML = theCity + ", " + theState;
} //end the coordinates  

  
  //Get the weather
function getWeather(url){
  $.ajax({
    url: url,
    data:{},
    dataType: 'jsonp',
    success: weather,
   
        
  });

  


} //end of getWEather

function weather(data){     //callback and parse weather data
    var theTemp = Math.round(data.currently.temperature);
    var fTemp = theTemp;
    var cTemp = Math.round((theTemp - 32)*(5/9));
    var theConditions = data.currently.summary;
    var iconRequest = data.currently.icon;

    
    
    document.getElementById('temp').innerHTML = theTemp + '\xB0';
    $("#far").addClass("active");
          celConvert(cTemp, theTemp, fTemp);
          farConvert(cTemp, theTemp, fTemp);
    
    document.getElementById('weather').innerHTML = theConditions;

//skycons
var icons = new Skycons({'color' : '#000000'});

var iconList = [
              "clear-day",
              "clear-night",
              "partly-cloudy-day",
              "partly-cloudy-night",
              "cloudy",
              "rain",
              "sleet",
              "snow",
              "wind",
              "fog"
          ];	

for (i = 0; i < iconList.length; i++) {
              if (iconRequest == iconList[i]) {
                      icons.set('icon', iconList[i]);
                  
              }
          }
          icons.play();//end of skycons


  }

//convert the temperature

function celConvert(cTemp, currentTemp, fTem) {
    $("#cel").click(function() {
      currentTemp = cTemp;
      $("#temp").html(currentTemp+ '\xB0');
      $("#far").removeClass("active");
      $("#cel").addClass("active");
  });  
  
}

function farConvert(cTemp, currentTemp, fTemp) {
  $("#far").click(function() {
      currentTemp = fTemp;
      $("#temp").html(currentTemp+ '\xB0');
      $("#cel").removeClass("active");
      $("#far").addClass("active");
  });
}//end of conversion tool



}); //end of document.ready

