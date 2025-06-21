import { TableHeader as T } from "../../ui/components/shadcn/components/table";

type THeadProps = React.PropsWithChildren;

const THead = (props: THeadProps) => {
  return <T>{props.children}</T>;
};

export default THead;
