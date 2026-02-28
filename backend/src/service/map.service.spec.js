import { mapService } from './map.service.js';
import footprintApi from '../../footprintApi.js';

jest.mock('../../footprintApi.js');

describe('Map Service', () => {
  it('debe retornar la lista de emisiones formateada', async () => {
    footprintApi.getCountries.mockResolvedValue([{ countryCode: 1, countryName: 'Armenia' }]);
    footprintApi.getDataForCountry.mockResolvedValue([{ year: 2020, carbon: 1.2, countryName: 'Armenia' }]);

    const data = await mapService();

    expect(data).toBeInstanceOf(Array);
    expect(data[0].countryName).toBe('Armenia');
    expect(data[0].history[0].carbon).toBe(1.2);
  });
});