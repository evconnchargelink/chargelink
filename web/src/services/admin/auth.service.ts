import adminApi from "../../apis/admin.api";

class AuthService {
  constructor() {}

   async login(email: string, password: string) {
    const response = await adminApi.post("/login", { email, password });

    return {
      hostId: response.data.hostId,
    };
  }

  async signup(name: string, email: string, password: string, number: string) {
    const response = await adminApi.post("/signup", {
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
    return await adminApi.post("/logout");
  }
}

export default AuthService;
