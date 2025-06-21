type TRowProps = React.PropsWithChildren & {
  id?: string;
  style?: React.CSSProperties;
};

const TRow = (props: TRowProps) => {
  return (
    <tr id={props.id} style={props.style}>
      {props.children}
    </tr>
  );
};

export default TRow;
