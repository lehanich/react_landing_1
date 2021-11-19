import clsx from "clsx";
import React from "react";
import styles from "./avatar.module.scss";

export type AvatarProps = {
  readonly avatar?: string;
	readonly className?: string;
	readonly size: "stretch" | "sm" | "md" | "lg";
};

export const Avatar: React.FC<AvatarProps> = ({
  avatar,
  className,
  size
}) => {

  if (avatar === null) {
    avatar = "/img/no-image.jpeg";
  }
  const style: { [key: string]: React.CSSProperties } = {
    avatar: {
      backgroundImage: `url('https://solvery.io/${avatar}')`,
    }
  };

  return (
    <>
      {size === "lg" &&
        <div className={className}>
          <img
            src={'https://solvery.io/'+avatar}
            alt="avatar"
            width="95%"
            height="auto"/>
        </div>
      }
      {size === "sm" &&
        <span
          className={clsx(styles.root, styles[size], className)}
          style={style.avatar}
        />
      }
      {size !== "lg" && size !== "sm" &&
        <span
          className={clsx(styles.root, styles[size], className)}
          style={style.avatar}
        />
      }
    </>
  );
};