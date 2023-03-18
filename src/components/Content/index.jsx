import React, { useEffect, useState } from "react";
import Chart from '../Chart';

export const Content = () => {
  const cryptoUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const [chartModal, setChartModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [netLoaded, setNetLoaded] = useState(false);
  const [bitcoin, setBitcoin] = useState();
  const [gold, setGold] = useState();
  const [usdt, setUsdt] = useState();
  const [monero, setMonero] = useState();

  const [actualTotalPrice, setActualTotalPrice] = useState();
  const [boughtTotalPrice, setBoughtTotalPrice] = useState();

  const assetsData = async () => {
    const response = await fetch(cryptoUrl);
    const data = await response.json();

    const number = data;
    // const filteredData = number.filter(item => item.id === 'bitcoin');
    setBitcoin(number.filter((item) => item.id === "bitcoin"));
    setGold(number.filter((item) => item.id === "tether-gold"));
    setUsdt(number.filter((item) => item.id === "tether"));
    setMonero(number.filter((item) => item.id === "monero"));
    // console.log(filteredData)
    // console.log(number)
    // console.log(number);
    setLoading(true);
    // setLoading(number == null ? false : true);
    // setApi(number)
  };

  const netValue = () => {
    let totalBuyPrice = assets?.reduce((accumulator, current) => accumulator + current.buyPrice, 0) ;
    setBoughtTotalPrice(totalBuyPrice)
    let actualPrice = assets?.reduce((accumulator, current) => accumulator + (current.amount * current.actualPrice), 0) ;
    setActualTotalPrice(actualPrice)
  }

  useEffect(() => {
    assetsData();
  }, []);

  useEffect(() => {
    netValue()
    setNetLoaded(true)
  }, [loading]);

  const modalStatus = () => {
    setChartModal(!chartModal)

    // const bodyStyle = document.body.style; 
    //   const servicesScrollLock = () => { !chartModal == true ? 
    //   (bodyStyle.overflowY = "hidden") : (bodyStyle.overflowY = "auto"); }; 
    //   servicesScrollLock(); 
  }

  const euro = "./images/euro.png"
  const dollar = "./images/dollar.png"
  const swissFranc = "./images/swissFranc.png"

  let assets = [
    {
      name: "Bitcoin",
      code: "BTC",
      symbol: loading ? bitcoin[0]?.image : "",
      amount: 0.2115,
      actualPrice: loading ? bitcoin[0]?.current_price : "",
      buyPrice: 1000,
    //   usdPurchaseSpent: 3845,
      fechaCompra: new Date("2018-03-03"),
      value:100,
    },
    {
      name: "Gold",
      code: "XAU",
      symbol: loading ? gold[0]?.image : "",
      amount: 1,
      actualPrice: loading ? gold[0]?.current_price : "",
      buyPrice: 1000,
      fechaCompra: new Date("2018-03-03"),
      value:100,
    },
    {
      name: "Monero",
      code: "XMR",
      symbol: loading ? monero[0]?.image : "",
      amount: 1,
      actualPrice: loading ? monero[0]?.current_price : "",
      buyPrice: 100,
      fechaCompra: new Date("2018-03-03"),
      value:10,
    },
    {
      name: "usdt",
      code: "usdt",
      symbol: loading ? usdt[0]?.image : "",
      amount: 100,
      actualPrice: loading ? usdt[0]?.current_price : "",
      buyPrice: 100,
      fechaCompra: new Date("2018-03-03"),
      value:100,
    },
    {
      name: "Dollar",
      code: "USD",
      symbol: dollar,
      amount: 1,
      actualPrice: 1,
      buyPrice: 1,
      fechaCompra: new Date("2018-03-03"),
      value:0,
    },
    {
      name: "Euro",
      code: "EUR",
      symbol: euro,
      amount: 0.1,
      actualPrice: 1,
      buyPrice: 0.1,
      fechaCompra: new Date("2018-03-03"),
      value:0,
    },
    {
      name: "Swiss franc",
      code: "CHF",
      symbol: swissFranc,
      amount: 0.1,
      actualPrice: 1,
      buyPrice: 0.1,
      fechaCompra: new Date("2018-03-03"),
      value:0,
    },
  ];

  const red = { color: "#c72525" };
  const green = { color: "#1e951e" };

  return (
    <div>
      {loading ? 
      <Chart 
        actualPortfolioValue={actualTotalPrice}
        active={chartModal}
        modalFunction={modalStatus}
        assets={assets}
      />
      : ""}
      
        <ul className="Assetlist">
            <div className="list">
              <li>
              <span className="name">Asset </span>
                <span className="symbol"></span>
                <span className="amount">Amount </span>
                <span className="actualPrice">Actual value</span>
                <span className="buyPrice">bought price</span>
                <span className="PG">Profit/loss </span>
                <span className="percent"></span>
               </li>              
            </div>
        </ul>

      {loading == true
        ? assets.map((asset) => (
            <AssetInfo
              title={asset.name}
              code={asset.code}
            //   btcPrice={btcPrice}
              actualPrice={asset.actualPrice}
              symbol={asset.symbol}
              amount={asset.amount}
              //  buy price it´s just all the money I spent when I bought those assets, no worry about the date
              buyPrice={asset.buyPrice}
              green={green}
              red={red}
            />
          ))
        : "loading..."}


        <ul className="Assetlist" >
            <div className="list">
              <li style={{ borderBottom: "1px solid #c6c6c6"}}>
              <span className="name">Net result</span>
                <span className="symbol"></span>
                <span className="amount">Initial capital </span>
                <span className="actualPrice">Actual value</span>
                <span className="PG">Profit/loss </span>
                <span className="percent"></span>
               </li>              
            </div>
        </ul>


          <ul className="Assetlist">
            <div className="list">
              <li>
                <span className="name"> 
                    <div className="pieChart__button" onClick={() => modalStatus()}>pie chart :D</div> 
                </span>
                <span className="symbol"></span>
                <span className="amount">{Math.round(boughtTotalPrice)}$  </span>
                <span className="actualPrice">{Math.round(actualTotalPrice)}$</span>
                <span className="PG">
                  <b style={(actualTotalPrice) - boughtTotalPrice > 0 ? green : red }>
                  {Math.round(actualTotalPrice - boughtTotalPrice) }</b>$
                </span>
                <span className="percent">
                  <b style={( actualTotalPrice) - boughtTotalPrice > 0 ? green : red }>
                  {((actualTotalPrice - boughtTotalPrice ) / boughtTotalPrice * 100).toFixed(2) }% </b>
                </span>
              </li>              
            </div>
          </ul>


       <div className="assetsContainer">
          {loading ?   
          <div className="assetPrices">
            <div className="assetPrices__content">
                <div>
                  <img className="symbol" src={loading ? bitcoin[0]?.image : ""}></img>
                  <p className="assetPrices__name">Bitcoin<text>(BTC)</text> </p> 
                </div>
                <div className="assetPrices__price">
                  <b>${bitcoin[0]?.current_price}</b>
                  <p style={bitcoin[0]?.price_change_percentage_24h > 0 ? green : red }>
                    {bitcoin[0]?.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
            </div>
            <div className="assetPrices__content">
                <div>
                  <img className="symbol" src={loading ? gold[0]?.image : ""}></img>
                  <p className="assetPrices__name">Gold<text>(XAU)</text> </p> 
                </div>
                <div className="assetPrices__price">
                  <b>${gold[0]?.current_price}</b>
                  <p style={gold[0]?.price_change_percentage_24h > 0 ? green : red }>
                    {gold[0]?.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
            </div>
            <div className="assetPrices__content">
                <div>
                  <img className="symbol" src={loading ? monero[0]?.image : ""}></img>
                  <p className="assetPrices__name">Monero<text>(XMR)</text> </p> 
                </div>
                <div className="assetPrices__price">
                  <b>${monero[0]?.current_price}</b>
                  <p style={monero[0]?.price_change_percentage_24h > 0 ? green : red }>
                    {monero[0]?.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
            </div>
            <div className="assetPrices__content">
                <div>
                  <img className="symbol" src={loading ? usdt[0]?.image : ""}></img>
                  <p className="assetPrices__name">usdt<text>(usdt)</text> </p> 
                </div>
                <div className="assetPrices__price">
                  <b>${usdt[0]?.current_price}</b>
                  <p style={usdt[0]?.price_change_percentage_24h > 0 ? green : red }>
                    {usdt[0]?.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
            </div>
          </div>
          : ""}
        </div> 


    </div>
  );
};

// Assets compoennt
const AssetInfo = (props) =>{
    return (
        <div className='assetInfo'>
        <ul className="list">
            <li>
                <span className="name"><b>{props.title}</b><p>{props.code}</p> </span>
                <span className="symbol"> <img className="symbol" src={props.symbol}></img></span>
                <span className="amount"> {props.amount}</span>
                <span className="actualPrice">{ Math.round(props.amount * props.actualPrice) }$</span>
                <span className="buyPrice">{props.buyPrice}$</span>
                <span className="PG">
                <b style={(props.amount * props.actualPrice) - props.buyPrice > 0 ? props.green : props.red }>
                {Math.round(props.amount * props.actualPrice - props.buyPrice) }</b>$ </span>
                <span className="percent"><b style={(props.amount * props.actualPrice) - props.buyPrice > 0 ? props.green : props.red }>
                {((props.amount * props.actualPrice - props.buyPrice ) / props.buyPrice * 100).toFixed(2) }%</b> </span>
            </li>
        </ul>
    </div>
      )
}

export default Content;
