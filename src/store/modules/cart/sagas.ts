import { all, takeLatest, select, call, put } from "redux-saga/effects";
import {
  addProductToCartRequest,
  addProductToCartSuccess,
  addProductToCartFailure,
} from "./actions";
import { IState } from "../../index";
import api from "../../../services/api";

import { AxiosResponse } from "axios";
import { ActionTypes } from "./types";

//tipando
type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

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
  //o primeiro parametro de call() é qual funcao assincrona queremos executar, o segundo parametro é o paramentro da funcao assincrona que vamos executar
  const availableStockReponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockReponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  //primeiro parametro é qual acao quero escutar e o segundo parametro qual função executar quando a action for disparada
  takeLatest(ActionTypes.addProductToCartRequest, checkAllStock),
]);

//exemplo se o usuario clicar 5 vezes para disparar a acao
//takelatest pega a ultima requisicao feita pelo o usuario e ignora as outras
//takeevery pega envia todas as requisicoes do usuario
//takeleading espera a primeira requisicao carregar para retornar algo

// o select serve para eu buscar informações do meu estado

// o put é a mesma coisa que o dispatch, ele dispara uma acao

//todo put tem que ter um yield antes
