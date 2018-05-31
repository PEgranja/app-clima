var proxy = 'https://cors-anywhere.herokuapp.com/';
var api ="https://api.darksky.net/forecast/0ba00749ad942033886c1a8f475d460d/";

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
    }   
})

$("#botonActualizar").click(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
    } 
})

function mostrarPosicion(position) {
    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude;
    getUbicacion(latitud, longitud);
    var urlString = proxy + api + latitud + "," + longitud;
    
     $.ajax({
           url: urlString
        
       }).then(function(data) {
         console.log(data)
         
         $('.temperature').text(data.currently.temperature + String.fromCharCode(176));
         var humidityPorcentage = Math.round(data.currently.humidity * 100);
         $('.humidity').text(humidityPorcentage + "%");
         $('.icon').text(data.currently.icon.toUpperCase());
         var precipPorcentage = Math.round(data.currently.precipProbability * 100);
         $('.precip').text(precipPorcentage + "%");
         $('.summary').text(data.currently.summary);
       });
    
}

function mostrarError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Usuario no da permiso de Geolocalización");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("No existe información de Geolocalización");
            break;
        case error.TIMEOUT:
            alert("El pedido de Geolocalización del usuario expiró");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ha ocurrido un error desconocido");
            break;
    }
}

function getUbicacion(latitud, longitud) {
    var  geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitud, longitud);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
          console.log(results)
          if(results[1]) {
              var ubicacion = results[4].formatted_address;
              $('.ubicacion').html(results[4].formatted_address);
          } else {
              alert("No se encontró la información");
          }
      } else {
          alert("Geocoder falló debido a: " + status);
      }
    });
}



