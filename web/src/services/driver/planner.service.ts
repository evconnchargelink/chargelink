import driverApi from "../../apis/driver.api";

class PlannerService {
  constructor() {}

  async plan(
    startPoint: string,
    destination: string,
    evCarName: string,
    batteryCapacity: number
  ) {
    return await driverApi.post("/plan-trip", {
      startPoint,
      destination,
      evCarName,
      batteryCapacity,
    });
  }
}

export default PlannerService;
