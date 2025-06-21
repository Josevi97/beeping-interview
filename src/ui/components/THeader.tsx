import { TableHead as T } from "../../ui/components/shadcn/components/table";

type THeaderProps = React.PropsWithChildren & {
  onClick?(e: any): void;
};

const THeader = (props: THeaderProps) => {
  if (props.onClick)
    return (
      <T>
        <button onClick={props.onClick}>{props.children}</button>
      </T>
    );

  return <T>{props.children}</T>;
};

export default THeader;
