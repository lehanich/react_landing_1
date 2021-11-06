import clsx from "clsx";
import React from "react";
import { Typography } from "../../../../prebuilt/components/Typography";
import styles from "./job.module.scss";

export type jobProps = {
  readonly className?: string;
  readonly jobs: any;
};

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const Job: React.FC<jobProps> = ({ className, jobs }) => {

  function displayDate (getDate:number) {
    const d= new Date(getDate);
    return `${monthNames[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <>
      {jobs !== undefined && (jobs as Array<any>).map((item: any) => (
        <div className={styles.root}>
          <div className={styles.root__time}>
            {displayDate(item.startDate)}&nbsp;&mdash;&nbsp;
            {item.isUntilNow && "настоящее время"}
            {item.isUntilNow === false && displayDate(item.endDate)}
          </div>
          <div className={styles.root__info}>
            <a href={item.employerWebsite}>{item.employer}</a> - {item.position}
          </div>            
        </div>
      ))}
    </>
  );
};
