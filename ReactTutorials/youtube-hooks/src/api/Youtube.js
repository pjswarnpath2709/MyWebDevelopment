import axios from "axios";

const KEY = "AIzaSyDHx8Iaa6urrN4_gKa_Onke4RJj4tHxeRg";

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 15,
    key: KEY,
  },
});

export default youtube;
