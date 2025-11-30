import hostApi from "../../apis/host.api";

class ChargerService {
  constructor() {}

  async getAll() {
    return hostApi.get("/chargers");
  }

  async addCharger({
    title,
    location,
    type,
    power,
    amenities,
    price,
    imgFile,
  }: {
    title: string;
    location: {
      lat: number;
      lng: number;
    };
    type: string;
    power: number;
    amenities: string[];
    price: number;
    imgFile: File;
  }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", JSON.stringify(location));
    formData.append("type", type);
    formData.append("power", power.toString());
    formData.append("amenities", JSON.stringify(amenities));
    formData.append("price", price.toString());
    formData.append("file", imgFile);

    return hostApi.post("/charger", formData);
  }

  async updateCharger(id: string, data: any) {
    // TODO: Implement API call to update charger
    return null;
  }

  async deleteCharger(id: string) {
    // TODO: Implement API call to delete charger
    return false;
  }
}

export default ChargerService;
