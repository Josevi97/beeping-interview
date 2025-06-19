import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "../ui/components/Table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef } from "react";
import THead from "../ui/components/THead";
import TBody from "../ui/components/TBody";
import Row from "../ui/components/Row";
import type { AcademicWork } from "../features/models/academic_work";
import useGetAcademicWorks from "../features/models/hooks/useGetAcademicWorks";
import { useIntersectionObserver } from "react-intersection-observer-hook";

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

  const table = useReactTable({
    data: data?.pages.map((page) => page?.data).flat() || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const virtualRows = useWindowVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 24,
    overscan: 5,
  });

  const virtualItems = useMemo(
    () => virtualRows.getVirtualItems(),
    [virtualRows, data],
  );

  const [ref, { entry }] = useIntersectionObserver();

  const threshold = useMemo(
    () => Math.max(table.getRowModel().rows.length - 5, 0),
    [table.getRowModel().rows.length],
  );

  useEffect(() => {
    const isVisible = entry && entry.isIntersecting;
    if (isVisible && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, isFetchingNextPage]);

  return (
    <Table>
      <THead table={table} />
      <TBody>
        {virtualItems.map((virtualRow) => {
          const row = table.getRowModel().rows[virtualRow.index];
          const isLast = virtualRow.index === threshold;
          return <Row ref={isLast ? ref : null} key={row.id} row={row} />;
        })}
      </TBody>
    </Table>
  );
};

export default HomePage;
