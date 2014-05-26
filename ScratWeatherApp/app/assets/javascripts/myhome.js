
var myFL = angular.module('myFL',[]);

myFL.controller('myFlCtrl',['$scope',function($scope){
    $scope.myfavorites = JSON.parse(localStorage.getItem('myfavorites'))||[
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
        for(var i=0; i<$scope.myfavorites.length; i++){
            if($scope.myfavorites[i].city === $scope.keyss){
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
                $scope.myfavorites.push({'city': $scope.keyss,'done':false})
                $scope.newCity='';
                show = true;
            }

        }
    }
    $scope.clearCompleted = function(){
        $scope.myfavorites= $scope.myfavorites.filter(function(item){
            return !item.done
        })
    }
    $scope.removeFL = function(){
        for(var i=0; i<$scope.myfavorites.length; i++) {
            if($scope.myfavorites[i].city === $scope.keyss){
                $scope.myfavorites.splice(i,1);
                show = false;
            }
        }
    }

    $scope.showButton = function(){
        return show;
    }

    $scope.$watch('myfavorites',function(newValue,oldValue){
        if(newValue!=oldValue){
            localStorage.setItem('myfavorites',JSON.stringify(newValue))
        }

    },true)

    $scope.doSomething = function(){
        $scope.myfavorites.push({'city':$scope.keyss,'done':false})
    }
}]);




