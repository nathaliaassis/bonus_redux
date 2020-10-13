import { Reducer } from "redux";
import { IProduct, ICartItem, ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
};
const cart: Reducer<ICartState> = () => {
  return INITIAL_STATE;
};

export default cart;
