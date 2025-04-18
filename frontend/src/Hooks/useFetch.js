import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios({ url, ...options });
        setData(response.data);
      } catch (error) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [url]);

  return { data, loading, error };
};
