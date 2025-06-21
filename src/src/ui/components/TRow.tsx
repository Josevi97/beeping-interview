type TRowProps = React.PropsWithChildren & {
  id?: string;
  style?: React.CSSProperties;
};

const TRow = (props: TRowProps) => {
  return (
    <div id={props.id} style={props.style}>
      {props.children}
    </div>
  );
};

export default TRow;
