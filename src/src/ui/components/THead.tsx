type THeadProps = React.PropsWithChildren;

const THead = (props: THeadProps) => {
  return <thead>{props.children}</thead>;
};

export default THead;
