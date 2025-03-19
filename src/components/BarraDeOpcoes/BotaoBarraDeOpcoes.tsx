import { Button } from "../ui/button";

type BotaoBarraDeOpcoesProps = React.PropsWithChildren &
  React.ComponentProps<"button">;

export function BotaoBarraDeOpcoes({
  children,
  className,
  ...props
}: BotaoBarraDeOpcoesProps) {
  return (
    <Button
      className={`bg-white text-black hover:bg-gray-300 p-2 ${className ?? ""}`}
      {...props}
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
