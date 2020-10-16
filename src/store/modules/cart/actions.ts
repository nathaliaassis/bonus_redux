import { IProduct, ActionTypes } from "./types";

export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartRequest, //obrigatório, de preferencia em caixa alta e o mais descritível possível
    payload: {
      //qualquer informação adicional necessária para adicionar o produto ao carrinho (parâmetros)
      product,
    },
  };
}
export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: {
      product,
    },
  };
}
export function addProductToCartFailure(productId: number) {
  return {
    type: ActionTypes.addProductToCartFailure,
    payload: {
      productId,
    },
  };
}
