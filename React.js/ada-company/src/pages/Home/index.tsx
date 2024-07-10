import { Row, Col, Modal, Button } from "react-bootstrap";

import ProductItem from "../../components/ProductItem";
import productItems from "../../data/products.json";

import { Product } from "../../interface/Product";

import { useToggle } from "../../hooks/useToggle";
import { useFilter } from "../../hooks/useFilter";

import { useState } from "react";

import { useSelector } from "react-redux";

import { IRootState } from "../../redux/store";

import { ToWords } from "to-words";
import LoadingProduct from "../../components/LoadingProduct";

function Home() {
  const filterItems: string[] = ["Book", "Bag", "Shoes", "Cloth"];

  const [show, toggle] = useToggle<boolean>(false);

  const [filter, filterHandler] = useFilter<string[]>([]);

  const [search, setSearch] = useState<string>("");

  const [activeStep, setActiveStep] = useState<number>(6);

  const [loading, setLoading] = useState<boolean>(false);

  const products: Product[] = productItems
    .filter((item) =>
      filter.length !== 0 ? filter.includes(item.category) : item
    )
    .filter((item) =>
      search ? item.title.toLowerCase().match(search.toLowerCase()) : item
    );

  const { cartItems } = useSelector((state: IRootState) => state.cart);

  const toWords = new ToWords();

  async function createTimeOut() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);
    setActiveStep((prev) => prev + 6);
  }

  return (
    <>
      <Row>
        <Col xs={12} className="mb-2">
          <div className="d-flex gap-1 border border-secondary rounded px-3 py-2 mb-2">
            <i className="bi bi-bag-fill"></i>
            <input
              type="search"
              value={search}
              placeholder="Search for the title you want: Bag, Shoes, ..."
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow-1 border-0 outline-0 bg-transparent px-2"
            />
          </div>
          <div className="d-flex flex-wrap gap-1 justify-content-between align-items-center">
            <div>
              <button className="btn btn-outline-warning" onClick={toggle}>
                <i className="bi bi-sliders2-vertical"></i> Filter
              </button>
              <Modal show={show} onHide={toggle} centered>
                <Modal.Header closeButton>
                  <Modal.Title className="h5">Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <h2 className="h6">Options</h2>
                    {filterItems.map((item, index) => (
                      <div key={index.toString()} className="mt-1">
                        <input
                          type="checkbox"
                          name="category"
                          id={item}
                          onChange={filterHandler.bind(null, item)}
                          checked={filter.includes(item)}
                        />
                        <label
                          htmlFor={item}
                          className="px-1 curso"
                          role="button"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={toggle}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <p className="m-0">
              <span className="text-primary">
                {toWords.convert(
                  cartItems.reduce((acc, cur) => acc + cur.quantity!, 0)
                )}
              </span>{" "}
              products have been added to your cart.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="gap-3 justify-content-center">
        {products
          .filter((_, index) => index < activeStep)
          .map((item) => (
            <ProductItem key={item.slug} pItem={item} />
          ))}
        {loading && (
          <LoadingProduct repeat={products.length > activeStep + 6 ? 6 : 1} />
        )}
      </Row>
      <Row className="mt-4">
        <Col xs={12} className="text-center">
          {products.length > 6 ? (
            products.length > activeStep ? (
              <button
                disabled={loading}
                className="btn btn-dark"
                onClick={createTimeOut}
              >
                See More
              </button>
            ) : (
              <button className="btn btn-dark" onClick={() => setActiveStep(6)}>
                Collapse
              </button>
            )
          ) : null}
        </Col>
      </Row>
    </>
  );
}

export default Home;
