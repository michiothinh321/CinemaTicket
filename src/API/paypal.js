import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const paypal = {
  getConfig: async () => {
    const url = API_BASE_URL + `/payment/config`;
    return await axios.get(url);
  },
};

export default paypal;
