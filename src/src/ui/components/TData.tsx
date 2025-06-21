type TDataProps = React.PropsWithChildren;

const TData = (props: TDataProps) => {
  return <td>{props.children}</td>;
};

export default TData;
