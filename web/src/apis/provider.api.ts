import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const providerApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL + "/provider",
  withCredentials: true,
});

providerApi.defaults.withCredentials = true;

providerApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

providerApi.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If we get a 401 Unauthorized error, try to refresh the tokens
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh tokens using the refresh endpoint
        await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/provider/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Retry the original request after successfully refreshing tokens
        return providerApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // If refresh fails, handle logout or redirect to login as needed
      }
    }

    return Promise.reject(error);
  }
);

export default providerApi;