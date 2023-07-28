import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const ticket = {
  addTicket: async ({ ...data }) => {
    const url = API_BASE_URL + "/ticket/addTicket";
    return await axios.post(url, data);
  },
  getTicket: async ({ email }) => {
    const url = API_BASE_URL + `/ticket/${email}`;
    return await axios.get(url);
  },
  getList: async () => {
    const url = API_BASE_URL + `/ticket/get/getList`;
    return await axios.get(url);
  },
  checkoutTicket: async ({ id, ve }) => {
    const url = API_BASE_URL + `/ticket/${id}`;
    return await axios.put(url, { id, ve });
  },
  deleteTicket: async ({ id }) => {
    const url = API_BASE_URL + `/ticket/delete/${id}`;
    return await axios.delete(url);
  },
};

export default ticket;
