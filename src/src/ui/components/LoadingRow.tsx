type LoadingRowProps = {
  style: any;
};

const LoadingRow = ({ style }: LoadingRowProps) => {
  return (
    <tr style={style}>
      <td>Cargando mas elementos...</td>
    </tr>
  );
};

export default LoadingRow;
