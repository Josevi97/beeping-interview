import TData from "./TData";
import TRow from "./TRow";

type LoadingRowProps = {
  style: any;
};

const LoadingRow = ({ style }: LoadingRowProps) => {
  return (
    <TRow style={style}>
      <TData>Cargando mas elementos...</TData>
    </TRow>
  );
};

export default LoadingRow;
