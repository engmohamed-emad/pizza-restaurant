import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import {createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getCartTotalPrice, setPriority } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const navigation= useNavigation();
  const isSubmitting= navigation.state==="submitting";
  const formErrors=useActionData();
  const {username, status:addressStatus, position, address, error:errorAddress} = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const dispatch = useDispatch();
  const totalPrice = useSelector(getCartTotalPrice);
  // const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0;
  // const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) {
    return (
      <EmptyCart />
    );
  }
  return (
    
    <div className="px-4 py-6"> 
      <h2 className="text-xl font-semibold mb-8" >Ready  to  order? Let's  go!</h2>
        <Form method='POST' className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-2">
          <label>First Name</label>
          <input type="text" name="customer" className="input w-auto" defaultValue={username} required />
        </div>

        <div className="flex flex-col gap-2">
          <label>Phone number</label>
            <input type="tel" name="phone" className="input w-auto" required />
            {formErrors?.phone && <p className="text-red-700 bg-red-100 p-2 rounded">{formErrors.phone}</p>}
        </div>

        <div className="flex flex-col gap-2 relative">
          <label>Address</label>
          <input className="input w-auto " type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required />
          {!position.latitude && !position.longitude && <span className="absolute right-0 bottom-[1.4px] ">
          <Button type="small" 
          disabled={isLoadingAddress}
          onClick={(e) => {
            e.preventDefault();
            dispatch(fetchAddress())}}>
            Get location
          </Button>
          </span>
   }
         {addressStatus==='error' && <p className="text-red-700 bg-red-100 p-2 rounded">{errorAddress}</p>}
        </div>
        <div className="flex flex-row gap-2 px-2 my-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="bg-white"
            value={withPriority}
            onChange={(e) => {setWithPriority(e.target.checked); dispatch(setPriority(e.target.checked));}}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="postion" value={position.latitude && position.longitude ? `${position.latitude},${position.longitude}` : ''} />
          <Button type="small" disabled={isSubmitting||isLoadingAddress}>{isSubmitting ? "placing Order..." : `Order now ${formatCurrency(totalPrice)}`}</Button>
        </div>
       </Form>
      
    </div>
   
  );
}

export async function action ({request})
{
  const formData= await request.formData();
  const data = Object.fromEntries(formData);
  
  const order={
    ...data,
    cart:JSON.parse(data.cart),
    priority: data.priority==='true'
  }
   //  console.log("Creating order:", order);
  const errors={};
  if(!isValidPhone(order.phone))
  {
    errors.phone="please enter correct phone number, because we need to contact you";
  }

  if(Object.keys(errors).length>0)
    return errors;

 
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
 
}

export default CreateOrder;
