import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {   IProduct } from "../../../commons/interfaces/product";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import instance from "../../../config/axios";
import { ICategory } from "../../../commons/interfaces/category";
type Props = {
  onsubmit: (product: IProduct) => void;
};
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(0),
  image: Joi.string().required(),
  imageArray: Joi.array().items(Joi.string()),
  description: Joi.string().required(),
  discount: Joi.number().required().min(0),
  quantity: Joi.number().required().min(0),
  categoryId: Joi.string().required(),
});
const ProductAdd = ({ onsubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({ resolver: joiResolver(productSchema) });
  const [category, setCategory] = useState<ICategory[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/categories`);
        setCategory(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="m-4 product-add">
      <h4>Add product</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mt-2">
          <label htmlFor="">Name</label>
          <input type="text" className="form-control" {...register("name")} />
          {errors.name && (
            <div className="text-danger">{errors.name.message}</div>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="">Price</label>
          <input type="text" className="form-control" {...register("price")} />
          {errors.price && (
            <div className="text-danger">{errors.price.message}</div>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="">Image</label>
          <input type="text" className="form-control" {...register("image")} />
          {errors.image && (
            <div className="text-danger">{errors.image.message}</div>
          )}
        </div>
        <div className="mt-2">
      <label htmlFor="">Image Array</label>
      <input type="text" className="form-control" {...register("imageArray")} />
      {/* {errors.imageArray && (
        <div className="text-danger">{errors.imageArray.message}</div>
      )} */}
    </div>
        <div className="mt-2">
          <label htmlFor="">Discount</label>
          <input
            type="text"
            className="form-control"
            {...register("discount")}
          />
          {errors.discount && (
            <div className="text-danger">{errors.discount.message}</div>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="">Quanlity</label>
          <input
            type="text"
            className="form-control"
            {...register("quantity")}
          />
          {errors.quantity && (
            <div className="text-danger">{errors.quantity.message}</div>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="">Description</label>
          <input
            type="text"
            className="form-control"
            {...register("description")}
          />
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="">Category</label> <br />
          <select className="form-control" >
            {category.map((item) => {
              return <option value={item.id} {...register("categoryId")}>{item.name}</option>;
            })}
          </select>
          {errors.categoryId && (
            <div className="text-danger">{errors.categoryId.message}</div>
          )}
        </div>
        <button className="btn btn-success mt-4">Submit</button>
      </form>
    </div>
  );
};

export default ProductAdd;
