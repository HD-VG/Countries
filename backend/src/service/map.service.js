import footprintApi from '../../footprintApi.js';
import { mapa } from '../model/map.dto.js';

export const mapService = async () => {
  const country = await footprintApi.getCountries();

  const selected = country.slice(0, 10);
  
  const allEmissions = [];
  for (const country of selected) {
    const rawData = await footprintApi.getDataForCountry(country.countryCode);
    //el dto pasa mandar solo lo necesario
    allEmissions.push({
      countryName: country.countryName,
      history: mapa(rawData)
    });
  }

  return allEmissions;
};