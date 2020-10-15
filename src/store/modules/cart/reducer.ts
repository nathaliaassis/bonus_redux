import { Reducer } from "redux";
import { IProduct, ICartItem, ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
};

//a reducer é uma função e ela recebe dois parâmetros (state e action)
//a action retorna o type e o payload
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART": {
      //devemos seguir o princípio da imutabilidade, retornando um novo estado com as alterações desejadas

      const { product } = action.payload;
      console.log(product);
      return {
        ...state,
        items: [
          ...state.items,
          {
            product,
            quantity: 1,
          },
        ],
      };
      break;
    }
    default:
      return state;
  }
};

export default cart;
