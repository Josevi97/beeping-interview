import { flexRender, type Row as R } from "@tanstack/react-table";
import TRow from "./TRow";
import TData from "./TData";

type TableRowProps<T> = {
  row: R<T>;
  style: React.CSSProperties;
};

const TableRow = <T,>({ row, style }: TableRowProps<T>) => {
  return (
    <TRow id={row.id} style={style}>
      {row.getVisibleCells().map((cell) => (
        <TData key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TData>
      ))}
    </TRow>
  );
};

export default TableRow;
