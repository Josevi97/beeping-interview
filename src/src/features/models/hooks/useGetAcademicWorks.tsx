import { useInfiniteQuery } from "@tanstack/react-query";
import type { AcademicWork } from "../academic_work";
import type { PageResource } from "../../../../types/page_resource";

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
