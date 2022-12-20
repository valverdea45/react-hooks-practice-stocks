import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ boughtStocks, handleClick }) {

  const stocksToBeDisplayed = boughtStocks.map((stock) => {
    return <Stock stock={stock} handleClick={handleClick} />
  })
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        stocksToBeDisplayed
      }
    </div>
  );
}

export default PortfolioContainer;
