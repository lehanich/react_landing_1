import clsx from "clsx";
import React from "react";
import { ROUTE_LIST } from "../../navigation/routes";
import { Brand } from "../Brand";
import { Link } from "../Link";
import styles from "./footer.module.scss";

export type FooterProps = {
  readonly className?: string;
};

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx(styles.root, className)}>
      <div className={styles.root__content}>
        <Brand size="md" isNegative />
        <ul className={styles.root__links}>
          {ROUTE_LIST.map((route) => (
            <li key={route.url}>
              <Link href={route.url} theme="primary-negative" size="sm">
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
