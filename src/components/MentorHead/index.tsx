import clsx from "clsx";
import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "../../prebuilt/components/Link";
import { IMentorCard } from  "../../app/interfaces/IMentorCard";
import { Typography } from "../../prebuilt/components/Typography";
import styles from "./mentorHead.module.scss";

export type MentorPreviewProps = {
  readonly mentor: IMentorCard;
	readonly className?: string;
	readonly mode?: "preview" | "full";
};

export const MentorHead: React.FC<MentorPreviewProps> = ({
  mentor,
	className,
	mode = "preview"
}) => {
  return <div className={clsx(styles.root, className)}>  
		<div className={clsx(styles.root__info)}>
			{mode === "preview" &&
				<Link
					className={clsx(styles.root__name, styles.root__info)}
					href={"/mentors/"+mentor.id}
				>
						{mentor.firstName} {mentor.lastName}
				</Link>
			}
			{mode === "full" && 
				<Typography tag="h1" className={clsx(styles.root__userName, styles.root__info)}>
					{mentor.firstName} {mentor.lastName}
				</Typography>
			}
			<Typography tag="span" className={clsx(styles.root__geo, styles.root__info)}>
				{mentor.city}, {mentor.country} / {mentor.timezone}
			</Typography>
			
		</div>
  </div>
}
