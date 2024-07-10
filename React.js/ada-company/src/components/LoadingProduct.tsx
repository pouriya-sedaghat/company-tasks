import { Col, Placeholder } from "react-bootstrap";

function LoadingProduct({ repeat }: { repeat: number }) {
  return (
    <>
      {[...Array(repeat)].map((_, index) => (
        <Col
          key={index.toString()}
          lg={3}
          md={5}
          xs={10}
          className="text-center overflow-hidden border border-secondary rounded-5 p-0 p-3"
        >
          <Placeholder
            as={"div"}
            animation="glow"
            className="mb-3 overflow-hidden rounded-5 ratio ratio-16x9"
          >
            <Placeholder xs={12} />
          </Placeholder>
          <div>
            <Placeholder as={"h2"} animation="glow">
              <Placeholder xs={3} />
            </Placeholder>
            <Placeholder as={"p"} animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
            <Placeholder as={"span"} animation="glow">
              <Placeholder xs={5} className="rounded py-3" />
            </Placeholder>
          </div>
        </Col>
      ))}
    </>
  );
}

export default LoadingProduct;
