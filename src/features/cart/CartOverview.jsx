import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { getCartTotalPrice,getTotalNumberOfPizzas } from './cartSlice';
function CartOverview() {
  const totalNumberOfPizzas = useSelector(getTotalNumberOfPizzas);
  const totalPrice = useSelector(getCartTotalPrice);
  if (totalNumberOfPizzas === 0) {
    return null;
  }
  return (
    <div className='bg-stone-900 text-stone-200 p-4 flex md:text-base text-sm uppercase sm:px-6 items-center justify-between' >
      <p className='space-x-4 sm:space-x-6'>
        <span>{totalNumberOfPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
