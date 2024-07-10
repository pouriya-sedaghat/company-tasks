import { Col, Image } from "react-bootstrap";

import { Product } from "../interface/Product";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { ADD_ITEM } from "../redux/slices/cart";

import { IRootState } from "../redux/store";

import SetQuantity from "./SetQuantity";

import { toast } from "react-toastify";

function ProductItem({ pItem }: { pItem: Product }) {
  const { cartItems } = useSelector((state: IRootState) => state.cart);

  const dispatch = useDispatch();

  const existingItem = cartItems.find((item) => item.slug === pItem.slug);

  function addToCartHandler() {
    const quantity = 1;

    const newItem = {
      ...pItem,
      quantity,
    };

    if (quantity > pItem.count) return toast.error("Product Is Out.");

    dispatch(ADD_ITEM(newItem));

    toast.success("Product Added.");
  }

  return (
    <Col
      lg={3}
      md={5}
      xs={10}
      className="text-center border border-secondary rounded-5 p-0 py-3"
    >
      <Link
        to={`/product/${pItem.slug}`}
        className="d-block mx-auto mb-1 ratio ratio-16x9"
      >
        <Image
          src={pItem.image}
          alt={pItem.title}
          fluid
          className="object-fit-contain"
        />
      </Link>
      <div>
        <h2 className="h5">{pItem.title}</h2>
        <p>{pItem.price.toLocaleString()} IRR</p>
        {existingItem ? (
          <SetQuantity product={existingItem} />
        ) : (
          <button className="btn btn-success" onClick={addToCartHandler}>
            <i className="bi bi-cart3"></i> Add To Cart
          </button>
        )}
      </div>
    </Col>
  );
}

export default ProductItem;
