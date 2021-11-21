import clsx from "clsx";
import React from "react";
import { IMentorCard } from "../../../../app/interfaces/IMentorCard";
import { Typography } from "../../../../prebuilt/components/Typography";
import styles from "./sessions.module.scss";

export type SessionsProps = {
  readonly mentor: Pick<IMentorCard, "sessionsCount">;
  readonly className?: string;
};

export const Sessions: React.FC<SessionsProps> = ({
  mentor,
  className,
}) => {

  return (
    <Typography
      tag="div"
      className={clsx(styles.root, className)}
      color="typography-main">
      <Typography
        tag="span"
        className={clsx(styles.root__number)}>
        {mentor.sessionsCount}
      </Typography>
      <Typography tag="span" >
            &nbsp;занятий проведено
      </Typography>
    </Typography>
  );
};
