import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IProduct } from "../commons/interfaces/product";
import instance from "../config/axios";
import LayoutAdmin from "../pages/admin";
import ProductAdd from "../pages/admin/products/add";
import ProductEdit from "../pages/admin/products/edit";
import ProductList from "../pages/admin/products/list";
import LayoutWebsite from "../pages/website";
import Login from "../pages/website/Auth/Login";
import CartPage from "../pages/website/Cart/CartPage";
import HomePage from "../pages/website/Home";
import NotFound from "../pages/website/NotFound/NotFound";
import DetailProduct from "../pages/website/ProductDetail/DetailProduct";
import ShopPage from "../pages/website/shop/ShopPage";
import PrivateRouter from "./PrivateRouter";
import Statistical from "../pages/admin/Statistical/statistical";
import DoughnutChart from "../pages/admin/Statistical/statistical";

const Router = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const handleAdd = async (product: IProduct) => {
    try {
      const { data } = await instance.post(`/products`, product);
      setProducts([...products, data]);
      navigate("/admin/products");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handelEdit = async (product: IProduct) => {
    try {
      const { data } = await instance.put(`/products/${product.id}`, product);
      setProducts(products.map((item) => (item.id !== data.id ? data : item)));
      navigate("/admin/products");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<HomePage />} />
        <Route path="/shop/products/:id" element={<DetailProduct />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="admin"
        element={
          <PrivateRouter>
            <LayoutAdmin />
          </PrivateRouter>
        }
      >
        <Route index path="products" element={<ProductList />} />
        <Route
          path="products/add"
          element={<ProductAdd onsubmit={handleAdd} />}
        />
        <Route
          path="products/edit/:id"
          element={<ProductEdit onUpdate={handelEdit} />}
        />
        <Route path="statistical" element={<DoughnutChart />} />
      </Route>
    </Routes>
  );
};

export default Router;
