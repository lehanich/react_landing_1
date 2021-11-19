import clsx from "clsx";
import React from "react";
import styles from "./loader.module.scss";

export type LoaderProps = {
  readonly className?: string;
  readonly type?: "1" | "2" | "3" | "4";
};

export const Loader: React.FC<LoaderProps> = ({
  className,
  type="1",
}) => {

  return (
    <>
      {type === "1" && <div className={clsx(styles.root, className)}>
        <div className={styles['loader_'+type]}></div>
      </div>}
      {type === "2" && <div className={clsx(styles.root)}>
        <div className={styles['loader_'+type]}></div>
      </div>}
      {type === "3" && <div className={clsx(styles.root)}>
        <div className={styles['loader_'+type]}>
          <div className={clsx(styles['loader_'+type+"_item_1"],styles['loader_'+type+"_item"])}></div>
          <div className={clsx(styles['loader_'+type+"_item_2"],styles['loader_'+type+"_item"])}></div>
          <div className={clsx(styles['loader_'+type+"_item_3"],styles['loader_'+type+"_item"])}></div>
          <div className={clsx(styles['loader_'+type+"_item_4"],styles['loader_'+type+"_item"])}></div>
          <div className={clsx(styles['loader_'+type+"_item_5"],styles['loader_'+type+"_item"])}></div>
        </div>
      </div>}
      {type === "4" && <div className={clsx(styles.root)}>
        <div className={styles['loader_'+type]}></div>
      </div>}
    </>
  );
};