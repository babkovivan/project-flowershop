import React from "react";
import PopularSection from "../components/PopularSection";

const HomePage = ({ favorites, toggleFavorite }) => {
  return (
    <>
      <PopularSection favorites={favorites} toggleFavorite={toggleFavorite} />
    </>
  );
};

export default HomePage;
