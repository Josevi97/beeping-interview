type TBodyProps = React.PropsWithChildren;

const TBody = (props: TBodyProps) => {
  return <tbody>{props.children}</tbody>;
};

export default TBody;
