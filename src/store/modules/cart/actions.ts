import { IProduct } from "./types";

export function addProductToCartRequest(product: IProduct) {
  return {
    type: "ADD_PRODUCT_TO_CART_REQUEST", //obrigatório, de preferencia em caixa alta e o mais descritível possível
    payload: {
      //qualquer informação adicional necessária para adicionar o produto ao carrinho (parâmetros)
      product,
    },
  };
}
export function addProductToCartSuccess(product: IProduct) {
  return {
    type: "ADD_PRODUCT_TO_CART_SUCCESS",
    payload: {
      product,
    },
  };
}
export function addProductToCartFailure(productId: number) {
  return {
    type: "ADD_PRODUCT_TO_CART_FAILURE",
    payload: {
      productId,
    },
  };
}
