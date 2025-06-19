type TableProps = React.PropsWithChildren;

const Table = (props: TableProps) => {
  return <table>{props.children}</table>;
};

export default Table;
