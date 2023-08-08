import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetProductsQuery } from "../../features/products/productsApi";
import Sidebar from "../Sidebar/Sidebar";
import DonutChart from "./DonutChart";
import Data from "./Data";
import Loader from "../Shared/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { data: products } = useGetProductsQuery();
  if (!products) {
    return <Loader />;
  }
  const productNames = products.map((product) => product?.name);
  const productSales = products.map((product) => product?.totalSales);
  const productOrder = products.map((product) => product?.totalOrder);
  const data = {
    labels: productNames,
    datasets: [
      {
        label: "Sales",
        data: productSales, // Use the data from Redux in the chart
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Orders",
        data: productOrder, // Use the data from Redux in the chart
        backgroundColor: "rgba(175, 12, 192, 0.6)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales dashboard",
      },
    },
  };

  return (
    <>
      <Sidebar />
      <div style={{ width: "800px", height: "600px", marginLeft: "30%" }}>
        <Data />
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default Dashboard;
