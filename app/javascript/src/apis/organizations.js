import axios from "axios";

const get = () => axios.get("/organizations");

const update = ({ id, payload }) => axios.put(`/organizations/${id}`, payload);

// const update = ({ slug, payload, quiet = false }) => {
//   const path = quiet ? `/articles/${slug}?quiet` : `/articles/${slug}`;
//   return axios.put(path, payload);

const organizationsApi = {
  get,
  update,
};
export default organizationsApi;
