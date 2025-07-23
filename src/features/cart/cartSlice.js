import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [
    ],
    priorityPrice: 0
};
const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
       addItem(state, action) {
        state.cart.push(action.payload);
       },
       deleteItem(state, action) {
        const itemId = action.payload;
        state.cart = state.cart.filter(item => item.pizzaId !== itemId);
       },
       increaseItemQuantity(state, action) {
        const itemId = action.payload;
        const item = state.cart.find(item => item.pizzaId === itemId);
        if (item) {
            item.quantity += 1;
            item.totalPrice = item.quantity * item.unitPrice;
        }
       },
       decreaseItemQuantity(state, action) {
        const itemId = action.payload;
        const item = state.cart.find(item => item.pizzaId === itemId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            item.totalPrice = item.quantity * item.unitPrice;
        } else if (item && item.quantity === 1) {
            state.cart = state.cart.filter(item => item.pizzaId !== itemId);
        }
       },
       clearCart(state) {
        state.cart = [];
       },
       setPriority(state, action) {
        if(action.payload) {
            state.priorityPrice = .2* state.cart.reduce((total, item) => total + item.totalPrice, 0)    ;
        }
        else {
            state.priorityPrice = 0;
        }
     }
    }
});

export const getCurrentQuantityById = id=> state => {
    return state.cart.cart.find(item => item.pizzaId === id)?.quantity || 0;
}

export const getCartTotalPrice = state => {
    return state.cart.cart.reduce((total, item) => total + item.totalPrice, 0)+ state.cart.priorityPrice;
}

export const getTotalNumberOfPizzas = state => {
    return state.cart.cart.reduce((total, item) => total + item.quantity, 0);
}

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart, setPriority } = cartSlice.actions;
export default cartSlice.reducer;