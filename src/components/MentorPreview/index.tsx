import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import { IMentor } from  "../../app/interfaces/IMentor";
import { Avatar } from "../Avatar"
import { TagsList } from "../TagsList"
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
		<div className={styles.root__avatar}>
			<Avatar avatar={mentor.avatar} size="md"/>
		</div>
		<div className={styles.root__info}>
			<Link to={"/mentor/"+mentor.id}>		{mentor.firstName} {mentor.lastName}</Link>
					{mentor.city}, {mentor.country} / {mentor.timeZone}
					{mentor.position} - {mentor.companyName} {mentor.compnyWebsite}
					{mentor.sessionsCount} занятий проведено
					{mentor.description}
					<TagsList tags={mentor.theme.tags} />
					{/* {mentor.userRating !== undefined && mentor.userRating !== null && mentor.userRating.feedbackCount}
        {mentor.userRating !== undefined && mentor.userRating !== null && mentor.userRating.total} */}
		</div>
		<div className={styles.root__price}>
      {mentor.theme.price}Р / час
		</div>
  </div>
}