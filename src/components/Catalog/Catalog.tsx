import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { Country } from "../types";
import { fetchCountries } from "../DataService/DataService";

const Catalog: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await fetchCountries();
        setCountries(countries);
      } catch (error) {
        console.error("Error loading countries:", error);
      }
    };
    loadCountries();
  }, []);

  return (
    <>
      {countries.map((country) => (
        <div key={country.cca3}>
          <h3>Flag:</h3>

          <Image
            width={200}
            src={country.flags.png}
            alt={`${country.name.common} flag`}
          />
          <h3>Country Name:</h3>
          <h2>{country.name.official}</h2>
          <p>{country.capital}</p>
          <h3>2 Character Country Code:</h3>
          <p>{country.cca2}</p>
          <h3>3 Character Country Code:</h3>

          <p>{country.cca3}</p>
          <div>
            <h3>Native name:</h3>
            {country.name.nativeName ? (
              Object.entries(country.name.nativeName).map(([lang, names]) => (
                <div key={lang}>
                  <p>{`${lang}: ${names.official} (${names.common})`}</p>
                </div>
              ))
            ) : (
              <p>No native names available</p>
            )}
          </div>
          <div>
            <h3>Alternative Spellings:</h3>
            {country.altSpellings.length > 0 ? (
              <div>
                {country.altSpellings.map((spelling, index) => (
                  <p key={index}>{spelling}</p>
                ))}
              </div>
            ) : (
              <p>No alternative spellings available</p>
            )}
          </div>
          <h3>Country code:</h3>
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
