import { Container, Row } from "react-bootstrap";

import { useState, useEffect } from "react";

import ToDoForm from "../../components/ToDoForm";

import { FormValues } from "../../interface/Formvalues";

import ToDoTable from "../../components/ToDoTable";

function Home() {
  const [data, setData] = useState<FormValues[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const response = await fetch("http://localhost:3000/todo");

    const responseData = await response.json();
    console.log(responseData);

    setLoading(false);
    setData(responseData);
  }

  return (
    <Container>
      <Row>
        <ToDoForm {...{ loading, setLoading, getData }} />
        <ToDoTable {...{ data, loading, setLoading, getData }} />
      </Row>
    </Container>
  );
}

export default Home;
