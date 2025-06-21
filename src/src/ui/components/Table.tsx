type TableProps = React.PropsWithChildren;

const Table = (props: TableProps) => {
  return <div role="table">{props.children}</div>;
};

export default Table;
