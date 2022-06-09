import axios from "axios";

const list = () => axios.get("/categories");

const create = payload => axios.post("/categories/", payload);

const update = (id, payload) => axios.put(id, payload);

const destroy = id => axios.delete(id);

const categoriesApi = {
  list,
  create,
  update,
  destroy,
};

export default categoriesApi;
