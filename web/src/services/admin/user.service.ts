import adminApi from "../../apis/admin.api";

class UserService {
  constructor() {}

  async getAll() {
    return adminApi.get("/users");
  }
}

export default UserService;
