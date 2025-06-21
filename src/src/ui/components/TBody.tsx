type TBodyProps = React.PropsWithChildren & {
  height?: number;
  style: React.CSSProperties;
};

const TBody = (props: TBodyProps) => {
  return (
    <div
      style={{
        ...props.style,
        position: "relative",
        overflowY: "auto",
      }}
    >
      {props.children}
    </div>
  );
};

export default TBody;
