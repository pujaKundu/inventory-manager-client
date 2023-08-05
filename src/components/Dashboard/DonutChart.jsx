import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetProductsQuery } from "../../features/products/productsApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const { data: products } = useGetProductsQuery();
  if (!products) {
    return <div>Loading...</div>; // or any other loading indicator
  }
  const productNames = products.map((product) => product?.name);
  const productSales = products.map((product) => product?.totalSales);
  const productOrder = products.map((product) => product?.totalOrder);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: "Product sales",
        data: productSales,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
     
    ],
  };
  return (
    <div style={{ width: "380px", marginLeft: "30%" }}>
      <Doughnut data={data} />;
    </div>
  );
};

export default DonutChart;
