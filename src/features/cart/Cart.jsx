import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';
// koko
function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  function handleClearCart() {
  dispatch(clearCart());
}
  if(!cart || cart.length === 0) {
     return <EmptyCart />;
  }
  return (
      <div className='px-4 py-6'>
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className='mt-7 text-xl font-bold'>Your cart, {username}</h2>
<ul>
        {cart.map((item) => (<CartItem key={item.pizzaId} item={item} />))}
</ul>
      <div>
        <div className='flex items-center space-x-8 mt-4'>
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button type="secondary" onClick={handleClearCart}>Clear cart</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
