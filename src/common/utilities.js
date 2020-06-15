const axiosInstance = require("axios");

export const axios = axiosInstance.create({
  baseURL: "https://backend-test.pi-top.com/todo-test/v1",
});
