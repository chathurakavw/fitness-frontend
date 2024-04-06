import axios from "axios";

export const authInstance = axios.create({
    baseURL: "http://localhost:8081/auth",
});

export const paymentInstance = axios.create({
  baseURL: "http://localhost:8083/payment",
});

export const scheduleInstance = axios.create({
  baseURL: "http://localhost:8082/schedule-type",
});
