
var ScratWeatherModule = angular.module('ScratWeatherModule',[]);

ScratWeatherModule.controller('ScratWeatherController',['$scope',function($scope){
    $scope.favoriteslocation = JSON.parse(localStorage.getItem('favoriteslocation'))||[
        {
            cityname: "Hanoi",
            cityid: "1581130",
            country: "Vietnam",
            'done': false
        }
    ]
    var show = false;
    $scope.addTodo= function(){
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
    $scope.clearCompleted = function(){
        $scope.favoriteslocation= $scope.favoriteslocation.filter(function(item){
            return !item.done
        })
    }
    $scope.removeFL = function(){
        for(var i=0; i<$scope.favoriteslocation.length; i++) {
            if($scope.favoriteslocation[i].cityid === $scope.cityid){
                $scope.favoriteslocation.splice(i,1);
                show = false;
            }
        }
    }

    $scope.showButton = function(){
        return show;
    }

    $scope.$watch('favoriteslocation',function(newValue,oldValue){
        if(newValue!=oldValue){
            localStorage.setItem('favoriteslocation',JSON.stringify(newValue))
        }

    },true)

    $scope.displaySelectedWeather = function(item){
        $scope.keyss = item.name + ", " + item.sys.country;
        $scope.country =  item.sys.country;
        $scope.cityid = item.id;
        $scope.cityname= item.name;
        $scope.temp = item.main.temp;
        $scope.temp_min = item.main.temp_min;
        $scope.temp_max = item.main.temp_max;
        $scope.weatherdescription = item.weather[0].description;
        $scope.iconweather = item.weather[0].icon;
    }
}]);




