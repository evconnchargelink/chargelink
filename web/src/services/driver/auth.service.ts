import driverApi from "../../apis/driver.api";

class AuthService {
  constructor() {}

  async login(email: string, password: string) {
    const response = await driverApi.post("/login", { email, password });

    return {
      hostId: response.data.hostId,
    };
  }

  async signup(name: string, email: string, password: string, number: string) {
    const response = await driverApi.post("/signup", {
      name,
      email,
      password,
      number,
    });

    return {
      hostId: response.data.hostId,
    };
  }

  async logout() {
    return await driverApi.post("/logout");
  }
}

export default AuthService;
