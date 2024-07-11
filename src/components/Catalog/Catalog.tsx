import React, { useState, useEffect } from "react";
import { Country } from "../types";
import { fetchCountries } from "../DataService/DataService";
import CountryCard from "./CountryCard";
import CountryModal from "./CountryModal";

const Catalog: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

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

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };
  const handleModalClose = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      {countries.map((country) => (
        <CountryCard country={country} onClick={handleCountryClick} />
      ))}
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          visible={true}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Catalog;
