import { Table as T } from "../../ui/components/shadcn/components/table";

type TableProps = React.PropsWithChildren & {
  className?: string;
};

const Table = (props: TableProps) => {
  return <T className={props.className}>{props.children}</T>;
};

export default Table;
