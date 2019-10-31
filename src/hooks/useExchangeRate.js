import React, { useState, useEffect } from "react";

export default function useExchangeRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      let res;

      try {
        res = await fetch("https://api.exchangeratesapi.io/latest?base=USD");
      } catch (error) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setRates(json.rates);
      }
      setLoading(false);
    };
    fetchRates();
  }, []);

  return { loading, rates };
}
