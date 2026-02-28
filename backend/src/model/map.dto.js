export const mapa = (data) => {
    //array de la api
  return data.map(item => ({
    year: item.year,
    carbon: item.carbon || 0, // por si acaso 0
    country: item.countryName
  }));
};