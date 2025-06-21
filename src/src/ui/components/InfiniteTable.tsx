import { Fragment } from "react/jsx-runtime";
import Table from "./Table";
import TableHeader from "./TableHeader";
import TBody from "./TBody";
import LoadingRow from "./LoadingRow";
import TableRow from "./TableRow";
import type { InfiniteData } from "@tanstack/react-query";
import type { PageResource } from "../../../types/page_resource";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type AccessorFn,
} from "@tanstack/react-table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo } from "react";

type Column<T> = {
  key: AccessorFn<T>;
  id: string;
  header: string;
};

type InfiniteTableProps<T> = {
  data?: InfiniteData<PageResource<T> | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  columns: Column<T>[];
  requestNext(): void;
};

const InfiniteTable = <T,>({ data, ...props }: InfiniteTableProps<T>) => {
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
    getCoreRowModel: getCoreRowModel(),
  });

  const rowVirtualizer = useWindowVirtualizer({
    count: props.hasNextPage ? allRows.length + 1 : allRows.length,
    estimateSize: () => 24,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
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
    <Table>
      <TableHeader table={table} />
      <TBody>
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
