export function BotaoBarraDeOpcoes(props) {
  const { children, onClick } = props;

  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        cursor: "pointer",
        borderRadius: "4px",
        padding: "8px 4px",
      }}
      className="button-hover"
    >
      {children}
    </button>
  );
}
