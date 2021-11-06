import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { increment, setValue } from "../../app/features/counter";
import { getAllTags } from "../../app/features/tag/thunks/getAllTags";
import { getMentors } from "../../app/features/mentor/thunks/getMentors";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { WithSkeleton } from "../../components/WithSkeleton";
import { Page } from "../../prebuilt/components/Page";
import { Typography } from "../../prebuilt/components/Typography";
import { Listing } from "../../prebuilt/components/Listing";
import { getTagById } from "../../app/features/tag/thunks/getTagById";
import { MentorPreview } from "../../components/MentorPreview";
import { Search } from "../../components/Search"
import { PageBlock } from "../../prebuilt/components/PageBlock";
import styles from "./mentors.module.scss"

export const MentorsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    tag: { tags },
    mentors
  } = useAppSelector();

  const [getPagination, setPagination] = useState<any>({page: 1, limit: 10});

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getTagById(1));
  }, [dispatch]);

  const onNextPage = () => {
    const buf = {...getPagination};
    buf.page++
    setPagination(buf)
    // console.log(getPagination)
  }

  const onPrevPage = () => {
    const buf = {...getPagination};
    if (buf.page > 1 ) {
      buf.page--
    }
    setPagination(buf)
    // console.log(getPagination)
  }

  return (
    <Page title="Менторы - Solvery.io">
      <Typography tag="h1" preset="h1" className={styles.root__pageBlock}>
        Поиск менторов Solvery.io!
      </Typography>
      <PageBlock className={styles.root__pageBlock}>
        <Search pagination={getPagination}/>
      </PageBlock>
      <div>
      {/* {tags.entities.map((tag) => <p key={tag.id}>{tag.nameRu}</p>)}
        { tags.isLoading && "loading..." }
        { !tags.isLoading && tags.entities.length > 0 &&
          tags.entities.map((tag) => <p key={tag.id}>{tag.nameRu}</p>)}

        { !tags.isLoading && !tags.error && tags.entities.length === 0 && <p>no data</p>}

        {tags.error && (
          <p>
            <strong>{tags.error}</strong>
          </p>
        )} */}
        <WithSkeleton
          isLoading={mentors.isLoading}
          isEmpty={mentors.entities.length === 0}
          error={mentors.error}
        >
          {/* <Listing>
          {tags.entities.map((tag) => (
            <p key={tag.id}>{tag.nameRu}</p>
          ))}
          </Listing> */}
          <Typography tag="p" className={styles.root__pageBlock}>Доступно {mentors.totalMentorsCount} настравников</Typography>
          <Listing className={styles.root__pageBlock}>
            {mentors.entities.map((mentor) => (
              <MentorPreview key={mentor.id} mentor={mentor}></MentorPreview>
            ))}
          </Listing>
          <div className={clsx(styles.root__pageBlock,styles.root__paginationLine)}>
            <button type="button" onClick={onPrevPage} className={styles.root__button}>назад</button>
            <span>{getPagination.page}</span>
            <button type="button" onClick={onNextPage} className={styles.root__button}>далее</button>
          </div>
        </WithSkeleton>
      </div>
    </Page>
  );
};
