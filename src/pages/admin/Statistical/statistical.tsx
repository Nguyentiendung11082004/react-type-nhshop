import { useQuery } from "@tanstack/react-query";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { getAllCategory } from "../../../services/category";
import { ICategory } from "../../../commons/interfaces/category";
import { useState } from "react";
Chart.register(ArcElement);

const DoughnutChart = () => {

  // Lấy dữ liệu danh mục từ API
  const { data: categories, isLoading } = useQuery({
    queryKey: ["CATEGORIES_KEY"],
    queryFn: getAllCategory,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!categories) {
    return <div>No data available</div>;
  }

  // Tạo mảng chứa tên của các danh mục
  const categoryNames = categories.map((category: ICategory) => category.name);
  // Tạo dữ liệu cho biểu đồ
  const data = {
    labels: categoryNames,
    datasets: [
      {
        label: "Categories",
        data: categories.map((category: ICategory) => category.id),
        backgroundColor: ["red", "blue", "yellow", "green"], 
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart mt-5">
      <h2>Số lượng sản phẩm theo danh mục</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
