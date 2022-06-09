import axios from "axios";

const list = () => axios.get("/articles");

const show = slug => axios.get(`/articles/${slug}`);

const create = payload => axios.post("/articles/", payload);

const update = ({ slug, payload, quiet = false }) => {
  const path = quiet ? `/articles/${slug}?quiet` : `/articles/${slug}`;
  return axios.put(path, payload);
};
const destroy = ({ slug, quiet }) => {
  const path = quiet ? `/articles/${slug}?quiet` : `/articles/${slug}`;
  return axios.destroy(path);
};

const articlesApi = { list, show, create, update, destroy };

export default articlesApi;
