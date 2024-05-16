import { useEffect, useState } from "react";
import instance from "../config/axios";

const UseOrderItem = () => {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        const { data } = await instance.get(`/orderitem`);
        let totalQty = 0;
        data.forEach((prices: { qty: any; }) => {
          totalQty += Number(prices.qty);
        });
        setQty(totalQty);
        // console.log("qty",qty)
      } catch (error) {
        console.log("error", error);
      }
      // console.log("a")
    };

    fetchOrderItem();
  }, []);

  return qty;
};
export default UseOrderItem;
