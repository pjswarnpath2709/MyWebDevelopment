import { useState, useEffect } from "react";
import youtube from "../api/Youtube";

const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async (term) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: term,
        },
      });

      setVideos(response.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  return [videos, search];
};

export default useVideos;
