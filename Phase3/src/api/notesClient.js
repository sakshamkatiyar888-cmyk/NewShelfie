import axios from "axios";

const notesClient = axios.create({
  baseURL: "https://newshelfie-api.onrender.com",
  timeout: 10000,
});

// Request Interceptor
notesClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer fake-token";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor + Retry
notesClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const config = error.config;

    if (!config) {
      return Promise.reject(error);
    }

    config.retryCount = config.retryCount || 0;

    // Maximum 3 retries
    if (
      (error.response?.status >= 500 || !error.response) &&
      config.retryCount < 3
    ) {
      config.retryCount += 1;

      const delay =
        1000 * 2 ** (config.retryCount - 1);

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );

      return notesClient(config);
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

export default notesClient;