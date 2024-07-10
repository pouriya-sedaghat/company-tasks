import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <Container fluid className="bg-dark text-light">
      <Row>
        <Col xs={12} className="text-center py-2">
          <footer>1.0.0 v</footer>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
