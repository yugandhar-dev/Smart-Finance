import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ investData, type, company }) => {
  if (type === "savingScheme") {
    const { principal, contributions, tenure, years, amount } = investData;

    const data = {
      labels: years,
      datasets: [
        {
          label: `Investments for ${tenure} years`,
          data: Array(tenure + 1).fill(principal),
          backgroundColor: Array(tenure + 1).fill("rgb(30, 144, 255)"),
        },
        {
          label: "Contributions Amount",
          data: contributions,
          backgroundColor: Array(tenure + 1).fill("#32CD32"),
        },
        {
          label: "Interest Amount Earned",
          data: amount,
          backgroundColor: Array(tenure + 1).fill("rgb(255, 215, 0)"),
        },
      ],
    };
    const max = Math.ceil(Math.max.apply(Math, amount) / 100) * 100;

    const options = {
      title: {
        display: true,
        text: "Bar Chart",
      },
      scales: {
        xAxes: [{ stacked: true }],
        yAxes: [
          {
            stacked: false,
            ticks: {
              min: 0,
              max: max,
              stepSize: max / 10,
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            return data["labels"][tooltipItem[0]["index"]];
          },
          label: function (tooltipItem, data) {
            return [
              `Starting Amount = $${
                data["datasets"][0]["data"][tooltipItem["index"]]
              }`,
              `Contribution Amount = $${
                data["datasets"][1]["data"][tooltipItem["index"]] - principal
              }`,
              `Interest Earned = $${
                data["datasets"][2]["data"][tooltipItem["index"]] -
                data["datasets"][1]["data"][tooltipItem["index"]]
              }`,
            ];
          },
        },
        backgroundColor: "#FFF",
        titleFontSize: 16,
        titleFontColor: "#0066ff",
        bodyFontColor: "#000",
        bodyFontSize: 14,
        displayColors: false,
      },
    };

    return <Bar data={data} options={options} />;
  } else {
    const monthly_data = investData["Monthly Time Series"];
    let arr = [];
    const dates = Object.keys(monthly_data).slice(0, 15).reverse();
    Object.entries(monthly_data).forEach(key =>
      arr.push(parseFloat(key[1]["4. close"]).toFixed(2))
    );
    const data = {
      labels: dates,
      datasets: [
        {
          label: `Market Data for ${company}`,
          data: arr.slice(0, 15).reverse(),
          backgroundColor: arr.fill("rgb(30, 144, 255)"),
        },
      ],
    };
    const options = {
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            return data["labels"][tooltipItem[0]["index"]];
          },
          label: function (tooltipItem, data) {
            return [
              `Price per unit = $${
                data["datasets"][0]["data"][tooltipItem["index"]]
              }`,
            ];
          },
        },
      },
    };
    return <Bar data={data} options={options} />;
  }
};

export default BarChart;
