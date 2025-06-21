type THeaderProps = React.PropsWithChildren;

const THeader = (props: THeaderProps) => {
  return <th>{props.children}</th>;
};

export default THeader;
