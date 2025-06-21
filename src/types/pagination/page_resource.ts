export type PageResource<T> = {
  page: number;
  next_page: number | null;
  data: T[];
};
