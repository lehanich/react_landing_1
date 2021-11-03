import React, { useEffect } from "react";
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

export const MentorsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    tag: { tags },
    mentors
  } = useAppSelector();

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getMentors());
    dispatch(getTagById(1));
  }, [dispatch]);

  return (
    <Page title="Менторы - Solvery.io">
      <Typography tag="h1" preset="h1">
        Знакомьтесь - менторы Solvery.io!
      </Typography>
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
          <p>Доступно {mentors.totalMentorsCount} настравников</p>
          <Listing>
            {mentors.entities.map((mentor) => (
              <MentorPreview key={mentor.id} mentor={mentor}></MentorPreview>
            ))}
          </Listing>
        </WithSkeleton>
      </div>
    </Page>
  );
};
