import { flexRender, type Table as T } from "@tanstack/react-table";
import THead from "./THead";
import TRow from "./TRow";
import THeader from "./THeader";

type TableHeaderProps<K> = {
  table: T<K>;
};

const TableHeader = <T,>({ table }: TableHeaderProps<T>) => {
  return (
    <THead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <THeader
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getIsSorted() === "asc" && <>↑</>}
              {header.column.getIsSorted() === "desc" && <>↓</>}
              {header.column.getIsSorted() === false && <>⇅</>}
            </THeader>
          ))}
        </TRow>
      ))}
    </THead>
  );
};

export default TableHeader;
