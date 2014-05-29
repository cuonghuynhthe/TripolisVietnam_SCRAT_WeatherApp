var ScratWeatherModule = angular.module('ScratWeatherModule',[]);
ScratWeatherModule.controller('ScratWeatherController',['$scope','$http',function($scope, http){
    //This function is used to get the weather data of current location
    $scope.getWeatherByCurrentLocation = function() {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function(position){
                url = 'weather/getcoordinateweather?lat=' + position.coords.latitude
                    + "&lon=" + position.coords.longitude;
                http({method: 'GET', url: url}).
                    success(function(data, status, headers, config) {
                        $scope.displaySelectedWeather(data);
                    })
            });
        }
    }

    //Initialize default data
    $scope.showcontent = false;
    $scope.favoriteslocation = JSON.parse(localStorage.getItem('favoriteslocation'))||[]
    $scope.units = "metric";
    $scope.tempSymbol = "C";
    var show = false;
    var showcontent = false;

    //If user allows to access current location, display the weather of this location
    $scope.getWeatherByCurrentLocation();

    //Controller function definitions

    $scope.addFavouriteCity= function(){
        var addToArray=true;

        for(var i=0; i<$scope.favoriteslocation.length; i++){
            if($scope.favoriteslocation[i].cityid === $scope.cityid){
                addToArray=false;
            }
        }
        if(addToArray){
                $scope.favoriteslocation.push({'cityname': $scope.cityname,'cityid': $scope.cityid,'country': $scope.country,'done':false})
                show = true;
        }
    }

    $scope.removeFavouriteCity = function(){
        $scope.favoriteslocation= $scope.favoriteslocation.filter(function(item){
            if(item.done==true && item.cityid == $scope.cityid)
            {
              show=false;
            }
            return !item.done;
        })
    }
    $scope.minusFavouriteCity= function(cityid){
        $scope.favoriteslocation= $scope.favoriteslocation.filter(function(item){
            if(item.cityid == $scope.cityid)
            {
                show=false;
            }
            return !(item.cityid == cityid);
        })
    }

    $scope.$watch('favoriteslocation',function(newValue,oldValue){
        if(newValue!=oldValue){
            localStorage.setItem('favoriteslocation',JSON.stringify(newValue))
        }
    },true)

    $scope.displaySelectedWeather = function(item){
        $scope.country =  item.sys.country;
        $scope.cityid = item.id;
        $scope.cityname= item.name;
        $scope.temp = item.main.temp;
        $scope.temp_min = item.main.temp_min;
        $scope.temp_max = item.main.temp_max;
        $scope.weatherdescription = item.weather[0].description;
        $scope.iconweather = item.weather[0].icon;
        $scope.showcontent = true;
        showcontent = true;
        for(var i=0; i<$scope.favoriteslocation.length; i++) {
            if($scope.favoriteslocation[i].cityid === $scope.cityid){
                show = true;
                break;
            }
            else
            {
                show = false;
            }
        }
        url = 'weather/getforecast/' + item.id + "?units=" + $scope.units;
        http({method: 'GET', url: url}).
            success(function(data, status, headers, config) {
                $scope.forecastData = data;
            })
    }

    $scope.displayWeatherbySelectFavourite = function(cityid){
        var url = '/weather/getweather/' + cityid + "?units=" + $scope.units;
        http({method: 'GET', url: url}).
            success(function(data, status, headers, config) {
                $scope.displaySelectedWeather(data);
            })

    }
    $scope.displayForecastDay = function (date) {
        //Define an array of days in a week
        var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        //Convert unix date to local date
        var forecastDate = new Date( date * 1000);
        var currentDate = new Date();

        //Get the day of week for each forecast day
        currentDay = weekday[currentDate.getDay()];
        forecastDay = weekday[forecastDate.getDay()];
        //If the forecast day is today, the text will be 'Today'
        if(currentDay == forecastDay)
        {
            return "Today";
        }
        //If the forecast day is tomorrow, the text will be 'Tomorrow'
        if(currentDate.getDay() == forecastDate.getDay() - 1)
        {
            return "Tomorrow";
        }
        return forecastDay;
    }
    $scope.switchTemperatureUnit = function () {
        var currentUnit = $scope.units;

        //Determine current temperature unit
        var btnSwitchTemp = $("#btnSwitchTemp");
        if(currentUnit == 'metric')
        {
            //Set the F symbol for the switch button
            btnSwitchTemp.html('F');
            $scope.units = 'imperial';
            $scope.tempSymbol = "F";
        }
        else
        {
            //Set the C symbol for the switch button
            btnSwitchTemp.html('C');
            $scope.units = 'metric';
            $scope.tempSymbol = "C";
        }

        //Change the data source url for the searching text box with appropriate temp unit
        $('#tags').autocomplete("option", { source: '/weather/searchweather?units=' + $scope.units });

        http({method: 'GET', url: 'weather/getweather/' + $scope.cityid + "?units=" + $scope.units})
            .success(function(data, status, headers, config) {
                $scope.displaySelectedWeather(data);
            })
    }
    $scope.showButton = function(){
        return show;
    }

}]);

ScratWeatherModule.filter('capitalize', function() {
    return function(input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
});
