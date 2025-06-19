import type { PageResource } from "./page_resource";

export type PaginationData<T> = {
  totalItems: number;
  currentItems: number;
  page: number;
  next: number | null;
  items: PageResource<T>[];
};
