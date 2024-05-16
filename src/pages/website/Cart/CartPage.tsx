import React, { useEffect, useState } from "react";
import instance from "../../../config/axios";
import FormatMoney from "../../../utils/formatMoney";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
};
type Props = {};
const CartPage = () => {
  const [item, setItem] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  
  useEffect(() => {
    fetchCartItems();
  }, []);
  const fetchCartItems = async () => {
    try {
      const { data } = await instance.get<CartItem[]>(`/orderitem`);
      setItem(data);
      calculateTotal(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteCart = async (id: number) => {
    try {
      const cf = window.confirm("Bạn có muốn xóa?");
      if (cf) {
        await instance.delete(`/orderitem/${id}`);
        fetchCartItems();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
 
  const calculateTotal = (cartItems: CartItem[]) => {
    let totalPrice = 0;
    cartItems.forEach((x) => {
      console.log("x",x)
      totalPrice += x.qty * x.price;
   
    });
    setTotal(totalPrice);
  };
  const updateQuantity = async (id: number, newQuantity: number) => {
    try {
      await instance.patch(`/orderitem/${id}`, { qty: newQuantity });
      fetchCartItems();
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleIncreaseQuantity = (id: number) => {
    const updatedItems = item.map((cartItem) => {
      if (cartItem.id === id) {
        console.log(cartItem);
        return { ...cartItem, qty: cartItem.qty + 1};
      }
      console.log(cartItem);
      return cartItem;
    });
    setItem(updatedItems);
    const updatedCartItem = updatedItems.find((item) => item.id === id);
    if (updatedCartItem) {
      updateQuantity(id, updatedCartItem.qty);
    }
  };
 
  const handleDecreaseQuantity = (id: number) => {
    const updatedItems = item.map((cartItem) => {
      if (cartItem.id === id) {
        console.log(cartItem);
      
        const newQty = Math.max(cartItem.qty - 1, 0);
        return { ...cartItem, qty: newQty };
      }
      console.log(cartItem);
      return cartItem;
    });
    setItem(updatedItems);
    const updatedCartItem = updatedItems.find((item) => item.id === id);
    if (updatedCartItem) {
      updateQuantity(id, updatedCartItem.qty);
    }
  };
  return (
    <>
      <div>
        <section className="banner">
          <img src="src/assets/icons/banner.png" className="banner__img" />
          <h2 className="banner__cart">Cart</h2>
          <p className="banner__cart__heading">
            Home
            <img
              className="banner__cart__icon"
              src="src/assets/icons/dashicons_arrow-down-alt2.png"
            />
            Cart
          </p>
        </section>
        <section className="cart">
          <div className="container">
            <div className="cart__inner">
              <div className="cart__inner__info">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item?.map((cartItem: CartItem, index: number) => {
                      return (
                        <tr key={cartItem.id}>
                          <th>{index + 1}</th>
                          <th>{cartItem.name}</th>
                          <th>{cartItem.price}</th>
                          <th>
                            <button className="qty"
                            onClick={()=> handleDecreaseQuantity(cartItem.id)}
                            >-</button>
                            <span>{cartItem.qty}</span>
                            <button
                              className="qty"
                              onClick={() =>
                                handleIncreaseQuantity(cartItem.id)
                              }
                            >
                              +
                            </button>
                          </th>
                          <th>
                            <img
                              style={{ height: "40px", margin: "0 auto" }}
                              src={String(cartItem.image)}
                              alt={cartItem.name}
                            />
                          </th>
                          <th>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteCart(cartItem.id)}
                            >
                              Delete
                            </button>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="cart__inner__total">
                <div className="cart__inner__total__heading">
                  <h2>Cart Totals</h2>
                </div>
                <div className="cart__inner__total__content">
                  <div>
                    <p className="title">Subtotal</p>
                    <p>{FormatMoney(total)}</p>
                  </div>
                  <div>
                    <p className="title">Total </p>
                    <p>{total ? FormatMoney(total) : "0"}</p>
                  </div>
                </div>
                <div className="cart__total__btn" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CartPage;
