import axios from "axios";

export const getLatLngFromAdresse = async function(adresse,city) {
  try{
    let adresseComplete=encodeURIComponent(adresse+" "+city);
    let streetMapData = await  axios.get("https://nominatim.openstreetmap.org/search/"+adresseComplete+"?format=json")
    if(streetMapData && (streetMapData.error|| streetMapData.data.length<1)){
      throw new Error("Adress not found by openstreetMap");
    }else{
      return {lat:streetMapData.data[0].lat,lng:streetMapData.data[0].lon};
    }
  }catch(error){
    throw new Error("Probleme lors de la localisation de votre adresse. Veuillez être plsu précis.")
  }
};
