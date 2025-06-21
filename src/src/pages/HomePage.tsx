import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "../ui/components/Table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Fragment, useEffect } from "react";
import TBody from "../ui/components/TBody";
import Row from "../ui/components/Row";
import type { AcademicWork } from "../features/models/academic_work";
import useGetAcademicWorks from "../features/models/hooks/useGetAcademicWorks";
import LoadingRow from "../ui/components/LoadingRow";
import THead from "../ui/components/THead";

const helper = createColumnHelper<AcademicWork>();
const columns = [
  helper.accessor("title", {
    id: "title",
    header: "Título",
    cell: (info) => info.getValue(),
  }),

  helper.accessor("publication_year", {
    id: "publication_year",
    header: "Año",
    cell: (info) => info.getValue(),
  }),

  helper.accessor("cited_by_count", {
    id: "cited_by_count",
    header: "Citaciones",
    cell: (info) => info.getValue(),
  }),
];

const HomePage = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetAcademicWorks();

  const allRows = data
    ? data.pages.filter((p) => p?.data).flatMap((p) => p!.data)
    : [];

  const table = useReactTable({
    data: allRows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
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
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <Table>
      <THead table={table} />
      <TBody>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;

          const row = table.getRowModel().rows[virtualRow.index];
          const style = {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          };

          return (
            <Fragment key={virtualRow.index}>
              {isLoaderRow && hasNextPage ? (
                <LoadingRow style={style} />
              ) : (
                <Row row={row} style={style} />
              )}
            </Fragment>
          );
        })}
      </TBody>
    </Table>
  );
};

export default HomePage;
