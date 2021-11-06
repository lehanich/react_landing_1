import React , { useEffect, useCallback, useState, useRef } from "react";
import clsx from "clsx";
import { useInput } from "../../hooks/useInput.js";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getMentors } from "../../app/features/mentor/thunks/getMentors";
import { TagsList } from "../TagsList";
import { debounce } from "lodash";
import { ITag } from "../../app/interfaces/ITag";
import styles from "./search.module.scss";

export type SearchProps = {
  readonly tags?: [] | ITag[];
	readonly className?: string;
	readonly pagination?: any | { page: 1, limit: 10 };
};

export const Search: React.FC<SearchProps> = ({
	className,
	pagination
}) => {
	const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useInput('');
	const [searchArr, setSearchArr] = useState<any[]>([]);
	const [tagsOut,setTagsOut] = useState([])
	const [tagsOutSearchLine,setTagsOutSearchLine] = useState<any[]>([])
	const wrapperRef:any = useRef<HTMLHeadingElement>(null);

	// const [getPagination, setPagination] = useState<any>({...pagination});
	const {
    tag: { tags },
		tag,
  } = useAppSelector();

	useEffect(() => {
    // dispatch(getAllTags());
    dispatch(getMentors({
			filters: {tagIds: [...searchArr]},
			pagination: { ...pagination }
		}));
    // dispatch(getTagById(1));
  }, [dispatch,pagination]);

	const findString = (str1:string, str2:string) => {
		// let find: boolean = false
		str1 = str1.toLowerCase()
		str2 = str2.toLowerCase()
		return str1.includes(str2)
	}

	useEffect(() => {
    console.log(tags)
  }, [tag, tags]);

	const someFunction = (tags:any,val:any) => {
		console.log(tags)
		setTagsOut([])
		let buf : [] = [];
		console.log(val);
		console.log(tags);
		if (tags.entities.length > 0) {
			(tags.entities as Array<ITag>).forEach((item, index) => {
				let checkName:string = "";
				if (item.name===undefined) {
					if (item.nameRu===undefined) {
						checkName = ""
					} else {
						checkName = item.nameRu
					}
				} else {
					checkName = item.name
				}
				if (findString(checkName,val) === true) {
					(buf as Array<ITag>).push(item);
					// setTagsOut(tagsOut  => [...tagsOut, item]);
					// setTagsOut(tagsOut1);
				}
			})
		}
		setTagsOut(buf)
		
		console.log(tagsOut);
		console.log(tags);
		console.log("search");
	}
  const handler = useCallback(debounce(someFunction, 500), []);

	const onInputClick = () => {
		const wrapper:any = wrapperRef.current;
		console.log(wrapper)
		console.log(wrapperRef)
    wrapper.classList.toggle(styles.root__result_is_open)
	}

	const onChange = (event: any) => {
		const val = event.target.value
		// setState(event.currentTarget.value)
    // perform any event related action here
		setSearchString(event)
    handler(tags,val);
 	};

	const onSubmit = (event:any) => {
			event.preventDefault();
			console.log(event.currentTarget.dataset.mode);
			console.log(searchString)
			dispatch(getMentors({
				filters: {tagIds: [...searchArr]},
				pagination: { ...pagination }
			}));       
	};

	const onAddFilterTag = (id:any|number) => {
		// (setSearchArr as Array<number>).push(item.id)
		// const [searchArr, setSearchArr] = useInput([]);
		// let buf: [] | any[]= searchArr;
		// buf.push(id);
		// setSearchArr(buf);
		// console.log(searchArr)

		setSearchArr(searchArr => [...searchArr, id]);
		console.log(searchArr)

		const item = tags.entities.find(item => item.id === id)
		setTagsOutSearchLine(tagsOutSearchLine => [...tagsOutSearchLine, item]);
		console.log(tagsOutSearchLine)

		const wrapper:any = wrapperRef.current;
    wrapper.classList.remove(styles.root__result_is_open)
	}

	const onDeleteFilterTag = (id:any|number) => {
		let buf: [] | any[]= searchArr;
		let index = buf.indexOf(id.id);
		console.log(id, index)
		if (index > -1) {
			buf.splice(index, 1);
		}
		setSearchArr(buf);
		console.log(searchArr)

		const item = tagsOutSearchLine.find(item => item.id === id.id)
		buf = [...tagsOutSearchLine]
		index = buf.indexOf(item);
		if (index > -1) {
			buf.splice(index, 1);
		}
		setTagsOutSearchLine(buf)
	}

	const handleKeyUp = (event:any) => {
		if (event.keyCode === 13) { // Enter
			// onSendMessage({roomURL, roomName});
		}
	};

  return <div className={clsx(styles.root, styles.root__search, className)}>

		{tagsOutSearchLine.map((item: any) => (
			<div
				key={item.id}
				onClick={() => onDeleteFilterTag(item)}
				className={clsx(styles.root__tagsButton)}
			>
				{item.name !==undefined && item.name}
				{item.nameRu !==undefined && item.nameRu}
			</div>
		))}

		<form action="#" className={clsx(styles.root__result_wrap,)}>
			<input
				id="searchInput"
				autoFocus
				name="search"
				placeholder="Поиск"
				className={styles.root__input}
				value={searchString}
				onClick={onInputClick}
				onChange={onChange}
				onKeyUp={ (event) => handleKeyUp(event) }
			/>
			<input type="button" className={styles.root__button} onClick={onSubmit} value="Поиск"/>
			<div ref={wrapperRef} className={clsx(styles.root__result,)}>
				{/* <TagsList tags={tagsOut} className="search__result-list" mode="search" /> */}
				{(tagsOut as Array<ITag>).map((item: any) => (
					<div
						key={item.id}
						onClick={() => onAddFilterTag(item.id)}
						className={clsx(styles.root__searchItem)}
					>
						{item.name !==undefined && item.name}{item.nameRu !==undefined && item.nameRu}
					</div>
				))}
			</div>
		</form>
		{/* <div className={clsx(styles.root__result_wrap,)}>
			<div ref={wrapperRef} className={clsx(styles.root__result,)}>
				<TagsList tags={tagsOut} className="search__result-list" mode="search" />
				{(tagsOut as Array<ITag>).map((item: any) => (
					<div
						key={item.id}
						onClick={() => onAddFilterTag(item.id)}
						className={clsx(styles.root__searchItem)}
					>
						{item.name !==undefined && item.name}{item.nameRu !==undefined && item.nameRu}
					</div>
				))}
			</div>
		</div> */}
	</div>
}