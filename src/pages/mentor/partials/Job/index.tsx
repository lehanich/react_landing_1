import clsx from "clsx";
import React from "react";
import styles from "./job.module.scss";
import { MentorJob } from "../../../../app/interfaces/MentorJob";

export type JobProps = {
  readonly className?: string;
  readonly jobs: MentorJob[];
};

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
];

export const Job: React.FC<JobProps> = ({ className, jobs }) => {
  
  function displayDate (getDate:number) {
    const d= new Date(getDate);
    return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  }

  return (
    <>
      {jobs && jobs.map((item) => (
        <div
          key={item.id}
          className={clsx(styles.root, className)}>
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
