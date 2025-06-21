import { forwardRef } from "react";
import { TableBody as T } from "../../ui/components/shadcn/components/table";

type TBodyProps = React.PropsWithChildren & {
  height?: number;
  className?: string;
};

const TBody = forwardRef<HTMLTableSectionElement, TBodyProps>(
  (props: TBodyProps, ref) => {
    return (
      <T ref={ref} className={props.className}>
        {props.children}
      </T>
    );
  },
);

TBody.displayName = "TBody";

export default TBody;
