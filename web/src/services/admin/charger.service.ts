import adminApi from "../../apis/admin.api";

class ChargerService {
  constructor() {}

  getAll(){
    return adminApi.get("/chargers");
  }
}

export default ChargerService;
