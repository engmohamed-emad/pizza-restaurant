import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { getCurrentQuantityById } from "../cart/cartSlice";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItem={
      pizzaId: id,  
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice
    };
    dispatch(addItem(newItem));
  }
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  return (
    <li className="flex items-center gap-4 p-4 border-b border-slate-200 ">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut? 'opacity-70 grayscale': 'hover:scale-115 transition-transform duration-200' }`} />
      <div className="flex flex-col flex-grow">
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div className="mt-5 flex items-center justify-between">

          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
      <div>
         {currentQuantity > 0 &&
         <div className="flex items-center gap-10">
          <UpdateItemQuantity pizzaId={id} />
          <DeleteItem pizzaId={id} />
          </div>}
         {!soldOut && currentQuantity === 0 && <Button type="small" onClick={handleAddToCart}>Add to Cart</Button>}
      </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
