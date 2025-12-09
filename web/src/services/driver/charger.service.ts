import driverApi from "../../apis/driver.api";

class ChargerService {
  constructor() {}

  async getAll() {
    return driverApi.get("/chargers");
  }

  async getOne(id: string) {
    return driverApi.get(`/chargers/${id}`);
  }
}

export default ChargerService;
