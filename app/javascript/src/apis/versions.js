import axios from "axios";

const list = slug => axios.get(`/articles/${slug}/versions`);

const show = (slug, versionId) =>
  axios.get(`/articles/${slug}/versions/${versionId}`);

const update = ({ slug, versionNumber, payload }) =>
  axios.put(`/articles/${slug}/versions/${versionNumber}/`, {
    article: payload,
  });

const versionsApi = { list, show, update };

export default versionsApi;
