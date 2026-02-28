import { getCountrys } from './map.controller.js';
import * as service from '../service/map.service.js';

describe('Map Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  it('debe responder con json y estatus 200', async () => {
    const mockData = [{ countryName: 'Mexico', history: [] }];
    jest.spyOn(service, 'mapService').mockResolvedValue(mockData);

    await getCountrys(req, res);

    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debe responder error 500 si el service falla', async () => {
    jest.spyOn(service, 'mapService').mockRejectedValue(new Error('API Down'));

    await getCountrys(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Error al obtener las datos" }));
  });
});