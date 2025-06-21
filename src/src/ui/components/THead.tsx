type THeadProps = React.PropsWithChildren;

const THead = (props: THeadProps) => {
  return <div>{props.children}</div>;
};

export default THead;
