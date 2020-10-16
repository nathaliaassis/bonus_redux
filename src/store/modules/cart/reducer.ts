import { Reducer } from "redux";
import produce from "immer";
import { ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};
/**** REGRAS DE NEGÓCIO SÃO FEITAS NO REDUCER *****/
//a reducer é uma função e ela recebe dois parâmetros (state e action)
//a action retorna o type e o payload
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_PRODUCT_TO_CART_SUCCESS": {
        const { product } = action.payload;

        //percorre o carrinho para ver se o ID do produto a ser adicionado já existe no carrinho,
        //se encontrado é retornado o index dele
        const productInCardIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCardIndex >= 0) {
          //se houver produto com o mesmo id ele vai apenas aumentar a quantidade daquele produto
          draft.items[productInCardIndex].quantity++;
        } else {
          //se não houver produto com o mesmo id ele vai adicionar o produto
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      case "ADD_PRODUCT_TO_CART_FAILURE": {
        draft.failedStockCheck.push(action.payload.productId);
        break;
      }
      default:
        return draft;
    }
  });

  //o produce recebe o estado atual e o draft (rascunho) tem o mesmo
  //formato mas sem imutabilidade, entao podemos alterá-lo sem o conceito da imutabilidade
  // return produce(state, (draft) => {
  //   draft.items.push({
  //     product,
  //     quantity: 1,
  //   });
  // });
  /*
  // princípio da imutabilidade, retornando um novo estado com as alterações desejadas
  return {
    ...state,
    items: [
      ...state.items,
      {
        product,
        quantity: 1,
      },
    ],
  };*/
};

export default cart;
