import axios from "axios";

const list = () => axios.get("/categories");

const create = payload => axios.post("/categories/", payload);

const update = ({ id, payload }) => axios.put(`/categories/${id}`, payload);

const destroy = id => axios.delete(`/categories/${id}`);

const categoriesApi = {
  list,
  create,
  update,
  destroy,
};

export default categoriesApi;
