import { flexRender, type Table as T } from "@tanstack/react-table";

type THeadProps<K> = {
  table: T<K>;
};

const THead = <T,>({ table }: THeadProps<T>) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default THead;
