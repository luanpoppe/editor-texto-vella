import {
  AlterarTextoIA,
  FuncoesIABubble,
  ObjetivoChamadaIABubble,
} from "./bubble-functions.model";
import { BubbleUtils } from "./bubble-integration";

/* eslint-disable @typescript-eslint/ban-ts-comment */
export class SendToBubble {
  static enviarTextoAtualizado(texto: string, param2: any) {
    const params = BubbleUtils.createSendParams(texto, param2);

    //@ts-ignore
    // bubble_fn_enviarTextoAtualizado(params);
  }

  static alterarTextoIA(
    textosIA: AlterarTextoIA,
    objetivoChamadaIA: ObjetivoChamadaIABubble,
    funcaoChamadaIA: FuncoesIABubble,
    ultimoNodeId?: string
  ) {
    const json = JSON.stringify(textosIA);
    const params = BubbleUtils.createSendParams(
      json,
      objetivoChamadaIA,
      funcaoChamadaIA,
      ultimoNodeId
    );

    //@ts-ignore
    bubble_fn_alterarTextoIA(params);
  }

  static editorFoiInicializado() {
    //@ts-ignore
    // bubble_fn_editorFoiInicializado();
    console.log("INICIOU APP");
  }
}
