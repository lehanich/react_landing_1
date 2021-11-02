import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Typography } from "../../../../prebuilt/components/Typography";
import styles from "./hero.module.scss";

export type HeroProps = {
  readonly className?: string;
};

const INITIAL_CODE = "<let's\n      code/>";
const LAGGED_1_CODE = "code/>\n   <let's";
const LEARN_CODE = "<let's\n      learn/>";
const LAGGED_2_CODE = "learn/>\n   <let's";

export const Hero: React.FC<HeroProps> = ({ className }) => {
  const [code, setCode] = useState("<let's\n      code />");

  useEffect(() => {
    function animateCode() {
      setCode(LAGGED_1_CODE);

      setTimeout(() => {
        setCode(LEARN_CODE);

        setTimeout(() => {
          setCode(LAGGED_2_CODE);

          setTimeout(() => {
            setCode(INITIAL_CODE);

            setTimeout(() => {
              animateCode();
            }, 3500);
          }, 200);
        }, 3500);
      }, 200);
    }

    animateCode();
  }, []);

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.root__text}>
        <Typography tag="h1" preset="h1">
          Интенсив по&nbsp;современной Frontend разработке от{" "}
          <a
            className={styles.root__link}
            href="https://solvery.io"
            target="_blank"
            rel="noreferrer"
          >
            <Typography color="background" tag="span">
              solvery.io
            </Typography>
          </a>
        </Typography>
        <Typography tag="p" preset="subtitle1">
          2-ух дневный интенсив, на протяжении которого мы разберем современный
          стек, структуру проекта и поговорим о том, что необходимо для того,
          чтобы быстро стать Frontend разработчиком
        </Typography>
      </div>
      <div className={styles.root__graphics}>{code}</div>
    </section>
  );
};
