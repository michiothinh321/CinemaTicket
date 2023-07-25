import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const bangoi = {
  addBaNgoi: async ({ ...data }) => {
    const url = API_BASE_URL + "/bangoi/addBaNgoi";
    return await axios.post(url, data);
  },
  getBaNgoi: async ({ timeStart }) => {
    const url = API_BASE_URL + `/bangoi/${timeStart}`;
    return await axios.get(url);
  },
};

export default bangoi;
