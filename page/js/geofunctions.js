/*
$(document).ready(function(){
 TEST(); 
});
*/
var global_markers = [];   
var markers=[];
var map;

function initMap() {
   geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(60.25, 25.00);
    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
      }

/*
   function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
 */  

(function ($) {
    $('#button').on('click', function () {
        // remove resultset if this has already been run
        $('.content ul').remove();
        // add spinner to indicate something is happening
        $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
        
        // get selected status code from selectbox
        var status = $('select option:selected').text();

        // make AJAX call
        $.get('data' + status, function (data) {
         var dataSet = JSON.parse(data);
         var tableContent= '';
        for(var item in dataSet) { 

      
        markers.push([dataSet[item].lat, dataSet[item].long ,dataSet[item].description]);
        // one by one get and add fortable
     //   tableContent += '<tr>';
        // this all added into the tableContent variable
     //   tableContent += '<td>'+dataSet[item].lat + dataSet[item].long + '</td>'; 


        //add variable into table id of data
        $('#data').html(tableContent); // add into the table
        } 
        
        });
      //  console.log(markers);
addMarker();
}) 
})(jQuery);

function addMarker() {
var infowindow = new google.maps.InfoWindow({});
//var markers = [[60.2264114, 25.1672193, 'trialhead0'], [60.2409844, 24.9495069, 'trialhead1'], [60.2795157, 24.9912161, 'trialhead2']];
  
    for (var i = 0; i < markers.length; i++) {
        // obtain the attribues of each marker
        var lat = parseFloat(markers[i][0]);
        var lng = parseFloat(markers[i][1]);
        var trailhead_name = markers[i][2];
        console.log("lat "+lat+ " long "+lng +" trailhead "+ trailhead_name)
        var myLatlng = new google.maps.LatLng(lat, lng);
        var contentString = "<html><body><div><p><h2>" + trailhead_name + "</h2></p></div></body></html>";

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: "Coordinates: " + lat + " , " + lng + " | Trailhead name: " + trailhead_name
        });

        marker['infowindow'] = contentString;

        global_markers[i] = marker;

        google.maps.event.addListener(global_markers[i], 'click', function() {
            infowindow.setContent(this['infowindow']);
            infowindow.open(map, this);
        });
    }
}