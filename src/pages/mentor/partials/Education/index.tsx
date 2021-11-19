import clsx from "clsx";
import React from "react";
import { MentorEducation } from "../../../../app/interfaces/MentorEducation";
import styles from "./education.module.scss";

export type EducationProps = {
  readonly className?: string;
  readonly education: MentorEducation[];
};

export const Education: React.FC<EducationProps> = ({ className, education }) => {

  return (
    <>
      {education && (education).map((item) => (
        <div
          key={item.id}
          className={clsx(styles.root, className)}>
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
