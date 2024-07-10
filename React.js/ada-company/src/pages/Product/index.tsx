import { Row, Col, Image } from "react-bootstrap";

import { useParams } from "react-router-dom";

import products from "../../data/products.json";

import { Product } from "../../interface/Product";

import { useSelector, useDispatch } from "react-redux";

import { IRootState } from "../../redux/store";

import { ADD_ITEM } from "../../redux/slices/cart";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function ProductDetail() {
  const { slug } = useParams();

  const product: Product = products.find(
    (item) => item.slug === slug
  ) as Product;

  const { cartItems } = useSelector((state: IRootState) => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function addToCartHandler() {
    const existiongItem = cartItems.find((item) => item.slug === product.slug);

    const quantity = existiongItem ? existiongItem.quantity! + 1 : 1;

    if (quantity > product.count) return toast.error("Product Is Out.");

    dispatch(ADD_ITEM({ ...product, quantity }));

    toast.success("Product Added.");

    navigate("/cart");
  }

  return (
    <Row>
      <Col xs={12}>
        <div className="w-res text-center mx-auto">
          <Image src={product.image} alt={product.title} fluid />
        </div>
        <div>
          <h2 className="h5">{product.title}</h2>
          <p className="text-justify">{product.description}</p>
          <p>Category : {product.category}</p>
          <p>Count : {product.count}</p>
          <p>Price : {product.price}</p>
          <button
            className="btn btn-success d-block mx-auto"
            onClick={addToCartHandler}
          >
            <i className="bi bi-cart3"></i> Add To Cart
          </button>
        </div>
      </Col>
    </Row>
  );
}

export default ProductDetail;
