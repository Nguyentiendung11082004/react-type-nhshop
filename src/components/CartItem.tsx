import { useState } from "react";
import instance from "../config/axios";

export const useCartItem = () => {

  const addItem = async (
    name: string,
    price: number,
    image: string,
    qty: number
  ) => {
    try {
      let isExisting = false;
      const result = await instance.get(`/orderitem`);

      if (result.data.length === 0) {
        const order = { name, price, image, qty };
        await instance.post(`/orderitem`, order);
      } else {
        for (const orderItem of result.data) {
          if (name === orderItem.name) {
            qty = orderItem.qty + qty; // Tăng qty lên qty cần thêm
            // Lưu vào db
            const order = {
              name,
              price,
              image,
              qty,
            };
            await instance.put(`/orderitem/${orderItem.id}`, order);
            isExisting = true;
            break;
          }
        }

        if (!isExisting) {
          const order = {
            name,
            price,
            image,
            qty,
          };
          await instance.post(`/orderitem`, order);
        }
      }
    } catch (error) {
      console.error("Error while adding item to cart:", error);
    }
  };

  return {
    addItem,
  };
};
