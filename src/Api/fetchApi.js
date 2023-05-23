import axios from "axios";

const baseUrl = 'http://192.168.111.72:8080/api';

export const getAPI = async (url) => {
  const res = await axios.get(`${baseUrl}/${url}`);
  return res;
};

export const postAPI = async (url, post) => {
  const res = await axios.post(`${baseUrl}/${url}`, post);
  return res;
};

export const updateAPI = async (url, post) => {
  const res = await axios.put(`${baseUrl}/${url}`, post);
  return res;
};

export const patchAPI = async (url, post) => {
  const res = await axios.patch(`${baseUrl}/${url}`, post);
  return res;
};

export const deleteAPI = async (url, id) => {
  const res = await axios.delete(`${baseUrl}/${url}/${id}`);
  return res;
};
