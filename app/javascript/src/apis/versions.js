import axios from "axios";

const list = slug => axios.get(`/articles/${slug}/versions`);

const show = ({ slug, versionId }) =>
  axios.get(`/articles/${slug}/versions/${versionId}`);

const versionsApi = { list, show };

export default versionsApi;
