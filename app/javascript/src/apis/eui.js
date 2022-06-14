import axios from "axios";

const list = () => axios.get("/eui");

const show = slug => axios.get(`/eui/${slug}`);

const euiApi = {
  list,
  show,
};

export default euiApi;
