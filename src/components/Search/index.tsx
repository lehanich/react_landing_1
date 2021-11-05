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
};

export const Search: React.FC<SearchProps> = ({
	className
}) => {
	const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useInput('');
	const {
    tag: { tags },
		tag,
  } = useAppSelector();

	// let tagsOut: [] | ITag[] = []
	const [tagsOut,setTagsOut] = useState([])
	const wrapperRef:any = useRef<HTMLHeadingElement>(null);

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
		let tagsOut1 : [] = [];
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

				(tagsOut1 as Array<ITag>).push(item);
				// setTagsOut(tagsOut1);
			}
		})
	}
		setTagsOut(tagsOut1)
		const wrapper:any = wrapperRef.current;
		console.log(wrapper)
		console.log(wrapperRef)
    wrapper.classList.toggle(styles.root__result_is_open)
		console.log(tagsOut1);
		console.log(tags);
		console.log("search");
	}
  const handler = useCallback(debounce(someFunction, 500), []);

	const onChange = (event: any) => {
		const val = event.target.value
		// setState(event.currentTarget.value)
    // perform any event related action here
		setSearchString(event)
    handler(tags,val);
 	};
	// 	useEffect(() => {
	// 		console.log("Page updated");
	// 		if(events !== undefined) {
	// 				console.dir(index);
	// 				console.dir(events[index]);
	// 				setRoom(events[index].eventName);
	// 				// // // }
	// 				setDescription(events[index].description);
	// 				setDuration(events[index].duration);
	// 				setAuthor(events[index].author);
	// 		}
	// 		// webRTCHandler.getLocalStream();
	// 		//textarea.current.focus()  // ref={textarea} в <textarea>
	// }, [events]);
	const onSubmit = (event:any) => {
			event.preventDefault();
			console.log(event.currentTarget.dataset.mode);
			console.log(searchString)
			dispatch(getMentors());
			// let message = {}
			// if (event.currentTarget.dataset.mode === "register") {
			//     message = {
			//         event: "joinRoom",
			//         roomURL: roomURL,
			//         roomName: roomName,
			//     };
			// } else {
			//     message = {
			//         event: "presenter",
			//         roomURL: roomURL,
			//         roomName: roomName,
			//       };
			// }
			// console.log("1", message)
			// //if(content)
			// onSendMessage(message)

			//const index = events.findIndex(e => e.uid === actions.payload.uid)
			// setEventUpdate({
			// 		uid: idWebinar,
			// 		eventName: roomName,
			// 		description: roomDescription,
			// 		duration: Number(roomDuration),
			// 		start: selectedDate,
			// 		author: Number(author)
			// });
			// event.uid         
	};
	const handleKeyUp = (event:any) => {
			if (event.keyCode === 13) { // Enter
					// onSendMessage({roomURL, roomName});
			}
	};

  return <div className={clsx(styles.root, styles.root__search, className)}>
		<form action="#">
			<input
				id="searchInput"
				autoFocus
				name="search"
				placeholder="Поиск"
				className={styles.root__input}
				value={searchString}
				onChange={onChange}
				onKeyUp={ (event) => handleKeyUp(event) }
			/>
			<input type="button" onClick={onSubmit} value="Поиск"/>
		</form>
		<div className={clsx(styles.root__result_wrap,)}>
			<div ref={wrapperRef} className={clsx(styles.root__result,)}>
				<TagsList tags={tagsOut} className="search__result-list" mode="search" />
			</div>
		</div>
	</div>
}