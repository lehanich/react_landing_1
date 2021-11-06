import clsx from "clsx";
import React from "react";
// import { Link } from "react-router-dom";
import { Link } from "../../prebuilt/components/Link";
import { IMentor } from  "../../app/interfaces/IMentor";
import { Avatar } from "../Avatar"
import { TagsList } from "../TagsList"
import { Typography } from "../../prebuilt/components/Typography"
import { MentorBasicInfo } from "../MentorBasicInfo"
import { Price } from "../Price"
import styles from "./mentorPreview.module.scss";

export type MentorPreviewProps = {
  readonly mentor: IMentor;
	readonly className?: string;
	readonly mode?: string | "preview" | "full";
};

export const MentorPreview: React.FC<MentorPreviewProps> = ({
  mentor,
	className,
	mode = "preview"
}) => {
  return <div className={clsx(styles.root, className)}>  
		{mode === "preview" && <div className={clsx(styles.root__avatar, styles.root__blockAvatar)}>
			<Avatar avatar={mentor.avatar} size="md"/>
		</div>}
		<MentorBasicInfo mentor={mentor} className={styles.root__info}></MentorBasicInfo>
		{mode === "preview" &&
			<Price tag="div"
				price={mentor.theme.price}
				currency={mentor.theme.currency}
				className={clsx(styles.root__price)}>
			</Price>
		}
  </div>
}