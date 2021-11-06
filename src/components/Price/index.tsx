import clsx from "clsx";
import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./mentorPreview.module.scss";
import { Typography } from "../../prebuilt/components/Typography"

export type MentorPreviewProps = {
  readonly price: number;
	readonly currency: string;
	readonly tag?: any;
	readonly className?: string;
};

export const Price: React.FC<MentorPreviewProps> = ({
  price,
	currency,
	className,
	tag = "span"
}) => {
	function printPrice () {
		if (currency === "usd") {
			return Math.round(price * 75)
		} else {
			return Math.round(price)
		}
	}
  return <>
	<Typography tag={tag} className={clsx(className)}>  
		{printPrice()}&#8381;&nbsp;/&nbsp;час
  </Typography>
	</>
}
