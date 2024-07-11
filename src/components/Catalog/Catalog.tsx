import React, { useState, useEffect } from "react";
import { Country } from "../types";
import { fetchCountries } from "../DataService/DataService";
import CountryCard from "./CountryCard";
import CountryModal from "./CountryModal";
import Search from "./Search";
import Fuse from "fuse.js";
import Pagination from "./Pagination";

const Catalog: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(25);
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
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredCountries(countries);
      return;
    }

    /**
     * Initializes a new instance of Fuse for performing fuzzy search on countries.
     * @type {Fuse<Country>}
     * @param {Country[]} countries - The array of countries to search within.
     * @param {Object} options - Options for configuring the Fuse instance.
     * @param {string[]} options.keys - The keys or paths to search in each item.
     * @param {number} options.threshold - Adjusts the fuzzy search sensitivity (0.0 to 1.0).
     * @returns {Fuse<Country>} A new instance of Fuse configured for countries fuzzy search.
     */
    const fuse = new Fuse(countries, {
      keys: ["name.official", "name.common"],
      threshold: 0.3,
    });

    const result = fuse.search(query);
    const filtered = result.map((item) => item.item);

    setFilteredCountries(filtered);
    // Reset to first page after search
    setCurrentPage(1);
  };
  // Pagination logic for displaying countries
  const getDisplayedCountries = () => {
    const data = filteredCountries.length > 0 ? filteredCountries : countries;
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <div>
        {getDisplayedCountries().map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            onClick={handleCountryClick}
          />
        ))}
      </div>
      <Pagination
        totalItems={
          filteredCountries.length > 0
            ? filteredCountries.length
            : countries.length
        }
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
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
