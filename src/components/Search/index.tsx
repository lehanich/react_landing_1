import React , { useEffect, useCallback, useState, useRef, KeyboardEvent } from "react";
import clsx from "clsx";
import { useInput } from "../../hooks/useInput.js";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getMentors } from "../../app/features/mentor/thunks/getMentors";
import { TagsList } from "../TagsList";
import { debounce } from "lodash";
import { ITag } from "../../app/interfaces/ITag";
import styles from "./search.module.scss";

export type SearchProps = {
  readonly tags?: ITag[];
	readonly className?: string;
	readonly pagination?: { page: number, limit: number };
};

export const Search: React.FC<SearchProps> = ({
	className,
	pagination
}) => {
	const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useInput(''); // результат заполнения поисковой строки
	const [searchArr, setSearchArr] = useState<number[]>([]); // массив с id тегов для фильтра
	const [tagsOut,setTagsOut] = useState<ITag[]>([]); // список тегов в результатах поиска
	const [tagsOutSearchLine,setTagsOutSearchLine] = useState<ITag[]>([]); // список телгов в строке поиска (после клика)
	const wrapperRef = useRef<HTMLHeadingElement>(null); // ref выподающего списка тегов

	// const [getPagination, setPagination] = useState<any>({...pagination});
	const {
    tag: { tags },
		tag,
  } = useAppSelector();

	useEffect(() => {
    dispatch(getMentors({
			filters: {tagIds: [...searchArr]},
			pagination: { ...pagination }
		}));
  }, [dispatch,pagination]);

	const findString = (str1:string, str2:string) => {
		// let find: boolean = false
		str1 = str1.toLowerCase()
		str2 = str2.toLowerCase()
		return str1.includes(str2)
	}

	useEffect(() => {
    console.log(tags)
		setTagsOut(tags.entities);
  }, [tag, tags]);

	const compareTags = (tags:ITag[],val:string) => {
		console.log(tags)
		setTagsOut([])
		// let buf : ITag[] = [];
		if (tags.length > 0) {
			tags.forEach((item:ITag) => {
				let checkName:string = "";
				// if (item.name===undefined) {
				// 	if (item.nameRu===undefined) {
				// 		checkName = ""
				// 	} else {
				// 		checkName = item.nameRu
				// 	}
				// } else {
					checkName = item.nameRu===undefined ? "" : item.nameRu
				// }
				if (findString(checkName,val) === true) {
					// buf.push(item);
					setTagsOut(tagsOut  => [...tagsOut, item]); // не сработало
				}
			})
		}
		// setTagsOut(buf)
	}
  const handler = useCallback(debounce(compareTags, 500), []);

	const onInputClick = () => {
		if (wrapperRef.current) {
			const wrapper:HTMLHeadingElement = wrapperRef.current;
			wrapper.classList.toggle(styles.root__result_is_open)
		}
	}

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const val = event.target.value
		setSearchString(event)
    handler(tags.entities,val);
 	};

	const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
			event.preventDefault();
			dispatch(getMentors({
				filters: {tagIds: [...searchArr]},
				pagination: { ...pagination }
			}));       
	};

	const onAddFilterTag = (id:number) => {
		setSearchArr(searchArr => [...searchArr, id]);
		// console.log(searchArr)

		const item = tags.entities.find(item => item.id === id)
		if (item !== undefined) {
			setTagsOutSearchLine(tagsOutSearchLine => [...tagsOutSearchLine, item]);
		}
		// console.log(tagsOutSearchLine)
		if (wrapperRef.current) {
			const wrapper:HTMLHeadingElement = wrapperRef.current;
			wrapper.classList.remove(styles.root__result_is_open)
		}
	}

	const onDeleteFilterTag = (id:ITag) => {
		const buf: number[] = [...searchArr];
		let index = buf.indexOf(id.id);

		if (index > -1) {
			buf.splice(index, 1);
		}
		setSearchArr(buf);

		const item = tagsOutSearchLine.find(item => item.id === id.id)
		const buf2: ITag[] = [...tagsOutSearchLine]
		if (item !== undefined) {
			index = buf2.indexOf(item);
		}
		if (index > -1) {
			buf2.splice(index, 1);
		}
		setTagsOutSearchLine(buf2)
	}

	const handleKeyUp = (event:KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode === 13) { // Enter
			console.log("enter")
		}
	};

  return <div className={clsx(styles.root, styles.root__search, className)}>
		<form action="#" className={clsx(styles.root__result_wrap,)}>
			<div className={styles.root__searchLine}>
				{tagsOutSearchLine.map((item: ITag) => (
					<div
						key={item.id}
						onClick={() => onDeleteFilterTag(item)}
						className={clsx(styles.root__tagsButton)}
					>
						{/* {item.name !==undefined && item.name} */}
						{item.nameRu !==undefined && item.nameRu}
					</div>
				))}
				<input
					id="searchInput"
					autoFocus
					name="poisk"
					placeholder="Поиск"
					className={styles.root__input}
					value={searchString}
					onClick={onInputClick}
					onChange={onChange}
					onKeyUp={ (event) => handleKeyUp(event) }
				/>{/* name search переделал на poisk, чтоб браузер не предлагал свои варианты */}
			</div>
			<input type="button" className={styles.root__button} onClick={onSubmit} value="Поиск"/>
			<div ref={wrapperRef} className={clsx(styles.root__result,)}>
				{/* <TagsList tags={tagsOut} className="search__result-list" mode="search" /> надо получать эвент из дочернего компонента */}
				{tagsOut.map((item:ITag) => (
					<div
						key={item.id}
						onClick={() => onAddFilterTag(item.id)}
						className={clsx(styles.root__searchItem)}
					>
						{/* {item.name !==undefined && item.name} */}
						{item.nameRu !==undefined && item.nameRu}
					</div>
				))}
			</div>
		</form>
	</div>
}