import clsx from "clsx";
import React from "react";
import styles from "./icon.module.scss";

export type IconProps = {
  readonly className?: string;
  readonly size?: "stretch" | "sm" | "md" | "lg";
};

export const Icon: React.FC<IconProps> = ({
  className,
  children,
  size = "stretch",
}) => {
  return (
    <span className={clsx(styles.root, styles[size], className)}>
      {children}
    </span>
  );
};
