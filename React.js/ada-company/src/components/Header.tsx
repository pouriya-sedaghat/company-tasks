import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

function Header() {
  const { cartItems } = useSelector((state: IRootState) => state.cart);

  return (
    <Container fluid className="bg-dark text-light">
      <Row>
        <Col xs={12} className="py-2">
          <header>
            <nav className="d-flex justify-content-between align-items-center">
              <Link to="/" className="text-decoration-none text-reset px-2">
                <h1 className="h4 m-0">ADA SHOP</h1>
              </Link>
              <ul className="d-flex gap-1 list-unstyled m-0">
                <li>
                  <Link
                    to="/cart"
                    className="text-decoration-none text-reset px-2"
                  >
                    Cart{" "}
                    <span className="badge bg-light text-dark">
                      {cartItems.reduce((acc, cur) => acc + cur.quantity!, 0)}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-decoration-none text-reset px-2"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
