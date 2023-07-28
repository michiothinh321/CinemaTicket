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
  deleteChair: async ({ idTicket }) => {
    const url = API_BASE_URL + `/chair/delete/${idTicket}`;
    return await axios.delete(url);
  },
  checkoutChair: async ({ details }) => {
    const url = API_BASE_URL + `/chair/${details.id}`;
    return await axios.put(url, details);
  },
};

export default chair;
