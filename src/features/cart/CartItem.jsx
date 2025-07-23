import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  function handleDelete() {
     dispatch(deleteItem(pizzaId));
  }
  return (
    <li className="flex items-center gap-4 p-4 border-b border-slate-200 ">
      <p >
        {quantity}&times; {name}
      </p>
       <p className="font-bold">{formatCurrency(totalPrice)}</p>
      <div className="ml-auto flex items-center gap-2">
        <UpdateItemQuantity pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
