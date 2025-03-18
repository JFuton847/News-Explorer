import React from "react";
import "../../components/Preloader/Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__circle"></div>
      <p>Searching for news...</p>
    </div>
  );
}

export default Preloader;
