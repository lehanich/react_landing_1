import React, { useEffect } from "react";
import clsx from "clsx";
import { ITag } from "../../app/interfaces/ITag";
import { MentorTag } from "../../app/interfaces/MentorTag";
import { Link } from "../../prebuilt/components/Link";
import styles from "./tagsList.module.scss";

export type TagsProps = {
  readonly tags?: ITag[];
  readonly mentorTags?: MentorTag[];
  readonly className?: string;
  readonly mode:  "search" | "profile";
  readonly onItemClick?: (tagId:number) => void;
};

export const TagsList: React.FC<TagsProps> = ({
  tags,
  mentorTags,
  className,
  mode,
  onItemClick
}) => {

  useEffect(() => {
  }, [tags, mentorTags]);

  return <>
    {mode === "search" &&
      <div className={clsx(styles.root, styles[className === undefined ? "" : className])}>
        {mode === "search" && tags && onItemClick && tags.map((item) => (
          <div
            key={item.id}
            className={clsx(styles.root__searchItem)}
            onClick={() => onItemClick(item.id)}
          >{item.nameRu !==undefined && item.nameRu}</div>
        ))}
      </div>}
    {mode === "profile" &&
      <div className={clsx(styles.root, styles[className === undefined ? "" : className])}>
        {mode === "profile" && mentorTags && mentorTags.map((item) => (
          <Link
            key={item.id}
            href={"mentors/"+item.name}
            className={clsx(styles.root__profileItem)}
            theme="profile-tag"
          >
            {item.name !==undefined && item.name}
          </Link>
        ))}
      </div>}
  </>;
};
