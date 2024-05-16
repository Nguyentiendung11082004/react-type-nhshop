import React from "react";
import { Button, TableColumnsType } from "antd";
import { IProduct } from "../../../commons/interfaces/product";
import { Link } from "react-router-dom";

interface ProductColumnsProps {
  handleRemove: (id: any) => void;
}

export const ProductColumns = ({ handleRemove }: ProductColumnsProps): TableColumnsType<IProduct> => [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image: string) => (
      <img src={image} alt="Product" style={{ width: 50 }} />
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (category) => category.name,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_,record) => (
      <div>
        <Link to={`/admin/products/edit/${record.id}`} ><Button type="primary">Update</Button></Link>
        <Button danger onClick={() => handleRemove(record.id)}>Delete</Button>
      </div>
    ),
  },
];
