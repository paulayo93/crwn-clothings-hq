import React from "react";
import CustomButton  from "../custom-button/custom-button.component";
import './cart-dropdown.styles.scss';
import CartItem from "../cart-item/cart-item.component";
import {useSelector, useDispatch} from 'react-redux';
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import {  useHistory } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropDown = () => {
    const cartItems = useSelector(selectCartItems);
    const  dispatch = useDispatch();
    const history = useHistory();
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.length ? (
                            cartItems.map(cartItem => (
                                <CartItem key={cartItem.id} item={cartItem}/>
                            ))
                        )
                        :
                        (
                            <span className='empty-message'>Your cart is empty</span>
                        )

                }

            </div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default CartDropDown;
