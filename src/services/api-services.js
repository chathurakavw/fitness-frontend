import {authInstance, paymentInstance, scheduleInstance} from "../config/axios/axios-instance";

export const login = async (body) => {
    return await authInstance.post("/login", body);
}
export const customerRegistration = async (body) => {
    return await authInstance.post("/user-registration", body);
}

export const fetchUserList = async () => {
    return await authInstance.get("/user-list");
}

export const fetchRoleList = async () => {
    return await authInstance.get("/role-list");
}

export const accountCreation = async (body) => {
    return await authInstance.post("/account-creation", body);
}

export const updateUser = async (body) => {
    return await authInstance.put("/user-update", body);
}

export const deleteUser = async (id) => {
    return await authInstance.delete(`/user-delete/${id}`);
}

export const fetchScheduleTypeList = async () => {
    return await scheduleInstance.get("/schedule-type-list");
}

export const createSchedule = async (body) => {
    return await scheduleInstance.post("/create-schedule", body);
}

export const userSchedules = async (id) => {
    return await scheduleInstance.get(`/user-schedules/${id}`);
}

export const createPayment = async (body) => {
    return await paymentInstance.post(`/create-payment`, body);
}

export const getPaymentList = async (id) => {
    return await paymentInstance.get(`/payment-history/${id}`);
}