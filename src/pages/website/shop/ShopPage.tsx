import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../../../services/product";

import instance from "../../../config/axios";
import Pagination from "../../../components/Pagination";
import { useCartItem } from "../../../components/CartItem";
import { IProduct } from "../../../commons/interfaces/product";

const ShopPage = () => {
  const { data: products } = useQuery({
    queryKey: ["PRODUCT_KEY"],
    queryFn: getAllProduct,
  });
  const [searchResult, setSearchResult] = useState<IProduct[]>([]);
  
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(new URLSearchParams(window.location.search).get('page') || "1")
  );
  const [noResults, setNoResults] = useState<boolean>(false); // State để kiểm tra xem có kết quả từ tìm kiếm không (no result => true va nguoc lai)
  const [itemsPerPage] = useState<number>(8);

  const { addItem } = useCartItem(); 
  const [quantity, setQuantity] = useState<number>(1)
  
  const handleSearch = async (query: string) => {
    try {
      const { data } = await instance.get(`/products?q=${query}`);
      setSearchResult(data);
      setCurrentPage(1); 
      setNoResults(data.length === 0 || !data.some((item: any) => item.name.includes(query))); // Kiểm tra xem có kết quả từ tìm kiếm không 
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    handleSearch(query);
  };

  const renderProduct = (product: IProduct, key: number) => {
    return (
      <div className="product-item" key={key}>
        <div className="product-image">
          <img
            src={String(product?.image)}
            alt=""
            className="product__thumbnail"
          />
          <span className="product-sale">{product?.discount}</span>
        </div>
        <div className="product-info">
          <h3 className="product__name">
            <a href="" className="product__link">
              {product.name}
            </a>
          </h3>
          <a href="" className="product__category">
            Stylish cafe chair
          </a>
          <div className="product-price">
            <span className="product-price__new">
              {product?.price - product?.price * (product?.discount / 100)}
            </span>
            <span className="product-price__old">{product?.price}</span>
          </div>
        </div>
        <div className="product-actions">
          <Link
            to={`products/${product.id}`}
            className="btn product-action__quickview"
          >
            <button className="btn product-action__quickview">
              Quick view
            </button>
          </Link>
          <button
            className="btn product-action__addtocart"
            onClick={() =>
              addItem(product.name, product.price, String(product.image), quantity)
            }
          >
            Add To Cart
          </button>
          <div className="product-actions-more">
            <span className="product-action__share">
              <img src="src/assets/icons/Vector.svg" alt="" />
              Share
            </span>
            <span className="product-action__compare">
              <img src="src/assets/icons/Vector2.svg" alt="" />
            </span>
            <span className="product-action__like">
              <img src="src/assets/icons/Vector3.svg" alt="" />
              Like
            </span>
          </div>
        </div>
      </div>
    );
  };

  const getDisplayedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (searchResult.length > 0) {
      return searchResult.slice(startIndex, endIndex);
    }
    return products?.slice(startIndex, endIndex) || [];
  };

  useEffect(() => {
    // Update the URL with the current page value
    window.history.replaceState(null, '', `?page=${currentPage}`);
  }, [currentPage]);

  return (
    <>
      <div className="nav">
        <form className="input-group input-search w-full container" onSubmit={handleSubmit}>
          <div className="form-outline w-full" data-mdb-input-init>
            <input
              type="search"
              id="form1"
              name="search"
              className="form-control w-full"
              placeholder="Nhập sản phẩm bạn muốn tìm"
            />
          </div>
        </form>
      </div>
      <section className="news">
        <div className="container">
        <div className="section-body">
            {noResults ? ( // Kiểm tra xem có kết quả từ tìm kiếm không
              <p className="text-center mt-5 ">No results found.</p>
            ) : (
              <div className="product-list">
                {getDisplayedProducts()?.map((product: IProduct, key: number) =>
                  renderProduct(product, key)
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="pagination">
        <div className="container">
          <div className="pagination__inner__btn">
            <Pagination
              totalPages={Math.ceil(
                (searchResult.length > 0 ? searchResult.length: (products || []).length) / itemsPerPage
              )}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            ></Pagination>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
