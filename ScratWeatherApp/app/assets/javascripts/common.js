var flagURL = 'http://openweathermap.org/images/flags/';
$(function() {
    $( "#tags" ).autocomplete({
        source: '/weather/searchweather',
        focus: function(event, ui) {
            return false;
        },
        select: function(event, ui) {
            $(this).val( ui.item.name + ', ' + ui.item.sys.country );
            var scope = getScope();
            scope.$apply(function(){
                scope.displaySelectedWeather(ui.item);
            });
            return false;
        },
        response: function( event, ui ) {
            if (!ui.content.length) {
                $("#resultMsg").show();
            }
            else
            {
                $("#resultMsg").hide();
            }
        },
        search: function( event, ui ) {
            $("#resultMsg").hide();
        }
    }).data( "ui-autocomplete" )._renderItem = function(ul, item) {
        var scope = getScope();
        return $( "<li>" )
            .append( "<a>" + "<b>" + item.name + ', ' + item.sys.country + "</b>" +" <img alt='' src='" + flagURL
                + item.sys.country.toLowerCase() + ".png"  +  "'/> " + item.weather[0].description
                + "<br>" + item.main.temp + '°' + scope.tempSymbol + ' | temperature from ' + item.main.temp_min +'°'
                + scope.tempSymbol + ' to ' + item.main.temp_max + '°' + scope.tempSymbol + "</a>" )
            .appendTo( ul );
    };
});
function getScope() {
    return angular.element($("html .ng-scope")).scope();
}