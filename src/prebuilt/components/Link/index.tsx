import clsx from "clsx";
import React from "react";
import styles from "./link.module.scss";
import { Link as RouterLink } from "react-router-dom";

export type LinkProps = {
  readonly href: string;
  readonly theme?: "primary" | "primary-negative";
  readonly size?: "inherit" | "sm" | "md";
  readonly target?: React.AnchorHTMLAttributes<HTMLHRElement>["target"];
  readonly className?: string;
};

export const Link: React.FC<LinkProps> = ({
  href,
  target,
  className,
  children,
  size = "inherit",
  theme = "primary",
}) => {
  return (
    <RouterLink
      className={clsx(styles.root, styles[theme], styles[size], className)}
      to={href}
      target={target}
    >
      {children}
    </RouterLink>
  );
};
