import React, { useState } from "react";

import GridLoader from "react-spinners/GridLoader";

import useEstimate from "./hooks/useEstimate";
import Estimate from "./components/Estimate";
import ModForm from "./components/ModForm";
import { toast } from "react-toastify";

function App() {
  const [slug, setSlug] = useState();

  const { loading, error, note, estimate } = useEstimate(slug, () => {
    toast.error("Error getting points for mod");
  });

  return (
    <div>
      <>
        <h1 align="center">Curse Point Estimator</h1>
        <p>
          Using highly advanced and top secret methods I have determined a way
          to estimate the Curse Points of a given project. Don't sue me, Curse.
        </p>

        <ModForm
          onSubmit={value => {
            setSlug(value);
          }}
        />
      </>
      <hr />
      {loading ? (
        <div>
          <GridLoader css={"margin: 0 auto"} color="white" />
          <h2>Computing with codes and algorithms...</h2>
        </div>
      ) : error ? (
        <>
          <h1>Error</h1>
          Unable to get data
          <p>{note}</p>
        </>
      ) : (
        estimate && <Estimate data={estimate} />
      )}
    </div>
  );
}

export default App;
