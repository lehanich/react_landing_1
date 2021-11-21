import clsx from "clsx";
import React from "react";
import { PageBlock } from "../../../../prebuilt/components/PageBlock";
import { PriceBlock } from "../../../../components/PriceBlock";
import { MentorTheme } from "../../../../app/interfaces/MentorTheme";

export type MentorPriceBlockProps = {
  readonly className?: string;
  readonly theme: MentorTheme;
};

export const MentorPriceBlock: React.FC<MentorPriceBlockProps> = ({ className, theme }) => {

  return (
    <PageBlock
      className={clsx(className)}
      hasHeader
      headerString="Стоимость занятий"
      headerTag="h3">
      <PriceBlock theme={theme}/>
    </PageBlock>
  );
};
