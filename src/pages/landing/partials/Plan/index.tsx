import clsx from "clsx";
import React from "react";
import { Typography } from "../../../../prebuilt/components/Typography";
import styles from "./plan.module.scss";

const SCHEDULE = [
  {
    time: "Суббота 10:00 - 13:00",
    description: {
      heading: "Мастер-класс и общение",
      content:
        "Изучим базовую теорию для разработки современных фронтенд приложений на React и Redux: основные понятия, принцип работы, примеры использования.\n\nПопробуем на практике основы использования функциональных компонентов в стеке React/Redux. Разберем, как упростить и улучшить выполнение «побочных эффектов» (мутации, подписки, таймеры, логирование и прочее)",
    },
  },
  {
    time: "Воскресенье с 10-00 до 13-00",
    description: {
      heading: "Практический воркшоп",
      content:
        "Вам предстоит написать полноценное многопользовательское приложение на React и Redux. Познакомитесь с TypeScript, напишете юнит-тесты, фрагмент приложения под руководством ментора",
    },
  },
  {
    time: "В течении недели",
    description: {
      heading: "Общение в закрытом чате",
      content:
        "После совершения оплаты вам придет ссылка на вступление в закрытый телеграм-чат, где вы сможете в течение недели после проведения интенсива задавать Макару любые вопросы по данной теме",
    },
  },
];

export type PlanProps = {
  readonly className?: string;
};

export const Plan: React.FC<PlanProps> = ({ className }) => {
  return (
    <section className={clsx(styles.root, className)}>
      <Typography className={styles.root__title} tag="h2" preset="h2">
        План интенсива
      </Typography>
      <ul className={styles.root__schedule}>
        {SCHEDULE.map(({ time, description }, index) => (
          <li className={styles.root__day} key={time}>
            <div className={styles.root__date}>
              <div className={styles.root__order}>{index + 1}.</div>
              <Typography
                className={styles.root__time}
                tag="span"
                color="primary-medium"
              >
                {time}
              </Typography>
            </div>
            <div className={styles.root__description}>
              <Typography tag="h3" preset="h4">
                {description.heading}
              </Typography>
              {"\n"}
              <Typography preset="paragraph1">{description.content}</Typography>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
