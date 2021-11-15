import React , { useEffect, useCallback, useState, useRef, KeyboardEvent } from "react";
import clsx from "clsx";
import { getAllTags } from "../../app/features/tag/thunks/getAllTags";
import { useInput } from "../../hooks/useInput.js";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import debounce from "lodash/debounce";
import { ITag } from "../../app/interfaces/ITag";
import { compareStrings } from "../../hooks/stringFunctions"
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
			compareStrings(tag.nameRu || "",val))
		setTagsOut(filterTags)
	}, [tags]);

  const handleInput = useCallback(debounce(compareTags, 500), []);

	const handleInputClick = useCallback(() => {
		if (wrapperRef.current) {
			const wrapper = wrapperRef.current;
			wrapper.classList.toggle(styles.root__result_is_open)
		}
	}, [wrapperRef]);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		const val = event.target.value
		setSearchString(event)
    handleInput(tags.entities,val);
 	}, [selectedTags,tags]);

	const handleSubmit = useCallback((event: React.FormEvent<HTMLInputElement>) => {
			event.preventDefault();
			onSearch();     
	}, [selectedTags, onSearch]);

	
	const handleAddFilterTag = useCallback((id:number) => {
		const tag = tags.entities.find(item => item.id === id)

		if (tag !== undefined) {
			const findItem = tagsOutSearchLine.indexOf(tag);

			if (findItem < 0) {
				setTagsOutSearchLine(tagsOutSearchLine => [...tagsOutSearchLine, tag]);
			}
		}

		if (wrapperRef.current) {
			const wrapper = wrapperRef.current;

			wrapper.classList.remove(styles.root__result_is_open)
		}

		onAddSearchTag(id);
	}, [tags,tagsOutSearchLine]);

	const handleDeleteFilterTag = useCallback((tag:ITag) => {
		const item = tagsOutSearchLine.find(item => item.id === tag.id)

		if (item !== undefined) {
			const copy: ITag[] = [...tagsOutSearchLine]
			const findIndex = copy.indexOf(item);

			if (findIndex > -1) {
				copy.splice(findIndex, 1);
			}
			setTagsOutSearchLine(copy)
		}

		onDelSearchTag(tag.id);
	}, [tagsOutSearchLine]);

	const handleKeyUp = useCallback((event:KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode === 13) { // Enter
			console.log("enter")
		}
	}, []);

  return <div className={clsx(styles.root, styles.root__search, className)}>
		<form action="#" className={clsx(styles.root__result_wrap,)}>
			<div className={styles.root__searchLine}>
				{tagsOutSearchLine.map((item: ITag) => (
					<div
						key={item.id}
						onClick={() => handleDeleteFilterTag(item)}
						className={clsx(styles.root__tagsButton)}
					>
						{item.nameRu !==undefined && item.nameRu}
					</div>
				))}
				<input
					id="searchInput"
					autoFocus
					name="search"
					placeholder="Поиск"
					className={styles.root__input}
					value={searchString}
					onClick={handleInputClick}
					onChange={handleChange}
					onKeyUp={ (event) => handleKeyUp(event) }
				/>
			</div>
			<input
				type="button"
				className={styles.root__button}
				onClick={handleSubmit}
				value="Поиск"
			/>
			<div ref={wrapperRef} className={clsx(styles.root__result,)}>
				{/* <TagsList tags={tagsOut} className="search__result-list" mode="search" /> надо получать эвент из дочернего компонента */}
				{tagsOut.map((item:ITag) => (
					<div
						key={item.id}
						onClick={() => handleAddFilterTag(item.id)}
						className={clsx(styles.root__searchItem)}
					>
						{item.nameRu !==undefined && item.nameRu}
					</div>
				))}
			</div>
		</form>
	</div>
}