export interface IMentorFilters {
  readonly filters?: FilterFilters;
  readonly pagination?: FilterPagination;
};

export type FilterFilters = {
  readonly tagIds?: number[];
  readonly language?: string[];
};

export type FilterPagination = {
  readonly page: number;
  readonly limit: number;
};
