import clsx from "clsx";
import React, { useEffect } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./page.module.scss";

export type PageProps = {
  readonly title: string;
  readonly hasHeader?: boolean;
  readonly hasFooter?: boolean;
  readonly className?: string;
};

export const Page: React.FC<PageProps> = ({
  hasHeader = true,
  hasFooter = true,
  title,
  className,
  children,
}) => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = title;
    }
  }, [title]);

  return (
    <>
      {hasHeader && <Header />}
      <main
        className={clsx(styles.root, hasHeader && styles.has_header, className)}
        role="main"
      >
        {children}
      </main>
      {hasFooter && <Footer />}
    </>
  );
};
