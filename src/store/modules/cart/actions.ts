import { IProduct } from "./types";

export function addProductToCart(product: IProduct) {
  return {
    type: "ADD_PRODUCT_TO_CART", //obrigatório, de preferencia em caixa alta e o mais descritível possível
    payload: {
      //qualquer informação adicional necessária para adicionar o produto ao carrinho (parâmetros)
      product,
    },
  };
}
