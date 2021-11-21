import clsx from "clsx";
import React from "react";
import { Link } from "../../../../prebuilt/components/Link";
import { IMentorCard } from "../../../../app/interfaces/IMentorCard";
import { Typography } from "../../../../prebuilt/components/Typography";
import styles from "./company.module.scss";

export type CompanyProps = {
  readonly mentor: Pick<IMentorCard, "position" | "companyName" | "compnyWebsite">;
  readonly className?: string;
};

export const Company: React.FC<CompanyProps> = ({
  mentor,
  className,
}) => {

  return (
    <Typography
      tag="p"
      color="typography-main"
      className={clsx(styles.root, className)}>
      {mentor.position} -
      <Link
        href={mentor.compnyWebsite}
        theme="primary-blue"
        size="md"
      >{mentor.companyName}
      </Link>
    </Typography>
  );
};
