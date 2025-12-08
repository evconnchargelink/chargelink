import adminApi from "../../apis/admin.api";

class StatsService {
  constructor() {}

  async getDashboardStats() {
    return adminApi.get("/dashboard-stats");
  }
}

export default StatsService;
