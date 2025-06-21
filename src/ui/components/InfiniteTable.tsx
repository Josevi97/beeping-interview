import { Fragment } from "react/jsx-runtime";
import Table from "./Table";
import TableHeader from "./TableHeader";
import LoadingRow from "./LoadingRow";
import TableRow from "./TableRow";
import type { InfiniteData } from "@tanstack/react-query";
import type { PageResource } from "../../types/pagination/page_resource";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type AccessorFn,
  type SortingState as SS,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef, useState } from "react";
import TBody from "./TBody";
import { cn } from "./shadcn/lib/utils";
import type { SortingState } from "../../types/pagination/sorting_state";

type Column<T> = {
  key: AccessorFn<T>;
  id: string;
  header: string;
};

type InfiniteTableProps<T> = {
  /**
   * Custom styling delegate if required
   */
  className?: string;

  data?: InfiniteData<PageResource<T> | null>;

  /**
   * Num of items before be visible to ask for a new page
   */
  threshold?: number;

  /**
   * How many items are rendered out of the screen
   */
  overscan?: number;

  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  columns: Column<T>[];
  requestNext(): void;
  onSortingChanged(sorting: SortingState): void;
};

/**
 * Abstract InfiniteTable which uses virtualization under the hook
 * Every virtual and table packages dependencies has been centralized here
 *
 * @param props
 * @returns
 */
const InfiniteTable = <T,>({
  data,
  threshold = 1,
  overscan = 5,
  ...props
}: InfiniteTableProps<T>) => {
  const [sorting, setSorting] = useState<SS>([]);

  const bodyRef = useRef<HTMLTableSectionElement>(null);

  const allRows = useMemo(
    () =>
      data ? data.pages.filter((p) => p?.data).flatMap((p) => p!.data) : [],
    [data],
  );

  const columns = useMemo(() => {
    const helper = createColumnHelper<T>();
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
    enableSorting: true,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  const rowVirtualizer = useVirtualizer({
    count: props.hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => bodyRef.current,
    // This could be calculated just by rendering first an hidden mocked row
    estimateSize: () => 26,
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

  useEffect(() => {
    props.onSortingChanged(
      sorting.map((s) => {
        return { key: s.id, type: s.desc ? "desc" : "asc" };
      }),
    );
  }, [sorting]);

  return (
    <Table className={cn("flex", "flex-col", props.className ?? "")}>
      <TableHeader table={table} />
      <TBody ref={bodyRef} className="relative overflow-y-auto flex-grow">
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;

          const row = table.getRowModel().rows[virtualRow.index];
          // Not sure why this is required. position: absolute is probably a must in order to work with
          // virtualization
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
