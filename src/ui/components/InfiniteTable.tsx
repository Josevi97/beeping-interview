import { Fragment } from "react/jsx-runtime";
import Table from "./Table";
import TableHeader from "./TableHeader";
import LoadingRow from "./LoadingRow";
import TableRow from "./TableRow";
import type { InfiniteData } from "@tanstack/react-query";
import type { PageResource } from "../../types/page_resource";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type AccessorFn,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";
import TBody from "./TBody";

type Column<T> = {
  key: AccessorFn<T>;
  id: string;
  header: string;
};

type InfiniteTableProps<T> = {
  data?: InfiniteData<PageResource<T> | null>;
  threshold?: number;
  overscan?: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  columns: Column<T>[];
  requestNext(): void;
};

const InfiniteTable = <T,>({
  data,
  threshold = 1,
  overscan = 5,
  ...props
}: InfiniteTableProps<T>) => {
  const bodyRef = useRef<HTMLTableSectionElement>(null);

  const helper = createColumnHelper<T>();

  const allRows = data
    ? data.pages.filter((p) => p?.data).flatMap((p) => p!.data)
    : [];

  const columns = useMemo(() => {
    return props.columns.map((column) => {
      return helper.accessor(column.key, {
        id: column.id,
        header: column.header,
        cell: (info) => info.getValue(),
      });
    });
  }, [props.columns]);

  const table = useReactTable({
    data: allRows,
    columns: columns,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const rowVirtualizer = useVirtualizer({
    count: props.hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => bodyRef.current,
    estimateSize: () => 24,
    overscan: overscan,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - threshold &&
      props.hasNextPage &&
      !props.isFetchingNextPage
    ) {
      props.requestNext();
    }
  }, [
    props.hasNextPage,
    props.requestNext,
    allRows.length,
    props.isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <Table className="h-screen flex flex-col">
      <TableHeader table={table} />
      <TBody ref={bodyRef} className="relative overflow-y-auto flex-grow">
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;

          const row = table.getRowModel().rows[virtualRow.index];
          const style: React.CSSProperties = {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          };

          return (
            <Fragment key={virtualRow.index}>
              {isLoaderRow && props.hasNextPage ? (
                <LoadingRow style={style} />
              ) : (
                <TableRow row={row} style={style} />
              )}
            </Fragment>
          );
        })}
      </TBody>
    </Table>
  );
};

export default InfiniteTable;
