import clsx from "clsx";
import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "../../prebuilt/components/Link";
import { IMentor } from  "../../app/interfaces/IMentor";
import { Avatar } from "../Avatar"
import { TagsList } from "../TagsList"
import { Typography } from "../../prebuilt/components/Typography"
import styles from "./mentorPreview.module.scss";

export type MentorPreviewProps = {
  readonly mentor: IMentor;
	readonly className?: string;
};

export const MentorPreview: React.FC<MentorPreviewProps> = ({
  mentor,
	className
}) => {
  return <div className={clsx(styles.root, className)}>  
		<div className={clsx(styles.root__avatar, styles.root__blockAvatar)}>
			<Avatar avatar={mentor.avatar} size="md"/>
		</div>
		<div className={clsx(styles.root__info, styles.root__previeInfo)}>
			<Link
				className={clsx(styles.root__userName, styles.root__infoBlock)}
				href={"/mentor/"+mentor.id}
			>
					{mentor.firstName} {mentor.lastName}
			</Link>
			<Typography tag="span" className={clsx(styles.root__userGEO, styles.root__infoBlock)}>
				{mentor.city}, {mentor.country} / {mentor.timeZone}
			</Typography>
			<Typography tag="p"
				color="typography-main"
				className={clsx(styles.root__userCompany, styles.root__infoBlock)}>
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
				className={clsx(styles.root__userSessions,styles.root__infoBlock)}
				color="typography-main">
				<Typography tag="span" className={clsx(styles.root__userSessionsNumber)}>
					{mentor.sessionsCount}
					</Typography>
				<Typography tag="span" >
				&nbsp;занятий проведено
				</Typography>
			</Typography>
			<Typography tag="p"
				className={clsx(styles.root__infoBlock)}
				color="typography-main">
					{mentor.description}
			</Typography>
			<Typography tag="div" className={clsx(styles.root__infoBlock)}>
				<TagsList tags={mentor.theme.tags} mode="profile"/>
			</Typography>
					{/* {mentor.userRating !== undefined && mentor.userRating !== null && mentor.userRating.feedbackCount}
        {mentor.userRating !== undefined && mentor.userRating !== null && mentor.userRating.total} */}
		</div>
		<div className={styles.root__price}>
      {mentor.theme.price}Р / час
		</div>
  </div>
}