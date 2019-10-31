import React, { useState } from "react";
import PropTypes from "prop-types";
import GridLoader from "react-spinners/GridLoader";
import useExchangeRates from "../hooks/useExchangeRate";
import Select from "react-select";

function Estimate(props) {
  const { loading: rateLoading, rates } = useExchangeRates();
  const { data } = props;

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );

  const handleCurrencyChange = e => {
    localStorage.setItem("currency", e.value);
    setCurrency(e.value);
  };

  if (rateLoading) {
    return (
      <div>
        <GridLoader css={"margin: 0 auto"} color="white" />
        <h2>Computing with codes and algorithms...</h2>
      </div>
    );
  }

  const { status, points, id, margin, slug } = data;
  const usd = points * 0.05;

  const toCurrency = usd * rates[currency];

  return (
    <div>
      <h1>Estimate for {slug}</h1>
      <p>Estimated daily points: </p>
      <h2>{points} pts</h2>
      <p>
        Error range: {margin.min} - {margin.max} ({margin.percenterror}%)
      </p>
      <h3>
        {toCurrency.toFixed(3)} {currency}
      </h3>
      <div style={{ width: "96px" }}>
        <Select
          styles={{
            option: (provided, state) => ({ ...provided, color: "black" })
          }}
          options={Object.keys(rates).map(rate => ({
            value: rate,
            label: rate
          }))}
          onChange={handleCurrencyChange}
          defaultValue={{ label: currency, value: currency }}
        />
      </div>
    </div>
  );
}

Estimate.propTypes = {
  data: PropTypes.object.isRequired
};

export default Estimate;
