import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const detailTicket = {
  addDetailTicket: async ({ ...data }) => {
    const url = API_BASE_URL + "/detailticket/addDetailTicket";
    return await axios.post(url, data);
  },
  getDetailTicket: async ({ idShowTime }) => {
    const url = API_BASE_URL + `/detailticket/${idShowTime}`;
    return await axios.get(url);
  },
  getDetail: async ({ idTicket }) => {
    const url = API_BASE_URL + `/detailticket/getDetail/${idTicket}`;
    return await axios.get(url);
  },
  deleteDetailTicket: async ({ id }) => {
    const url = API_BASE_URL + `/detailticket/${id}`;
    return await axios.delete(url);
  },
  editDetailTicket: async ({ detail }) => {
    const url = API_BASE_URL + `/detailticket/${detail.id}`;
    return await axios.put(url, detail);
  },
};

export default detailTicket;
