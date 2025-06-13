export function stringfy(obj: object) {
  return JSON.stringify(obj, null, 2);
}

export function gerarNumeroAleatorioEmIntervalo(
  numeroInicial: number,
  numeroFinal: number
) {
  return (
    Math.floor(Math.random() * (numeroFinal - numeroInicial + 1)) +
    numeroInicial
  );
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
