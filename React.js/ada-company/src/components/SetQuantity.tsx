import { Product } from "../interface/Product";

import { useDispatch } from "react-redux";
import { ADD_ITEM, REMOVE_ITEM } from "../redux/slices/cart";

import { toast } from "react-toastify";

type Props = {
  product: Product;
  optional?: boolean;
};

function SetQuantity({ product, optional }: Props) {
  const dispatch = useDispatch();

  function incrementQuantityHandler() {
    const quantity = product.quantity! + 1;

    if (quantity > product.count) return toast.error("Product Is Out.");

    dispatch(ADD_ITEM({ ...product, quantity }));

    toast.success("Increment Quantity.");
  }

  function decrementQuantityHandler() {
    const quantity = product.quantity! - 1;

    if (quantity <= 0) return toast.error("Can't Decrement Quantity.");

    dispatch(ADD_ITEM({ ...product, quantity }));

    toast.success("Decrement Quantity.");
  }

  function removeOfCartHandler() {
    dispatch(REMOVE_ITEM(product));

    toast.success("Product Removed.");
  }

  return (
    <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
      <div className="d-flex">
        <button className="btn btn-danger" onClick={decrementQuantityHandler}>
          -
        </button>
        <span className="btn">{product.quantity}</span>
        <button className="btn btn-success" onClick={incrementQuantityHandler}>
          +
        </button>
      </div>
      {optional && (
        <button className="btn btn-secondary" onClick={removeOfCartHandler}>
          Remove
        </button>
      )}
    </div>
  );
}

export default SetQuantity;
