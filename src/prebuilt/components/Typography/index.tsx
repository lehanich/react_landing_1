import clsx from "clsx";
import React from "react";
import { Color } from "../../../types/ui/Color";
import { Preset } from "../../../types/ui/Preset";

export type TypographyProps<T extends React.ElementType> = {
  readonly tag?: T;
  readonly preset?: Preset;
  readonly color?: Color;
  readonly extra?: React.ComponentProps<T>;
  readonly className?: string;
  readonly children?: React.ReactNode;
};

export const Typography = <T extends React.ElementType>({
  tag,
  preset,
  color,
  extra,
  className,
  children,
}: TypographyProps<T>) => {
  return React.createElement(
    tag || "p",
    {
      className: clsx(
        preset && `t-${preset}`,
        color && `c-${color}`,
        className
      ),
      ...extra,
    },
    children
  );
};
