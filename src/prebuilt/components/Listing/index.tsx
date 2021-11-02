import clsx from "clsx";
import React from "react";
import styles from "./listing.module.scss";

export type ListingProps = {
  readonly className?: string;
};

export const Listing: React.FC<ListingProps> = ({ className, children }) => {
  return (
    <ul className={clsx(styles.root, className)}>
      {React.Children.map(children, (child) => (
        <li className={styles.root__item}>{child}</li>
      ))}
    </ul>
  );
};
