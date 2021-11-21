import clsx from "clsx";
import React, { useState } from "react";
import { Avatar } from "../Avatar";
import { MentorBasicInfo } from "../MentorBasicInfo";
import { Price } from "../Price";
import { Breakpoint, useBreakpoints } from "../../hooks/useBreakpoints";
import { MentorHead } from "../MentorHead";
import styles from "./mentorPreview.module.scss";
import { IMentorCard } from "../../app/interfaces/IMentorCard";

export type MentorPreviewProps = {
  readonly mentor: IMentorCard;
  readonly className?: string;
  readonly mode?: "preview" | "full";
};

export const MentorPreview: React.FC<MentorPreviewProps> = ({
  mentor,
  className,
  mode = "preview"
}) => {
  const [breakpoint, setBreakpoint] = useState<number>(Breakpoint.SM); 

  useBreakpoints((breakpoint) => {
    setBreakpoint(breakpoint);
  });

  return (
    <div className={clsx(styles.root, className)}>  
      {mode === "preview" &&
        <div
          className={clsx(styles.root__blockAvatar)}>
          {breakpoint > 768 &&
            <Avatar
              avatar={mentor.avatar}
              className={styles.root__avatar}
              size="md"/>
          }
          {breakpoint <= 768 &&
            <>
              <Avatar
                avatar={mentor.avatar}
                className={styles.root__avatar}
                size="sm"/>
              <MentorHead mentor={mentor}/>
            </>
          }
        </div>
      }
      {breakpoint > 768 &&
        <MentorBasicInfo
          mentor={mentor}
          hasDisplayName
          className={styles.root__info}/>
      }
      {breakpoint <= 768 &&
        <MentorBasicInfo
          mentor={mentor}
          className={styles.root__info}/>
      }
      {mode === "preview" &&
        <Price
          tag="div"
          price={mentor.theme.price}
          currency={mentor.theme.currency}
          className={clsx(styles.root__price)}/>
      }
    </div>
  );
};
