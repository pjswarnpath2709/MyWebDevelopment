import axios from "axios";

const settyl = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default settyl;
