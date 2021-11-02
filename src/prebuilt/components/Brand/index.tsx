import clsx from "clsx";
import React from "react";
import styles from "./brand.module.scss";

export type BrandProps = {
  readonly size?: "md";
  readonly isNegative?: boolean;
  readonly className?: string;
};

export const Brand: React.FC<BrandProps> = ({
  size,
  isNegative,
  className,
}) => {
  return (
    <span
      className={clsx(
        styles.root,
        size && styles[size],
        isNegative && styles.negative,
        className
      )}
    >
      SOLVERY
    </span>
  );
};
