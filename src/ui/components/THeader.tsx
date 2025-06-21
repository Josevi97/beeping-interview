import { TableHead as T } from "../../ui/components/shadcn/components/table";

type THeaderProps = React.PropsWithChildren & {
  onClick?(): void;
};

const THeader = (props: THeaderProps) => {
  if (props.onClick)
    return (
      <T>
        <button>{props.children}</button>
      </T>
    );

  return <T>{props.children}</T>;
};

export default THeader;
