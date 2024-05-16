import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartItem } from "../../../components/CartItem";
import {
  getProductById,
  getProductsByCategoryId,
} from "../../../services/product";
import FormatMoney from "../../../utils/formatMoney";
import { IProduct } from "../../../commons/interfaces/product";
import { ICategory } from "../../../commons/interfaces/category";
const DetailProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading: productIsLoading } = useQuery({
    queryKey: ["PRODUCT_KEY", id],
    queryFn: async () => {
      return await getProductById(id as string);
    },
  });
  console.log("product",product)
  const { addItem } = useCartItem();
  // Lấy danh sách sản phẩm cùng categoryId
  const { data: relatedProducts, isLoading: relatedProductsIsLoading } =
    useQuery({
      queryKey: ["RELATED_PRODUCTS_KEY", product?.categoryId],
      queryFn: async () => {
        return await getProductsByCategoryId(product?.categoryId);
      },
      enabled: !!product?.categoryId,
    });

  const [showAll, setShowAll] = useState(false);
  const [quanlity, setQuantity] = useState<number>(1);
  const handleShowMore = () => {
    setShowAll(true);
  };
  const handleShowLess = () => {
    setShowAll(false);
  };
  const [mainImage, setMainImage] = useState("");
  if (productIsLoading || relatedProductsIsLoading) return <p>Loading...</p>;
  return (
    <>
      <div className="nav">
        <p className="nav__text__router">
          <p>Home </p>
          <p>Shop</p>
          <span> | {product.name}</span>
        </p>
      </div>
      <div className="container">
        <div className="product__detail">
          <div className="product__detail__img">
            <div className="product__detail__img__nav">
              {product.imageArray?.map((item: string) => {
                // console.log(item)
                return <img src={item} onClick={() => setMainImage(item)} />;
              })}
            </div>
            <div className="product__detail__img__main">
              {" "}
              <img src={mainImage || product.image} />
            </div>
          </div>
          <div className="product__detail__info">
            <div className="product__detail__info__name">{product.name}</div>
            <div className="product__detail__info__price">
              {FormatMoney(product.price)}
            </div>
            <div className="product__detail__info__feedback">
              <div className="icon">
                <img src="/src/assets/icons/start.svg" alt="" />
                <img src="/src/assets/icons/start.svg" alt="" />
                <img src="/src/assets/icons/start.svg" alt="" />
                <img src="/src/assets/icons/start.svg" alt="" />
                <img src="/src/assets/icons/start.svg" alt="" />
              </div>
              <div className="line"></div>
              <div className="text">5 Customer Review</div>
            </div>
            <div className="product__detail__info__description">
              Mô tả sản phẩm :{product.description}
            </div>
            <div className="product__detail__info__color">
              <p className="title">Color </p>
              <div>
                {product.color.map((item: string) => {
                  return <p style={{ backgroundColor: `${item}` }}></p>;
                })}
              </div>
            </div>
            <div className="product__detail__info__action">
              <input
                className="quanlity"
                defaultValue={quanlity}
                min={0}
                type="text"
                style={{ padding: "20px", fontSize: "16px" }}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button
                className="addtocard"
                onClick={() =>
                  addItem(
                    product.name,
                    product.price,
                    String(product.image),
                    quanlity
                  )
                }
              >
                Add To Card
              </button>
              <button className="compare"> + Compare</button>
            </div>
            <hr style={{ margin: "80px 0px 50px 0px" }} />
            <div className="product__detail__info__extra">
              <div>
                <p className="key">SKU : </p>
                <p>SS001</p>
              </div>
              <div>
                <p className="key">Category : </p>
                  <p>{product.category.name}</p>
              </div>

              <div>
                <p className="key">Tags : </p>
                <p>Sofa, Chair, Home, Shop</p>
              </div>
              
              <div>
                <p className="key">Share : </p>
                <div>
                  <a href="#">
                    <img src="/src/assets/icons/facebook.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="/src/assets/icons/in.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="/src/assets/icons/tư.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ margin: "50px 0px" }} />
        <hr style={{ margin: "75px 0px" }} />
        {/* end product__des */}
        <div className="product__related">
          <div className="container">
            <div className="product__related__heading">
              <h2>Related Products</h2>
            </div>
            <div className="product-list">
              {relatedProducts
                .slice(0, showAll ? relatedProducts.length : 4)
                .map((relatedProduct: any) => (
                  <div className="product-item" key={relatedProduct.id}>
                    <div className="product-image">
                      <img
                        src={relatedProduct.image}
                        className="product__thumbnail"
                      />

                      <span className="product-sale"> {product?.discount}</span>
                    </div>
                    <div className="product-info">
                      <h3 className="product__name">
                        <a href="" className="product__link">
                          {relatedProduct.name}
                        </a>
                      </h3>
                      <a href="" className="product__category">
                        {relatedProduct.category}
                      </a>
                      <div className="product-price">
                        <span className="product-price__new">
                          {FormatMoney(relatedProduct.price)}
                        </span>
                        <span className="product-price__old">
                          {" "}
                          {product?.price}
                        </span>
                      </div>
                    </div>
                    <div className="product-actions">
                      <Link
                        to={`/shop/products/${relatedProduct.id}`}
                        className="btn product-action__quickview"
                      >
                        <button className="btn product-action__quickview">
                          Quick view
                        </button>
                      </Link>
                      <button className="btn product-action__addtocart">
                        Add To Cart
                      </button>
                      <div className="product-actions-more">
                        <span className="product-action__share">
                          <img src="/src/assets/icons/Vector.svg" alt="" />
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
                ))}

              {showAll ? (
                <div className="product__related__btn">
                  <button onClick={handleShowLess}>Show less</button>
                </div>
              ) : (
                <div className="product__related__btn">
                  <button onClick={handleShowMore}>Show more</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
