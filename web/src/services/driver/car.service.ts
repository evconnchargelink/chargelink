import driverApi from "../../apis/driver.api";


export type CarType = {
  _id: string;
  name: string;
  thumbnail: string;
  estimatedTime: number;
  power: number;
};

class CarService {
  constructor() {}

  async getAll() {
    return driverApi.get("/cars");
  }

  async addCar(
    name: string,
    power: number,
    estimatedTime: number,
    image: File
  ) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("power", power.toString());
    formData.append("estimatedTime", estimatedTime.toString());
    formData.append("file", image);

    return driverApi.post("/add-car", formData);
  }
}

export default CarService;
