import React, { useState, useEffect } from "react";
import { Table } from "antd";
import instance from "../../../config/axios";
import { IProduct } from "../../../commons/interfaces/product";
import { ProductColumns } from "./Column";

export const NewTable: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products?_expand=category`);
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      const cf = window.confirm("Bạn có muốn xóa?");
      if (cf) {
        await instance.delete(`/products/${id}`);
        setProducts(products.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return <Table columns={ProductColumns({ handleRemove })} dataSource={products} />;
};
