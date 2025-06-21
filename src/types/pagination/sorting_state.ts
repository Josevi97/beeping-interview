type ColumnSortType = "asc" | "desc";

export type ColumnSort = {
  key: string;
  type: ColumnSortType;
};

export type SortingState = ColumnSort[];
