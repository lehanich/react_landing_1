import clsx from "clsx";
import React from "react";
import styles from "./avatar.module.scss";

export type AvatarProps = {
  readonly avatar: string;
	readonly className?: any;
	readonly size: "stretch" | "sm" | "md" | "lg";
};

export const Avatar: React.FC<AvatarProps> = ({
  avatar,
	className,
	size
}) => {

	const style: { [key: string]: React.CSSProperties } = {
		avatar: {
			backgroundImage: `url('https://solvery.io/${avatar}')`,
		}
	};

  return <>
		<span
			className={clsx(styles.root, styles[size], className)}
			style={style.avatar}
		>
		</span>
  </>
}