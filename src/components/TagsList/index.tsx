import React, {useState, useEffect} from "react";
import clsx from "clsx";
import { ITag } from "../../app/interfaces/ITag";
// import { Link } from "react-router-dom";
import { Link } from "../../prebuilt/components/Link";
import styles from "./tagsList.module.scss";

export type TagsProps = {
  readonly tags: [] | ITag[];
  readonly className?: string;
  readonly mode:  string | "search" | "profile";
};

export const TagsList: React.FC<TagsProps> = ({
  tags,
  className,
  mode
}) => {

  useEffect(() => {
    console.log(tags)
  }, [tags]);

  return <>
      {mode === "search" && <div className={clsx(styles.root, styles[className === undefined ? "" : className])}>
        {mode === "search" && (tags as Array<ITag>).map((item: any) => (
          <div key={item.id} className={clsx(styles.root__searchItem)} >{item.name !==undefined && item.name}{item.nameRu !==undefined && item.nameRu}</div>
        ))}
      </div>}
      {mode === "profile" && <div className={clsx(styles.root, styles[className === undefined ? "" : className])}>
        {mode === "profile" && (tags as Array<ITag>).map((item: any) => (
          <Link key={item.id}
            href={"mentors/"+item.name}
            className={clsx(styles.root__profileItem)}
            theme="profile-tag"
          >
            {item.name !==undefined && item.name}{item.nameRu !==undefined && item.nameRu}
          </Link>
        ))}
      </div>}
    </>
}