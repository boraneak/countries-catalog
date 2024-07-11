import { Card, Image } from "antd";
import React from "react";
import { Country } from "../types";

interface CountryCardProps {
  country: Country;
  onClick: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  return (
    <Card
      title={country.name.official}
      style={{ width: 500, margin: 20, textAlign: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          width={200}
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          style={{ margin: "auto" }}
        />
      </div>
      <h3>Country Name:</h3>
      <h2
        onClick={() => onClick(country)}
        style={{
          cursor: "pointer",
          border: "1px solid #ccc",
          padding: "10px",
          margin: "10px",
        }}
      >
        {country.name.official}
      </h2>
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
    </Card>
  );
};

export default CountryCard;
