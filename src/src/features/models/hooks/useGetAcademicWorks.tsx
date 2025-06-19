import { useInfiniteQuery } from "@tanstack/react-query";

const url = "https://api.openalex.org/works";

const useGetAcademicWorks = () => {
  return useInfiniteQuery({
    queryKey: ["works"],
    queryFn: async (ctx) => {
      const page = ctx.pageParam ?? 1;
      const response = await fetch(`${url}?page=${page}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      if (json["results"]) {
        const data = json["results"];

        return {
          page,
          next_page: data.length > 0 ? page + 1 : undefined,
          data,
        };
      }

      return null;
    },
    getNextPageParam: (lastGroup) => lastGroup?.next_page,
    initialPageParam: 1,
  });
};

export default useGetAcademicWorks;
