import { Row, Col, Image } from "react-bootstrap";

import { useSelector } from "react-redux";

import { IRootState } from "../../redux/store";

import { useNavigate } from "react-router-dom";

import SetQuantity from "../../components/SetQuantity";

import { useEffect } from "react";

function Cart() {
  const { cartItems } = useSelector((state: IRootState) => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) return navigate("/");
  }, [cartItems.length]);

  return (
    <Row className="gap-md-0 gap-3">
      <Col md={8} xs={12} className="d-flex flex-column gap-3 px-md-0 px-3">
        {cartItems.map((item) => (
          <Col
            xs={12}
            key={item.slug}
            className="d-flex flex-sm-row flex-column gap-2 justift-content-sm-between border border-secondary border-2 rounded-3 px-sm-5 py-sm-2 py-3"
          >
            <div className="d-flex flex-sm-row flex-column align-items-center gap-2 flex-sm-grow-1">
              <div className="w-cart ratio ratio-1x1">
                <Image
                  src={item.image}
                  alt={item.title}
                  fluid
                  className="object-fit-contain"
                />
              </div>
              <div className="text-sm-start text-center">
                <h2 className="h5 m-0">{item.title}</h2>
                <p className="m-0">{item.price.toLocaleString()} IRR</p>
              </div>
            </div>
            <SetQuantity product={item} optional />
          </Col>
        ))}
      </Col>
      <Col
        md={3}
        xs={6}
        className="text-center border border-secondary border-2 rounded-3 offset-md-1 offset-3 h-fit p-3"
      >
        <p>
          <strong>Total Price</strong>
          <br />
          {cartItems
            .reduce((acc, cur) => acc + cur.quantity! * cur.price, 0)
            .toLocaleString()}{" "}
          IRR
        </p>
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("login?redirect=/shipping")}
        >
          Checkout
        </button>
      </Col>
    </Row>
  );
}

export default Cart;
