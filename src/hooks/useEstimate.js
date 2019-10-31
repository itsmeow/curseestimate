import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function useEstimate(slug, onError = () => {}) {
  const [estimate, setEstimate] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchEstimate = async () => {
      setLoading(true);
      let res;
      try {
        res = await fetch(
          `https://curse-point-estimator.herokuapp.com/estimate/${slug}`
        );
      } catch (error) {
        setError(error.message);
      }

      if (res && res.ok) {
        const json = await res.json();
        if (json.status === "failed") {
          onError(json.note);
          setError(json.note);
        } else {
          setError(false);
          setEstimate(json);
        }
      }

      setLoading(false);
    };

    if (slug) {
      fetchEstimate();
    }
  }, [slug]);

  return { loading, error, estimate };
}
