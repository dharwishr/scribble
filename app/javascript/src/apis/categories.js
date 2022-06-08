import axios from "axios";

const list = () => axios.get("/categories");

const categoriesApi = {
  list,
};

export default categoriesApi;
