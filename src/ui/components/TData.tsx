import { TableCell as T } from "../../ui/components/shadcn/components/table";

type TDataProps = React.PropsWithChildren;

const TData = (props: TDataProps) => {
  return <T>{props.children}</T>;
};

export default TData;
