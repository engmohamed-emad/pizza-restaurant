import React from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity, getCurrentQuantityById } from './cartSlice';
import Button from '../../ui/Button';
function UpdateItemQuantity({pizzaId}) {
    const dispatch = useDispatch();
    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
    return (
        <div className="flex items-center gap-2">
            <Button type='round' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
            <span className='font-bold'>{currentQuantity}</span>
            <Button type='round' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
    );
}

export default UpdateItemQuantity;
