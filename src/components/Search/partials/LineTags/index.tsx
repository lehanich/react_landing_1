import clsx from "clsx";
import React, {useEffect} from "react";
import { ITag } from  "../../../../app/interfaces/ITag";
import styles from "./lineTags.module.scss";

export type LineTagsProps = {
  readonly tags: ITag[];
  readonly onItemClick?: (tagId:ITag) => void;
};

export const LineTags: React.FC<LineTagsProps> = ({
  tags,
  onItemClick
}) => {
  useEffect(() => {}, [tags]);

  return (
    <>
      {onItemClick && tags.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item)}
          className={clsx(styles.root__tag)}
        >
          {item.nameRu !==undefined && item.nameRu}
        </div>
      ))}
    </>
  );
};
