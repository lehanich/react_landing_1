import clsx from "clsx";
import React from "react";
import styles from "./pagination.module.scss";

export type PaginationProps = {
  className?: string;
  page: number;
  limit: number;
  totalItemsCount: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = (
  {
    className,
    page,
    limit,
    totalItemsCount,
    onPageChange
  }) => {
  
  const check:number = Math.floor(totalItemsCount / (limit + page + 1))

  return (
    <div className={clsx(styles.root__paginationLine, className)}>
      <button
      type="button"
      disabled={page===1}
      onClick={() => {onPageChange(page-1)}}
      className={styles.root__button}>
        назад
      </button>
      <span>{page}</span>
      <button
        type="button"
        disabled={check<1}
        onClick={() => {onPageChange(page+1)}}
        className={styles.root__button}>
          далее
      </button>
    </div>
  );
};
