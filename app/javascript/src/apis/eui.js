import axios from "axios";

const list = () => axios.get("/eui/categories");

const show = slug => axios.get(`/eui/articles/${slug}`);

const euiApi = {
  list,
  show,
};

export default euiApi;
