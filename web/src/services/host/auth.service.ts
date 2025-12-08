import hostApi from "../../apis/host.api";

class AuthService {
  constructor() {}

  async login(email: string, password: string) {
    const response = await hostApi.post("/login", { email, password });

    return {
      hostId: response.data.hostId,
    };
  }

  async signup(name: string, email: string, password: string, number: string) {
    const response = await hostApi.post("/signup", {
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
    return await hostApi.post("/logout");
  }
}

export default AuthService;
