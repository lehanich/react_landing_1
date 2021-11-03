import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    RouteComponentProps
  } from "react-router-dom";
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

type MentorParams = { mentorId?: string };


export const MentorPage: React.FC<RouteComponentProps<MentorParams>> = (props) => {
  const { mentorId } = props.match.params; 
//   const dispatch = useAppDispatch();
//   const {
//     // mentorId
//   } = useAppSelector();

  useEffect(() => {
    console.log(mentorId)
  }, []);

  return (
    <Page title="Ментор">
      <Typography tag="h1" preset="h1">
        Ментор 
      </Typography>

    </Page>
  );
};
