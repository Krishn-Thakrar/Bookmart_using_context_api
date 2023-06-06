import React, { useEffect, useState } from "react";
import cartService from "../service/cart.service";
import orderService from "../service/order.service";
import { useAuthContext } from "../context/auth";
import { useCartContext } from "../context/cart";
import shared from "../utils/shared";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = (itemList) => {
    let totalPrice = 0;
    itemList.forEach((item) => {
      const itemPrice = item.quantity * parseInt(item.book.price);
      totalPrice = totalPrice + itemPrice;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    setCartList(cartContext.cartData);
    setItemsInCart(cartContext.cartData.length);
    getTotalPrice(cartContext.cartData);
  }, [cartContext.cartData]);

  const removeItem = async (id) => {
    try {
      const res = await cartService.removeItem(id);
      if (res) {
        cartContext.updateCart();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateQuantity = async (cartItem, inc) => {
    const currentCount = cartItem.quantity;
    const quantity = inc ? currentCount + 1 : currentCount - 1;
    if (quantity === 0) {
      toast.error("Item quantity should not be zero");
      return;
    }

    try {
      const res = await cartService.updateItem({
        id: cartItem.id,
        userId: cartItem.userId,
        bookId: cartItem.book.id,
        quantity,
      });
      if (res) {
        const updatedCartList = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, quantity } : item
        );
        cartContext.updateCart(updatedCartList);
        const updatedPrice =
          totalPrice +
          (inc
            ? parseInt(cartItem.book.price)
            : -parseInt(cartItem.book.price));
        setTotalPrice(updatedPrice);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const placeOrder = async () => {
    if (authContext.user.id) {
      const userCart = await cartService.getList(authContext.user.id);
      if (userCart.length) {
        try {
          let cartIds = userCart.map((element) => element.id);
          const newOrder = {
            userId: authContext.user.id,
            cartIds,
          };
          const res = await orderService.placeOrder(newOrder);
          if (res) {
            cartContext.updateCart();
            navigate("/");
            toast.success(shared.messages.ORDER_SUCCESS);
          }
        } catch (error) {
          toast.error(`Order cannot be placed ${error}`);
        }
      } else {
        toast.error("Your cart is empty");
      }
    }
  };

  console.log(itemsInCart);

  return (
    <>
    <div>
      <center><h1>CartPage</h1></center>
      <p>Total - {itemsInCart} items</p>
      <p>Total price: {totalPrice}</p>
      <div>
        {cartList.map((cartItem) => {
          // return(
            <div key={cartItem.id}>
              <div className="img">
                <img src={cartItem.base64image} alt="Book Image" />
              </div>
              <div className="content">
                <p>{cartItem.book.name}</p>
                <p>cart item name</p>
                <div className="button">
                  <Button variant="contained" onClick={() => updateQuantity(cartItem, true)}>+</Button>
                  <p>{cartItem.quantity}</p>
                  <Button variant="contained" onClick={() => updateQuantity(cartItem, false)}>-</Button>
                </div>
              </div>
              <div className="pr">
                <div className="pay">
                  <p>MRP &#8377; {cartItem.book.price}</p>
                </div>
                <div className="remove">
                  <Button variant="outlined" onClick={() => removeItem(cartItem.id)}>Remove</Button>
                </div>
              </div>
            </div>
          //);
        })}
      </div>
      <div className="placeorder">
        <Button variant="contained" onClick={placeOrder}>Place Order</Button>
      </div>
    </div>
    </>
  );
}

export default CartPage;