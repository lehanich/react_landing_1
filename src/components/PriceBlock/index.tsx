import clsx from "clsx";
import React from "react";
import { Price } from "../Price"
import { Typography } from "../../prebuilt/components/Typography"
// import { Link } from "react-router-dom";
import styles from "./price.module.scss";

export type MentorPreviewProps = {
  readonly theme: any;
	readonly className?: string;
	readonly type?: string | "preview" | "full";
};

export const PriceBlock: React.FC<MentorPreviewProps> = ({
  theme,
	className,
	type = "preview"
}) => {

  return <div className={clsx(className)}>
		<div className={clsx(styles.root__row)}>
			<Typography tag="div" className={clsx(styles.root__info)}>Занятие с ментором</Typography>
			<Price tag="div"
				price={theme.price}
				currency={theme.currency}
				className={clsx(styles.root__price)}></Price>
		</div>
		{theme.mentorServices !== undefined && theme.mentorServices.messaging !== undefined &&
			<>
				<Typography tag="div" className={styles.root__smallHead}>Дополнительные услуги</Typography>
				<div className={clsx(styles.root__row)}>
					<Typography tag="div" className={clsx(styles.root__info)}>Неделя переписки</Typography>
					<Price tag="div"
						price={theme.mentorServices.messaging.price}
						currency={theme.currency}
						className={clsx(styles.root__price)}></Price>
				</div>
				{theme.mentorServices.projectReview.enabled &&
					<div className={clsx(styles.root__row)}>
						<Typography tag="div" className={clsx(styles.root__info)}>Разбор проекта</Typography>
						<Typography tag="div" className={clsx(styles.root__price)}>по запросу</Typography>
					</div>
				}
			</>
		}
  </div>
}
