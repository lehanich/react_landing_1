import clsx from "clsx";
import React, { useEffect } from "react";
import styles from "./pageBlock.module.scss";

export type PageBlockProps = {
  readonly className?: string;
};
  
export const PageBlock: React.FC<PageBlockProps> = ({
  	className,
    children,
  }) => {
  
  return (
  	<div
      className={clsx(styles.root, className)}
    >
    	{children}
    </div>
  );
};
  