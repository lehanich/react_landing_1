import clsx from "clsx";
import React from "react";
import { Typography } from "../../../../prebuilt/components/Typography";
import styles from "./education.module.scss";

export type EducationProps = {
  readonly className?: string;
  readonly education: any;
};

export const Education: React.FC<EducationProps> = ({ className, education }) => {

  return (
    <>
      {education !== undefined && (education as Array<any>).map((item: any) => (
        <div className={styles.root}>
          <div className={styles.root__place}>
            {item.institution}
          </div>
          <div className={styles.root__info}>
            {item.course}
          </div>            
        </div>
      ))}
    </>
  );
};
