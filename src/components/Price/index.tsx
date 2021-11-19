import clsx from "clsx";
import React from "react";
import { Typography } from "../../prebuilt/components/Typography";

export type MentorPreviewProps = {
  readonly price: number;
	readonly currency: string;
	readonly tag?: React.ElementType;
	readonly className?: string;
};

export const Price: React.FC<MentorPreviewProps> = ({
  price,
  currency,
  className,
  tag = "span"
}) => {
  const _price = currency === "usd" ? Math.round(price * 75) : Math.round(price);
  const printPrice = _price.toLocaleString("ru-RU", {
    currency: "RUB",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Typography
      tag={tag}
      className={clsx(className)}>  
      {printPrice}&nbsp;/&nbsp;час
    </Typography>
  );
};
