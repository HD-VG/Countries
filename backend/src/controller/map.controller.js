import { mapService } from '../service/map.service.js';

export const getCountrys = async (req, res) => {
  try {
    const data = await mapService();
    res.json(data); // solo lo necesario
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las datos" });
  }
};