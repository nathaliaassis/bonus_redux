import { all, takeLatest, select } from "redux-saga/effects";
import { addProductToCartRequest } from "./actions";
import { IState } from "../../index";

//tipando
type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

//aqui como parametro eu recebo todos os dados da action, se eu coloco só action
//ele nao consegue entender o formato dessa action, devamos tipar da maneira acima
function* checkAllStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return (
      //verifica se produto existe no carrinho, se existir retorna a quantidade, senão retornará 0
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });
}

export default all([
  //primeiro parametro é qual acao quero escutar e o segundo parametro qual função executar quando a action for disparada
  takeLatest("ADD_PRODUCT_TO_CART_REQUEST", checkAllStock),
]);

//exemplo se o usuario clicar 5 vezes para disparar a acao
//takelatest pega a ultima requisicao feita pelo o usuario e ignora as outras
//takeevery pega envia todas as requisicoes do usuario
//takeleading espera a primeira requisicao carregar para retornar algo

// o select serve para eu buscar informações do meu estado
