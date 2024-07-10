import { Col } from "react-bootstrap";

import { useForm, SubmitHandler } from "react-hook-form";

import { ToDoProps } from "../interface/ToDoProps";

import { FormValues } from "../interface/Formvalues";

function ToDoForm({ loading, setLoading, getData }: ToDoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({
    firstName,
    lastName,
  }) => {
    setLoading(true);

    const reqBody = { firstName, lastName };

    setValue("firstName", "");
    setValue("lastName", "");

    const response = await fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    console.log(responseData);

    setLoading(false);
    getData();
  };

  return (
    <Col xs={12} className="d-flex justify-content-center py-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3 bg-dark text-light rounded-5 px-5 py-4"
      >
        <h2 className="h5">ToDo List</h2>
        <div>
          <label htmlFor="first-name">First Name</label>
          <br />
          <input
            type="text"
            id="first-name"
            placeholder="Enter Your First Name"
            {...register("firstName", { required: true })}
            className="bg-transparent text-reset border border-light rounded my-2 px-2 py-1"
            autoFocus
          />
          {errors.firstName && (
            <small className="d-block text-danger">
              * Please Enter Your First Name.
            </small>
          )}
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <br />
          <input
            type="text"
            id="last-name"
            placeholder="Enter Your Last Name"
            {...register("lastName", { required: true })}
            className="bg-transparent text-reset border border-light rounded my-2 px-2 py-1"
            autoFocus
          />
          {errors.lastName && (
            <small className="d-block text-danger">
              * Please Enter Your First Name.
            </small>
          )}
        </div>
        <button
          disabled={loading}
          className="align-self-center btn btn-success"
        >
          Submit
        </button>
      </form>
    </Col>
  );
}

export default ToDoForm;
