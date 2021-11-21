import clsx from "clsx";
import React from "react";
import { PageBlock } from "../../../../prebuilt/components/PageBlock";
import { MentorSolution } from "../../../../app/interfaces/MentorSolution";
import styles from "./solutions.module.scss";

export type SolutionsProps = {
  readonly className?: string;
  readonly solutions: MentorSolution[];
};

export const Solutions: React.FC<SolutionsProps> = ({ className, solutions }) => {

  return (
    <PageBlock
      className={clsx(styles.root__pageBlock, className)}
      hasHeader
      headerString="С чем могу помочь"
      headerTag="h3">
      <ul className={clsx(styles.root__list)}>
        {solutions && solutions.map((item) => (
          <li
            key={item.id}
            className={styles.root__listItem}>
            {item.description}
          </li>
        ))}
      </ul>
    </PageBlock>
  );
};
