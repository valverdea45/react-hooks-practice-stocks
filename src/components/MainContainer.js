import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [inPortfolio, setInPortfolio] = useState([])
  const [currentSelection, setCurrentSelection] = useState("")
  const [typeSelection, setTypeSelection] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((data) => data.json())
      .then((allstocks) => setStocks(allstocks))
  }, [])

  function handleClick(stock) {
    console.log(stock)
    setInPortfolio([...inPortfolio, stock])
  }

  function handlePortfolioClick(stock) {
    const newArray = inPortfolio.filter((individualStock) => {
      return individualStock.id !== stock.id
    })
    setInPortfolio(newArray)
  }



  const newArray = stocks.filter((individualStock) => {
    if (typeSelection === "" ) {
      return individualStock
    }
    return individualStock.type === typeSelection
  }).sort((a, b) => {

    if (currentSelection === "Alphabetically") {
      const tickerNameA = a.ticker.toLowerCase()
      const tickerNameB = b.ticker.toLowerCase()

      if (tickerNameA < tickerNameB) {
        return -1
      }

      if (tickerNameA > tickerNameB) {
        return 1
      }

      return 0
    } else {
      const stockPriceA = a.price
      const stockPriceB = b.price
      return stockPriceA - stockPriceB
    }
  })



  return (
    <div>
      <SearchBar setCurrentSelection={setCurrentSelection} setTypeSelection={setTypeSelection} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={newArray} handleClick={handleClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer boughtStocks={inPortfolio} handleClick={handlePortfolioClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
