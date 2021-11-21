import clsx from "clsx";
import React from "react";
import { IMentorCard } from "../../app/interfaces/IMentorCard";
import { Typography } from "../../prebuilt/components/Typography";
import { MentorHead } from "../MentorHead";
import { Company } from "./partials/Company";
import { Sessions } from "./partials/Sessions";
import { CardTagsList } from "./partials/CardTagsList";
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
        <Company
          className={styles.root__info}
          mentor={mentor}/>

        <Sessions
          className={styles.root__info}
          mentor={mentor}/>

        <Typography
          tag="p"
          className={clsx(styles.root__info)}
          color="typography-main">
          {mentor.description}
        </Typography>

        <CardTagsList
          className={clsx(styles.root__info)}
          mentor={mentor}/>
      </div>
    </div>
  );
};
