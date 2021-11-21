import clsx from "clsx";
import React, { useEffect, useState, useCallback } from "react";
import { changePage} from "../../app/features/mentor";
import { getMentors } from "../../app/features/mentor/thunks/getMentors";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { WithSkeleton } from "../../components/WithSkeleton";
import { Page } from "../../prebuilt/components/Page";
import { Typography } from "../../prebuilt/components/Typography";
import { Listing } from "../../prebuilt/components/Listing";
import { MentorPreview } from "../../components/MentorPreview";
import { Search } from "../../components/Search";
import { PageBlock } from "../../prebuilt/components/PageBlock";
import { Pagination } from "../../components/Pagination";
import { getAvailableMentorsString } from "./helpers";
import styles from "./mentors.module.scss";

export const MentorsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    mentors: { listing }
  } = useAppSelector();
  const [searchArray, setSearchArr] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getMentors({ filters: {tagIds: [...searchArray]}, pagination: { ...listing.paginations }}));
  }, [listing.paginations]);

  const handlePageChange = useCallback((currentPage: number) => {
    dispatch(changePage(currentPage));
  }, [dispatch, listing.paginations.page, listing.mentors.count]);

  const handleAddSearchTag = useCallback((tagId: number) => {
    const findItem = searchArray.indexOf(tagId);

    if (findItem < 0) {
      setSearchArr(searchArray => [...searchArray, tagId]);
    }
  }, [searchArray,setSearchArr]);

  const handleDelSearchTag = useCallback((tagId: number) => {
    let findItem = searchArray.indexOf(tagId);

    if (findItem > -1) {
      const copy = [...searchArray];

      copy.splice(findItem, 1);
      setSearchArr(copy);
    }
  }, [searchArray,setSearchArr]);

  const handleSearch = useCallback(() => {
    dispatch(getMentors({ filters: {tagIds: [...searchArray]}, pagination: { ...listing.paginations }}));
  }, [searchArray, listing]);

  return (
    <Page title="Менторы - Solvery.io">
      <Typography
        tag="h1"
        preset="h1"
        className={styles.root__pageBlock}>
        Поиск менторов Solvery.io!
      </Typography>
      <PageBlock className={styles.root__pageBlock}>
        <Search
          selectedTags={searchArray}
          onAddSearchTag={(tagId)=>{handleAddSearchTag(tagId);}}
          onDelSearchTag={(tagId)=>{handleDelSearchTag(tagId);}}
          onSearch={()=>{handleSearch();}}/>
      </PageBlock>
      <WithSkeleton
        isLoading={listing.mentors.isLoading}
        isEmpty={listing.mentors.entities === null || listing.mentors.entities.length === 0 }
        error={listing.mentors.error}>
        <Typography
          tag="p"
          className={styles.root__pageBlock}>Доступно {getAvailableMentorsString(listing.mentors.count)}
        </Typography>
        <Listing className={styles.root__pageBlock}>
          {listing.mentors.entities !== null && listing.mentors.entities.map((mentor) => (
            <MentorPreview
              key={mentor.id}
              mentor={mentor}/>
          ))}
        </Listing>
        <Pagination
          className={clsx(styles.root__pageBlock)}
          page={listing.paginations.page}
          limit={listing.paginations.limit}
          totalItemsCount={listing.mentors.count}
          onPageChange={(page) => {handlePageChange(page);}}/>
      </WithSkeleton>
      
    </Page>
  );
};
