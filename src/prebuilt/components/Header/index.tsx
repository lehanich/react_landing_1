import clsx from "clsx";
import React from "react";
import { ROUTES, ROUTE_LIST } from "../../navigation/routes";
import { Brand } from "../Brand";
import { Link } from "../Link";
import styles from "./header.module.scss";

export type HeaderProps = {
  readonly className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={clsx(styles.root, className)}>
      <div className={styles.root__content}>
        <Link href={ROUTES.homepage.url}>
          <Brand />
        </Link>
        <ul className={styles.root__links}>
          {ROUTE_LIST.map((route) => (
            <li key={route.url}>
              <Link href={route.url} theme="primary" size="sm">
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
