import useGetAcademicWorks from "../features/models/hooks/useGetAcademicWorks";
import InfiniteTable from "../ui/components/InfiniteTable";

const HomePage = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetAcademicWorks();

  return (
    <InfiniteTable
      data={data}
      threshold={20}
      overscan={25}
      columns={[
        {
          key: (row) => row.title,
          id: "title",
          header: "Título",
        },
        {
          key: (row) => row.publication_year,
          id: "publication_year",
          header: "Año",
        },
        {
          key: (row) => row.cited_by_count,
          id: "cited_by_count",
          header: "Citaciones",
        },
      ]}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      requestNext={fetchNextPage}
    />
  );
};

export default HomePage;
