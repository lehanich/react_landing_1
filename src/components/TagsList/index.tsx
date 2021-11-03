import React from "react";

export type TagsProps = {
  readonly tags: [],
};

export const TagsList: React.FC<TagsProps> = ({
  tags
}) => {
  return <div>
    {/* id: 44
				isCategory: 0
				name: "Python"
				url: "python" */}
    {tags.map((item: any) => (
            <div key={item.id} >{item.name}</div>
        ))}
  </div>
}