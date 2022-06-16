import axios from "axios";

const list = () => axios.get("/settings");

const update = ({ id, payload }) => axios.put(`/settings/${id}`, payload);

// const update = ({ slug, payload, quiet = false }) => {
//   const path = quiet ? `/articles/${slug}?quiet` : `/articles/${slug}`;
//   return axios.put(path, payload);

const settingsApi = {
  list,
  update,
};
export default settingsApi;
