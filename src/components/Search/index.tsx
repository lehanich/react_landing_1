import React , { useEffect, useCallback, useState, useRef, KeyboardEvent, FormEvent, ChangeEventHandler } from "react";
import clsx from "clsx";
import { getAllTags } from "../../app/features/tag/thunks/getAllTags";
import { useInput } from "../../hooks/useInput";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import debounce from "lodash/debounce";
import { ITag } from "../../app/interfaces/ITag";
import { compareStrings } from "../../hooks/stringFunctions";
import { TagsList } from "../TagsList";
import { LineTags } from "./partials/LineTags";
import styles from "./search.module.scss";

export type SearchProps = {
	readonly className?: string;
	readonly selectedTags: number[];
	readonly onAddSearchTag: (tagId:number) => void;
	readonly onDelSearchTag: (tagId:number) => void;
	readonly onSearch: () => void;
};

export const Search: React.FC<SearchProps> = ({
  className,
  selectedTags,
  onAddSearchTag,
  onDelSearchTag,
  onSearch
}) => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useInput(''); // результат заполнения поисковой строки
  const [tagsOut,setTagsOut] = useState<ITag[]>([]); // список тегов в результатах поиска
  const [tagsOutSearchLine,setTagsOutSearchLine] = useState<ITag[]>([]); // список телгов в строке поиска (после клика)
  const wrapperRef = useRef<HTMLHeadingElement>(null); // ref выподающего списка тегов
  const {
    tag: { tags },
    tag,
  } = useAppSelector();

  useEffect(() => { dispatch(getAllTags()); }, []);
  useEffect(() => { setTagsOut(tags.entities); }, [tag, tags]);

  const compareTags = useCallback((tags:ITag[],val:string) => {
    const filterTags: ITag[] = tags.filter((tag: ITag) => 
      compareStrings(tag.nameRu || "",val));

    setTagsOut(filterTags);
  }, [tags]);

  const handleInput = useCallback(debounce(compareTags, 500), []);

  const changeVisibilityTagList = () => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current;
      wrapper.classList.toggle(styles.root__result_open);
    }
  };

  const handleInputClick = useCallback(() => {
    changeVisibilityTagList();
  }, [wrapperRef]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const val = event.target.value;

    setSearchString(event);
    handleInput(tags.entities,val);
  }, [selectedTags, tags]);

  const handleSubmit = useCallback((event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    onSearch();     
  }, [selectedTags, onSearch]);

  const handleKeyDown = useCallback((event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch();  
    }
  }, []);

  const handleAddFilterTag = useCallback((id:number) => {
    const tag = tags.entities.find(item => item.id === id);

    if (tag !== undefined) {
      const findItem = tagsOutSearchLine.indexOf(tag);

      if (findItem < 0) {
        setTagsOutSearchLine(tagsOutSearchLine => [...tagsOutSearchLine, tag]);
        onAddSearchTag(id);
      }
    }

    changeVisibilityTagList();
  }, [tags,tagsOutSearchLine]);

  const handleDeleteFilterTag = useCallback((tag:ITag) => {
    const item = tagsOutSearchLine.find(item => item.id === tag.id);

    if (item !== undefined) {
      const copy: ITag[] = [...tagsOutSearchLine];
      const findIndex = copy.indexOf(item);

      if (findIndex > -1) {
        copy.splice(findIndex, 1);
        setTagsOutSearchLine(copy);
        onDelSearchTag(tag.id);
      }
    }
  }, [tagsOutSearchLine]);

  return (
    <div className={clsx(styles.root, styles.root__search, className)}>
      <form
        action="#"
        className={clsx(styles.root__wrap,)}>
        <div className={styles.root__searchLine}>
          <LineTags
            tags={tagsOutSearchLine}
            onItemClick={(tagId) => handleDeleteFilterTag(tagId)}/>
          <input
            id="searchInput"
            autoFocus
            name="search"
            placeholder="Поиск"
            className={styles.root__input}
            value={searchString}
            onClick={handleInputClick}
            onChange={handleChange}
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </div>
        <input
          type="button"
          className={styles.root__button}
          onClick={handleSubmit}
          value="Поиск"
        />
        <div
          ref={wrapperRef}
          className={clsx(styles.root__result,)}>
          <TagsList
            tags={tagsOut}
            mode="search"
            onItemClick={(itemId) => handleAddFilterTag(itemId)}/>
        </div>
      </form>
    </div>
  );
};
