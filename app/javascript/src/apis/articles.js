import axios from "axios";

const list = () => axios.get("/articles");

const show = slug => axios.get(`/articles/${slug}`);

const create = payload => axios.post("/articles/", { article: payload });

const update = ({ slug, payload, restore }) => {
  const path = restore ? `/articles/${slug}?restore` : `/articles/${slug}`;
  axios.put(path, { article: payload });
};

const destroy = id => axios.delete(`/articles/${id}`);

const articlesApi = { list, show, create, update, destroy };

export default articlesApi;
