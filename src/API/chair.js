import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const chair = {
  addChair: async ({ ...data }) => {
    const url = API_BASE_URL + "/chair/addChair";
    return await axios.post(url, data);
  },
  getChair: async ({ idRoom }) => {
    const url = API_BASE_URL + `/chair/${idRoom}`;
    return await axios.get(url);
  },
  deleteChair: async ({ id }) => {
    const url = API_BASE_URL + `/chair/delete/${id}`;
    return await axios.delete(url);
  },
  checkoutChair: async ({ id }) => {
    const url = API_BASE_URL + `/chair/${id}`;
    return await axios.put(url, id);
  },
};

export default chair;
