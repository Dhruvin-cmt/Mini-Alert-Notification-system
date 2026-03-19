import { api } from "./axios";

export const getAllMsgs = (page) => api.get(`/api/v1/alerts?page=${page}&limit=10`);

export const getAndupdateOne = (id, data) =>
  api.patch(`/api/v1/alerts/${id}/read`, data);

export const getAllAndUpdate = (data) => api.patch("/api/v1/alerts/read-all", data) 

export const getAndDelete = (id) => api.delete(`/api/v1/alerts/${id}`);
