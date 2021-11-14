import clsx from "clsx";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { IMentor } from  "../../app/interfaces/IMentor";
import { Avatar } from "../Avatar";
import { MentorBasicInfo } from "../MentorBasicInfo";
import { Price } from "../Price";
import { useBreakpoints } from "../../hooks/useBreakpoints";
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

	const [breakpoint, setBreakpoint] = useState<number>(1024); 

	useBreakpoints((breakpoint) => {
    setBreakpoint(breakpoint);
    console.log(breakpoint);
  });

  return <div className={clsx(styles.root, breakpoint < 768 && styles.root_mobile ,className)}>  
		{mode === "preview" &&
			<div className={clsx(
				styles.root__avatar,
				breakpoint < 768 && styles.root__blockAvatar_mobile,
				breakpoint >= 768 && styles.root__blockAvatar)}>
					{breakpoint >= 768 && <Avatar avatar={mentor.avatar} size="md"/>}
					{breakpoint < 768 && <>
						<Avatar avatar={mentor.avatar} className={styles.root__avatar_mobile} size="sm"/>
						<MentorHead mentor={mentor}/>
					</>}
			</div>
		}
		{breakpoint >= 768 && <MentorBasicInfo mentor={mentor} displayName={true} className={styles.root__info}></MentorBasicInfo>}
		{breakpoint < 768 && <MentorBasicInfo mentor={mentor} displayName={false} className={styles.root__info_mobile}></MentorBasicInfo>}
		{mode === "preview" &&
			<Price tag="div"
				price={mentor.theme.price}
				currency={mentor.theme.currency}
				className={clsx(styles.root__price)}>
			</Price>
		}
  </div>
}