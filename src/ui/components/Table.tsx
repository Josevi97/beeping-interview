import { Table as T } from "../../ui/components/shadcn/components/table";

type TableProps = React.PropsWithChildren;

const Table = (props: TableProps) => {
  return (
    <T role="table" style={{ width: "100%" }}>
      {props.children}
    </T>
  );
};

export default Table;
