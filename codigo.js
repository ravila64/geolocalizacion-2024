/** @type {HTMLElement} */
var posElt;
/** @type {HTMLElement} */
var posLinkElt;

window.addEventListener('load', function(){
    posElt = this.document.getElementById('pos');
    posLinkElt = this.document.querySelector('#posLink > a');
    if (this.navigator.geolocation){
        this.navigator.geolocation.getCurrentPosition(geoposOK, geoposError);
    }else{
        console.log("No funciona el navigator !!!");
    }
});

/** @param {GeolocationPosition} pos */
function geoposOK(pos){
    // obtenermos lat, long
    var date = pos.timestamp.toString;
    var lat= pos.coords.latitude;
    var long = pos.coords.longitude;
    var alti = pos.coords.altitude || 0;
    var grados = pos.coords.heading;
    var precision = pos.coords.accuracy || 0;
    var veloc_mxs = pos.coords.speed || 0;
    // imprimir datos posicion
    imprimeDatos(date,lat,long,alti,grados,precision,veloc_mxs);
    // mostramos la posicion
    posElt.textContent = `${lat} ${long}`;
    // generamos enlace a la posicion
    posLinkElt.href=`https://maps.google.com/?q=${lat},${long}`;
    posLinkElt.textContent = 'Mostrar tu posicion en un mapa';
};

function imprimeDatos(date,lat,long,alti,grados,precision,veloc_mxs){
    console.log("datos del objeto");
    console.log("Fecha ",date.GeolocationPosition);
    console.log("Latitud ",lat);
    console.log("Longitud ",long);
    console.log("Altitud ", alti!==0 ? alti: "indefinida");
    console.log("Precision ",precision!==0 ? precision + " mts" : "No definida");
    console.log("Velocidad maxima ", veloc_mxs===0 ? "Estacionado ": veloc_mxs+" mt x seg");
};

/** @param {GeolocationPositionError} err */

function geoposError(err){
  console.warn(err.message);
  switch (err.code) {
    case err.PERMISSION_DENIED:
        msg="no han dado permiso para obtener la posicion";
        break;
    case err.POSITION_UNAVAILABLE:
        msg="Tu posicion actual no esta disponible";
        break;
    case err.TIMEOUT:
        msg="no se ha obtenido la posicion en el tiempo prudencial ";
        break;
    default:
        msg="Error desconocido";
        break;
  }
  posElt.textContent=msg;   
}
