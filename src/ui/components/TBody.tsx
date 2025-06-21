import { TableBody as T } from "../../ui/components/shadcn/components/table";

type TBodyProps = React.PropsWithChildren & {
  height?: number;
  style: React.CSSProperties;
};

const TBody = (props: TBodyProps) => {
  return (
    <T
      style={{
        ...props.style,
        position: "relative",
        overflowY: "auto",
      }}
    >
      {props.children}
    </T>
  );
};

export default TBody;
