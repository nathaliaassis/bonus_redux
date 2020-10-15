import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../store";
import { ICartItem } from "../store/modules/cart/types";

// import { Container } from './styles';

const Cart: React.FC = () => {
  const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items); // o segundo tipo passado é o retorno, que no caso é um array

  return (
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <tr key={item.product.id}>
            <td>{item.product.title}</td>
            <td>{item.product.title}</td>
            <td>{item.quantity}</td>
            <td>{(item.product.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Cart;
