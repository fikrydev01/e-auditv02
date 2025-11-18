import { useEffect, useState, useCallback } from "react";
import { fetchAnggotaSpi } from "../utils/api";

export const useAnggotaSpi = () => {
  const [userSpi, setUserSpi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    fetchAnggotaSpi({
      setLoading,
      setData: setUserSpi,
      setError,
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { userSpi, loading, error, refetch };
};
