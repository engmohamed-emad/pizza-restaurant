// Test ID: IIDSAT
/* eslint-disable react-refresh/only-export-components */
import { useFetcher, useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";


function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  
  const order =useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const fetcher =useFetcher();

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  useEffect(function()
  {
    if(!fetcher.data && fetcher.state==="idle")
    fetcher.load(`/menu`);
  },[fetcher])
  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-semibold"> Order <span className="text-yellow-500">#{id}</span>  Status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 text-xl font-semibold uppercase text-red-50 tracking-wide">Priority</span>}
           <span className="bg-green-500 rounded-full py-1 px-3 text-xl font-semibold uppercase text-red-50 tracking-wide"> {status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 bg-stone-200 px-4 py-6 rounded-lg">
        <p className="text-lg font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-600">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="space-y-4 flex flex-col px-4 py-6 rounded-lg">
        {cart.map((item) => (
          <OrderItem
              key={item.pizzaId}
              item={item}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients= {fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []}
            />
        ))}
      </ul>

      <div className="space-y-4 bg-stone-200 px-4 py-6 rounded-lg">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-lg font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({params})
{
   const order= await getOrder(params.orderId);
   return order;
}
export default Order;
