import clsx from "clsx";
import React from "react";
import { IMentorCard } from "../../../../app/interfaces/IMentorCard";
import { Typography } from "../../../../prebuilt/components/Typography";
import { TagsList } from "../../../TagsList";

export type CardTagsListProps = {
  readonly mentor: Pick<IMentorCard, "theme">;
  readonly className?: string;
};

export const CardTagsList: React.FC<CardTagsListProps> = ({
  mentor,
  className,
}) => {

  return (
    <Typography
      tag="div"
      className={clsx(className)}>
      <TagsList
        mentorTags={mentor.theme.tags}
        mode="profile"/>
    </Typography>
  );
};
