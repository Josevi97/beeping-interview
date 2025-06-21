import { TableRow as T } from "../../ui/components/shadcn/components/table";

type TRowProps = React.PropsWithChildren & {
  id?: string;
  style?: React.CSSProperties;
};

const TRow = (props: TRowProps) => {
  return (
    <T id={props.id} style={props.style}>
      {props.children}
    </T>
  );
};

export default TRow;
