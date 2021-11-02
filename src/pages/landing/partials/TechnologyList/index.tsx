import React from "react";
import { Icon } from "../../../../components/Icon";
import { Typography } from "../../../../prebuilt/components/Typography";
import { IcJest } from "../../icons/IcJest";
import { IcReact } from "../../icons/IcReact";
import { IcRedux } from "../../icons/IcRedux";
import { IcSass } from "../../icons/IcSass";
import { IcTypeScript } from "../../icons/IcTypeScript";
import styles from "./technology-list.module.scss";

const TECHNOLOGIES = [
  {
    name: "React",
    icon: IcReact,
    description:
      "Легковесная библиотека для отрисовки пользовательского интерфейса",
  },
  {
    name: "TypeScript",
    icon: IcTypeScript,
    description: "JavaScript с синтаксисом для типов",
  },
  {
    name: "Redux",
    icon: IcRedux,
    description: "Контейнер предсказуемого состояния для JavaScript приложений",
  },
  {
    name: "Redux Toolkit",
    icon: IcRedux,
    description:
      "Официальный набор инструментов для эффективной разработки c Redux",
  },
  {
    name: "SASS",
    icon: IcSass,
    description: "Cтабильный и мощный язык расширений CSS",
  },
  {
    name: "Jest",
    icon: IcJest,
    description: "Фреймворк для тестирования JavaScript с упором на простоту",
  },
];

export type TechonolyListProps = {
  readonly className?: string;
};

export const TechnologyList: React.FC<TechonolyListProps> = ({ className }) => {
  return (
    <section className={styles.root}>
      <Typography className={styles.root__title} tag="h2" preset="h2">
        Познакомимся с технологиями
      </Typography>
      <ul className={styles.root__technologies}>
        {TECHNOLOGIES.map(({ name, icon: IC, description }) => (
          <li className={styles.root__technology_wrapper}>
            <div className={styles.root__technology}>
              <div className={styles.root__logo}>
                <Icon size="stretch">
                  <IC />
                </Icon>
              </div>
              <div className={styles.root__description}>
                <Typography
                  className={styles.root__name}
                  tag="p"
                  preset="subtitle1"
                >
                  {name}
                </Typography>
                <Typography tag="p" preset="paragraph1">
                  {description}
                </Typography>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
