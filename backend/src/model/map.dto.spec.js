import { mapa } from './map.dto.js';
import * as chai from 'chai';
const expect = chai.expect;   

describe('Map DTO', () => {
  it('debe transformar los datos de la API al formato correcto', () => {
    const apiData = [
      { year: 1961, carbon: 2.5, countryName: 'Ecuador', extra: 'basura' }
    ];
    
    const resultado = mapa(apiData);
    
    expect(resultado[0]).to.deep.equal({
      year: 1961,
      carbon: 2.5,
      country: 'Ecuador'
    });
    
    expect(resultado[0]).to.not.have.property('extra');
  });

  it('debe poner carbon en 0 si viene nulo', () => {
    const apiData = [{ year: 2022, carbon: null, countryName: 'Test' }];
    const resultado = mapa(apiData);

    expect(resultado[0].carbon).to.equal(0);
  });
});