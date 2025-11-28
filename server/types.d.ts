import { Request } from "express";
import { AdminModel } from "./src/models/admin.model";
import { DriverModel } from "./src/models/driver.model";
import { HostModel } from "./src/models/host.model";

declare global {
  namespace Express {
    interface Request {
      driver?: DriverModel;
      admin?: AdminModel;
      provider?: HostModel;
    }
  }
}