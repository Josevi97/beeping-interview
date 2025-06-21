type THeaderProps = React.PropsWithChildren & {
  onClick?(): void;
};

const THeader = (props: THeaderProps) => {
  if (props.onClick)
    return (
      <span>
        <button>{props.children}</button>
      </span>
    );

  return <span>{props.children}</span>;
};

export default THeader;
