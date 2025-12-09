import hostApi from "../../apis/host.api";


export type ChargerType = {
  _id: string;
  title: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  chargerType: string;
  power: number;
  price: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
};


class ChargerService {
  constructor() {}

  async getAll(): Promise<ChargerType[]> {
    const response = await hostApi.get("/chargers");
    return response.data.chargers;
  }

  async addCharger({
    title,
    location,
    type,
    power,
    price,
    imgFile,
  }: {
    title: string;
    location: {
      lat: number;
      lng: number;
      name: string;
    };
    type: string;
    power: number;
    price: number;
    imgFile: File;
  }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", JSON.stringify(location));
    formData.append("type", type);
    formData.append("power", power.toString());
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
