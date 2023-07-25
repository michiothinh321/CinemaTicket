import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const theater = {
  addTheater: async ({ ...data }) => {
    const url = API_BASE_URL + "/theater/addTheater";
    return await axios.post(url, data);
  },
  getTheaterById: async ({ idArea }) => {
    const url = API_BASE_URL + `/theater/${idArea}`;
    return await axios.get(url);
  },
  getTheater: async (idTheater) => {
    const url = API_BASE_URL + `/theater/getId/${idTheater}`;
    return await axios.get(url);
  },
  editTheater: async ({ nameTheater, address }) => {
    const url = API_BASE_URL + `/theater/${nameTheater}`;
    return await axios.put(url, { nameTheater, address });
  },
  deleteTheater: async ({ nameTheater }) => {
    const url = API_BASE_URL + `/theater/${nameTheater}`;
    return await axios.delete(url);
  },
};

export default theater;
