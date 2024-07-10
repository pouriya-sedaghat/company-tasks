import { Col } from "react-bootstrap";

import { ToDoProps } from "../interface/ToDoProps";

function ToDoTable({ data, loading, setLoading, getData }: ToDoProps) {
  async function editHandler(id: number) {
    setLoading(true);

    const firstName = window.prompt("Enter Your First Name");
    const lastName = window.prompt("Enter Your Last Name");

    const response = await fetch("http://localhost:3000/todo/" + id, {
      method: "PATCH",
      body: JSON.stringify({ firstName, lastName }),
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    console.log(responseData);

    setLoading(false);
    getData();
  }

  async function removeHandler(id: number) {
    setLoading(true);

    const response = await fetch("http://localhost:3000/todo/" + id, {
      method: "DELETE",
    });

    const responseData = await response.json();
    console.log(responseData);

    setLoading(false);
    getData();
  }

  return (
    <Col xs={12}>
      <table className="table table-bordered table-dark table-hover table-striped text-center align-middle">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            data!.length !== 0 ? (
              data!.map((item, index) => (
                <tr key={index.toString()}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-warning"
                        onClick={() => editHandler(item.id!)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeHandler(item.id!)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No Item</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={3}>Loading ...</td>
            </tr>
          )}
        </tbody>
      </table>
    </Col>
  );
}

export default ToDoTable;
