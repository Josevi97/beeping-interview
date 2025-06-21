import type { SortingState } from "../types/pagination/sorting_state";

const baseURL = "https://api.openalex.org/works";

/**
 * QueryBuilder util object
 *
 * @param url base url to query
 * @returns a query with params and page
 */
const QueryBuilder = (url: string) => {
  const buildPage = (page: number) => `page=${page}`;

  const buildParams = ({ sorting }: { sorting?: SortingState }): string[] => {
    if (!sorting?.length) return [];
    return sorting.map((sort) => `sort=${sort.key}:${sort.type}`);
  };

  const build = ({
    page,
    sorting,
  }: {
    page: number;
    sorting?: SortingState;
  }) => {
    const params = [buildPage(page), buildParams({ sorting })];
    return [url, params.join("&")].join("?");
  };

  return {
    build,
  };
};

/**
 * Makes a queryBuilder with a provided url
 *
 * @param url base url to create the query builder
 * @returns
 */
export const makeQueryBuilder = (url: string) => {
  return QueryBuilder(url);
};

/**
 * Default query builder for this project
 */
export default QueryBuilder(baseURL);
