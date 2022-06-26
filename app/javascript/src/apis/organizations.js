import axios from "axios";

const get = () => axios.get("/organizations");

const update = ({ id, payload }) => axios.put(`/organizations/${id}`, payload);

const organizationsApi = {
  get,
  update,
};
export default organizationsApi;
