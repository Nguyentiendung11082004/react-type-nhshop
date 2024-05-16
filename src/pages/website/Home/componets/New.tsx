import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../../../services/category";
import { ICategory } from "../../../../commons/interfaces/category";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../../../services/product";
import { IProduct } from "../../../../commons/interfaces/product";
import { useCartItem } from "../../../../components/CartItem";
import { useState } from "react";
const New = () => {
  const { data: products } = useQuery({
    queryKey: ["PRODUCTS_KEY"],
    queryFn: getAllProduct,
  });
  const [quantity, setQuantity] = useState<number>(1)
  const { addItem } = useCartItem(); 

  const featuredProducts = products?.filter((product:IProduct)=> product.featured===true)
  return (
    <>
      <section className="news">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">New product </h2>
          </div>
          <div className="section-body">
            <div className="product-list">
              {featuredProducts?.map((product: IProduct,key:number) => {
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
                      to={`/shop/products/${product.id}`}
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
              })}
              {/*End .product-item*/}
              {/*End .product-item*/}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default New;
