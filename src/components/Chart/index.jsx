import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ["#fc6d00 ", "#0094d3", "#fe2600", "#10be64", "black", "black", "black"];

const Chart = (props) => {
  const [assetsData, setAssetsData] = useState();

  const actualPortfolioValue = Math.round(props?.actualPortfolioValue)
  // console.log("total value",actualPortfolioValue )
  useEffect(() => {
   const assetsObject =  props?.assets?.map((asset, index) => {
      return{
        name:asset?.name,
        // actualPrice:asset?.actualPrice,
        amount: asset?.amount,
        buyPrice: asset?.buyPrice,
        value:  Math.round((asset?.amount * asset?.actualPrice) / (actualPortfolioValue ) * 100 ),
      }
    });
    // console.log(assetsObject,"asset---");
    setAssetsData(assetsObject)
  }, []);

  const formatter = (value) => `${parseFloat(value.toFixed(2).split('.')[1])}%`;

  return (
    <div  className={`${props.active == true ?  "Chart" : "Chart-disabled" }`} >
      <div className="chart__container">
      <button onClick={props.modalFunction}>Close</button>
        <PieChart width={400} height={400}>
          <Pie
            data={assetsData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ percent }) => formatter(percent)}
            className="pie-segment"
          >
            {assetsData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip className="pie-tooltip" />
          <Legend  className="pie-legend"/>
        </PieChart>
      </div>

    </div>

  );
};

export default Chart;