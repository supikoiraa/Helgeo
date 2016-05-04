
var global_markers = [];   
var markers=[];
var map;

//initialize map
function initMap() {
    var latlng = new google.maps.LatLng(60.25, 25.00);
    //setup map's attributes
    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
      };

  
  function getData()
  {
        // get selected status code from selectbox
        var status = $('select option:selected').text();

        // make AJAX call
        $.get('data' + status, function (data) {
          //parse Json string to Json object
         var dataSet = JSON.parse(data);
        for(var item in dataSet) { 
         //push data to markers array
        markers.push([dataSet[item].lat, dataSet[item].long ,dataSet[item].description, dataSet[item].status]);
        
    }       //run addmarker function
           addMarker();      
        });
  };
   

   
   
function addMarker() {
    geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow({});  
    for (var i = 0; i < markers.length; i++) {
        
        // obtain the attributes of each marker
        var lat = parseFloat(markers[i][0]);
        var lng = parseFloat(markers[i][1]);
        var trailhead_name = markers[i][2];
        var status = markers[i][3];
        var myLatlng = new google.maps.LatLng(lat, lng);
        var contentString = "<html><body><div><p><h3>" + trailhead_name + "</h3></p></div></body></html>";
     
        //check whether the status is closed/open and select icon image
        if(status == "closed")
        {
             var image = "/lock.png"
        }
        else{
        var image = "/open.png"
        }
        //setup marker
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: "Coordinates: " + lat + " , " + lng + " | Trailhead name: " + trailhead_name,
            icon:image
        });
        
        //put contentString as markers infowindow attribute
        marker['infowindow'] = contentString;
        
        //Push marker to end of global_markers to keep track of all markers
        global_markers.push(marker);
        
        //add eventlistener for pop-up windows to show 
        google.maps.event.addListener(global_markers[i], 'click', function() {
            infowindow.setContent(this['infowindow']);
            infowindow.open(map, this);
        });
    }
};

function deleteMarkers(){
   // set array length to 0 for later use
  markers.length = 0;
    for(i=0; i<global_markers.length; i++){
        //set setMap to null to clear all markers
        global_markers[i].setMap(null);
    }

}