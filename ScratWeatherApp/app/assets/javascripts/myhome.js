
var ScratWeatherModule = angular.module('ScratWeatherModule',[]);

ScratWeatherModule.controller('ScratWeatherController',['$scope',function($scope){
    $scope.favoriteslocation = JSON.parse(localStorage.getItem('favoriteslocation'))||[
        {
            city: "Ho Chi Minh",
            keycity: "HCM",
            zcode:'70999'
        },
        {
            city: "Ha Noi",
            keycity: "HN",
            zcode:'10999'
        }
    ]
    var show = false;
    $scope.addTodo= function(){
        var addToArray=true;
        for(var i=0; i<$scope.favoriteslocation.length; i++){
            if($scope.favoriteslocation[i].city === $scope.keyss){
                addToArray=false;
            }
        }
        if(addToArray){
            var nullcheck=true;
            if( $scope.keyss === null)
            {
                nullcheck=false;
            }
            if(nullcheck){
                $scope.favoriteslocation.push({'city': $scope.keyss,'done':false})
                $scope.newCity='';
                show = true;
            }

        }
    }
    $scope.clearCompleted = function(){
        $scope.favoriteslocation= $scope.favoriteslocation.filter(function(item){
            return !item.done
        })
    }
    $scope.removeFL = function(){
        for(var i=0; i<$scope.favoriteslocation.length; i++) {
            if($scope.favoriteslocation[i].city === $scope.keyss){
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
}]);




