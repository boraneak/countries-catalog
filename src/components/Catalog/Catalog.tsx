import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "antd";
import { Country } from "../types";

const Catalog: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
      <h1>This is my countries catalog</h1>
      {countries.map((country) => (
        <div key={country.cca3}>
          <Image
            width={200}
            src={country.flags.png}
            alt={`${country.name.common} flag`}
          />
          <h2>{country.name.official}</h2>
          <p>{country.capital}</p>
          <p>{country.cca2}</p>
          <p>{country.cca3}</p>
          {/* <p>Native name:</p> */}
          <p>{country.altSpellings[1]}</p>
          <p>
            {country.idd.root}
            {country.idd.suffixes}
          </p>
        </div>
      ))}
    </>
  );
};

export default Catalog;
