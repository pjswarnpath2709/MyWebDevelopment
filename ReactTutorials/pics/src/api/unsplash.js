import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID 4i_lWt9MFSAvDa1IbJb_Om9Nyfp4MX2iMCrXOUQBMqg",
  },
});
