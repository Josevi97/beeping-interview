import { useInfiniteQuery } from "@tanstack/react-query";
import type { AcademicWork } from "../academic_work";
import type { PageResource } from "../../../types/pagination/page_resource";
import type { SortingState } from "../../../types/pagination/sorting_state";
import QueryBuilder from "../../../utils/QueryBuilder";

type UseGetAcademicWorksProps = {
  sorting?: SortingState;
};

/**
 * Hook to get an infinite query for AcademicWorks
 *
 * @param props gets the sorting and filters if required
 * @returns ReactQuery infinite query
 */
const useGetAcademicWorks = ({ sorting }: UseGetAcademicWorksProps = {}) => {
  return useInfiniteQuery({
    queryKey: ["works", { sorting }],
    queryFn: async (ctx) => {
      const page = ctx.pageParam ?? 1;
      const query = QueryBuilder.build({ page, sorting });
      const response = await fetch(query);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      if (json["results"] == null) return null;

      const data = json["results"] as AcademicWork[];

      const resource: PageResource<AcademicWork> = {
        page,
        next_page: data.length > 0 ? page + 1 : null,
        data,
      };

      return resource;
    },
    getNextPageParam: (lastGroup) => lastGroup?.next_page,
    initialPageParam: 1,
  });
};

export default useGetAcademicWorks;
