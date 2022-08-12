import axios from "axios";

const listCategories = () => axios.get("/eui/categories");

const listArticles = () => axios.get("/eui/articles");

const show = slug => axios.get(`/eui/articles/${slug}`);

const euiApi = {
  listCategories,
  listArticles,
  show,
};

export default euiApi;
