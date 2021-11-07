import clsx from "clsx";
import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "../../prebuilt/components/Link";
import { IMentor } from  "../../app/interfaces/IMentor";
import { TagsList } from "../TagsList";
import { Typography } from "../../prebuilt/components/Typography";
import { MentorHead } from "../MentorHead";
import styles from "./mentorBasicInfo.module.scss";

export type MentorPreviewProps = {
  readonly mentor: IMentor;
	readonly className?: string;
	readonly mode?: string | "preview" | "full";
	readonly displayName?: boolean;
};

export const MentorBasicInfo: React.FC<MentorPreviewProps> = ({
  mentor,
	className,
	mode = "preview",
	displayName
}) => {
  return <div className={clsx(styles.root, className)}>  
		<div className={clsx(styles.root__info)}>
			{displayName &&	<MentorHead mentor={mentor} mode = {mode}/> }
			<Typography tag="p"
				color="typography-main"
				className={clsx(styles.root__company, styles.root__info)}>
				{mentor.position} -
				{/* primary-medium */}
				<Link
					href={mentor.compnyWebsite}
					theme="primary-blue"
					size="md"
				>{mentor.companyName}
				</Link>
			</Typography>
			<Typography tag="div"
				className={clsx(styles.root__sessions,styles.root__info)}
				color="typography-main">
				<Typography tag="span" className={clsx(styles.root__sessionsNumber)}>
					{mentor.sessionsCount}
					</Typography>
				<Typography tag="span" >
				&nbsp;занятий проведено
				</Typography>
			</Typography>
			<Typography tag="p"
				className={clsx(styles.root__info)}
				color="typography-main">
					{mentor.description}
			</Typography>
			<Typography tag="div" className={clsx(styles.root__info)}>
				<TagsList tags={mentor.theme.tags} mode="profile"/>
			</Typography>
					{/* {mentor.userRating !== undefined && mentor.userRating !== null && mentor.userRating.feedbackCount}
        {mentor.userRating !== undefined && mentor.userRating !== null && mentor.userRating.total} */}
		</div>
  </div>
}
