import clsx from "clsx";
import React from "react";
import { Typography } from "../Typography";
import styles from "./pageBlock.module.scss";

export type PageBlockProps = {
  readonly className?: string;
  readonly hasHeader?: boolean;
  readonly headerString?: string;
  readonly headerTag?: "h3";
};
  
export const PageBlock: React.FC<PageBlockProps> = ({
  className,
  children,
  hasHeader,
  headerString,
  headerTag
}) => {
  
  return (
    <div
      className={clsx(styles.root, className)}
    >
      { hasHeader && headerString && <Typography
        tag={headerTag}
        className={styles.root__header}>{headerString}</Typography>}
      {children}
    </div>
  );
};
