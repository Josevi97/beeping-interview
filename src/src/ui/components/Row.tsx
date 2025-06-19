import { flexRender, type Row as R } from "@tanstack/react-table";
import { forwardRef } from "react";

type RowProps<T> = {
  row: R<T>;
};

function createRowComponent<T>() {
  return forwardRef<HTMLTableRowElement, RowProps<T>>(({ row }, ref) => {
    return (
      <tr ref={ref} id={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    );
  });
}

const Row = createRowComponent();
export default Row;
