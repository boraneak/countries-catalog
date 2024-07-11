import React from "react";
import { Modal } from "antd";
import { Country } from "../types";

interface CountryModalProps {
  country: Country;
  visible: boolean;
  onClose: () => void;
}

const CountryModal: React.FC<CountryModalProps> = ({
  country,
  visible,
  onClose,
}) => {
  return (
    <Modal
      title={country.name.official}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <h3>Currencies:</h3>
      <div>
        {Object.entries(country.currencies).map(([code, currency]) => (
          <p key={code}>{`${code}: ${currency.name} (${currency.symbol})`}</p>
        ))}
      </div>

      <h3>Country Calling Codes:</h3>
      <p>
        {country.idd.root}
        {country.idd.suffixes.join(", ")}
      </p>

      <h3>Capital:</h3>
      <p>{country.capital.join(", ")}</p>
      <h3>Region:</h3>
      <p>{country.region}</p>

      <h3>Subregion:</h3>
      <p>{country.subregion}</p>

      <h3>Languages:</h3>
      <div>
        {Object.entries(country.languages).map(([code, language]) => (
          <p key={code}>{`${code}: ${language}`}</p>
        ))}
      </div>

      <h3>Translations:</h3>
      <div>
        {Object.entries(country.translations).map(([code, translation]) => (
          <p
            key={code}
          >{`${code}: ${translation.official} (${translation.common})`}</p>
        ))}
      </div>

      <h3>Geolocation:</h3>
      <p>{`Latitude: ${country.latlng[0]}, Longitude: ${country.latlng[1]}`}</p>

      <h3>Landlocked:</h3>
      <p>{country.landlocked ? "Yes" : "No"}</p>

      <h3>Area:</h3>
      <p>{`${country.area.toLocaleString()} sq km`}</p>

      <h3>Demonyms:</h3>
      <p>{`Female: ${country.demonyms.eng.f}, Male: ${country.demonyms.eng.m}`}</p>
      <h3>Google Maps:</h3>
      <a
        href={country.maps.googleMaps}
        target="_blank"
        rel="noopener noreferrer"
      >
        {country.maps.googleMaps}
      </a>

      <h3>Population:</h3>
      <p>{country.population.toLocaleString()}</p>

      <h3>Car Details:</h3>
      <p>{`Side: ${country.car.side}, Signs: ${country.car.signs.join(
        ", "
      )}`}</p>

      <h3>Timezones:</h3>
      <p>{country.timezones.join(", ")}</p>

      <h3>Continents:</h3>
      <p>{country.continents.join(", ")}</p>

      {country.coatOfArms && typeof country.coatOfArms === "string" && (
        <>
          <h3>Coat of Arms:</h3>
          <p>{country.coatOfArms}</p>
        </>
      )}

      <h3>Start of Week:</h3>
      <p>{country.startOfWeek}</p>

      <h3>Capital Info:</h3>
      <p>{`Latitude: ${country.capitalInfo.latlng[0]}, Longitude: ${country.capitalInfo.latlng[1]}`}</p>

      <h3>Postal Code:</h3>
      <p>{`Format: ${country.postalCode.format}, Regex: ${country.postalCode.regex}`}</p>
    </Modal>
  );
};

export default CountryModal;
