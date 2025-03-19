import { Button } from "../ui/button";

export function BotaoBarraDeOpcoes(props: any) {
  const { children, onClick } = props;

  return (
    <Button
      className="bg-white text-black hover:bg-gray-300 p-2"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function BotaoBarraDeOpcoesComoDiv(props: any) {
  const { children, onClick } = props;

  return (
    <Button
      asChild={true}
      className="bg-white text-black hover:bg-gray-300 p-2"
      onClick={onClick}
    >
      <div>{children}</div>
    </Button>
  );
}
