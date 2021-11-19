import clsx from "clsx";
import React from "react";
import styles from "./solutions.module.scss";
import { MentorSolution } from "../../../../app/interfaces/MentorSolution";

export type SolutionsProps = {
  readonly className?: string;
  readonly solutions: MentorSolution[];
};

export const Solutions: React.FC<SolutionsProps> = ({ className, solutions }) => {

  return (
    <>
      <ul className={clsx(styles.root__list, className)}>
        {solutions && solutions.map((item) => (
          <li
            key={item.id}
            className={styles.root__listItem}>
            {item.description}
          </li>
        ))}
      </ul>
    </>
  );
};
