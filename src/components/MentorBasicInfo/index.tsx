import clsx from "clsx";
import React from "react";
import { Link } from "../../prebuilt/components/Link";
import { IMentorCard } from  "../../app/interfaces/IMentorCard";
import { TagsList } from "../TagsList";
import { Typography } from "../../prebuilt/components/Typography";
import { MentorHead } from "../MentorHead";
import styles from "./mentorBasicInfo.module.scss";

export type MentorPreviewProps = {
  readonly mentor: IMentorCard;
	readonly className?: string;
	readonly mode?: "preview" | "full";
	readonly hasDisplayName?: boolean;
};

export const MentorBasicInfo: React.FC<MentorPreviewProps> = ({
  mentor,
  className,
  mode = "preview",
  hasDisplayName
}) => {

  return (
    <div className={clsx(styles.root, className)}>  
      <div className={clsx(styles.root__info)}>
        {hasDisplayName &&
        <MentorHead
          mentor={mentor}
          mode = {mode}/>
        }
        <Typography
          tag="p"
          color="typography-main"
          className={clsx(styles.root__company, styles.root__info)}>
          {mentor.position} -
          <Link
            href={mentor.compnyWebsite}
            theme="primary-blue"
            size="md"
          >{mentor.companyName}
          </Link>
        </Typography>

        <Typography
          tag="div"
          className={clsx(styles.root__sessions,styles.root__info)}
          color="typography-main">
          <Typography
            tag="span"
            className={clsx(styles.root__sessionsNumber)}>
            {mentor.sessionsCount}
          </Typography>
          <Typography tag="span" >
            &nbsp;занятий проведено
          </Typography>
        </Typography>

        <Typography
          tag="p"
          className={clsx(styles.root__info)}
          color="typography-main">
          {mentor.description}
        </Typography>

        <Typography
          tag="div"
          className={clsx(styles.root__info)}>
          <TagsList
            mentorTags={mentor.theme.tags}
            mode="profile"/>
        </Typography>
      </div>
    </div>
  );
};
