class AuthService {
  constructor() {}

  async login(email: string, password: string) {
    // TODO: Implement login logic
    // Return a mock user object for now
    return {
      id: "1",
      email,
      name: "Host User",
      role: "host" as const,
      profileImgURL: null,
    };
  }

  async signup(name: string, email: string, password: string) {
    // TODO: Implement signup logic
    // Return a mock user object for now
    return {
      id: "1",
      email,
      name,
      role: "host" as const,
      profileImgURL: null,
    };
  }
}

export default AuthService;
