import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    RouteComponentProps
  } from "react-router-dom";
import { Link } from "../../prebuilt/components/Link"
import { PageBlock } from "../../prebuilt/components/PageBlock"
import { getAllTags } from "../../app/features/tag/thunks/getAllTags";
import { getMentorById } from "../../app/features/mentor/thunks/getMentorById";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { WithSkeleton } from "../../components/WithSkeleton";
import { Page } from "../../prebuilt/components/Page";
import { Typography } from "../../prebuilt/components/Typography";
import { MentorBasicInfo } from "../../components/MentorBasicInfo";
import { PriceBlock } from "../../components/PriceBlock";
import { Avatar } from "../../components/Avatar"
import { IMentor } from "../../app/interfaces/IMentor";
import { Job } from "./partials/Job";
import { Education } from "./partials/Education";
import { useBreakpoints } from "../../hooks/useBreakpoints"
import styles from "./mentorPage.module.scss";

type MentorParams = { mentorId?: string };


export const MentorPage: React.FC<RouteComponentProps<MentorParams>> = (props) => {
  const { mentorId } = props.match.params; 
  const dispatch = useAppDispatch();
  const {
    mentors: mentor
  } = useAppSelector();

  const [breakpoint, setBreakpoint] = useState<number>(1024); 

  useEffect(() => {
    console.log(mentorId)
  }, []);

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getMentorById(Number(mentorId)));
  }, [dispatch]);

  useEffect(() => {
    // console.log(mentorPage)
  }, [mentor.mentor.entity]);
  
  useBreakpoints((breakpoint) => {
    setBreakpoint(breakpoint);
    console.log(breakpoint);
  });

  return (
    <Page title="Ментор">
      <div className={styles.root__pageBlock}><Link href="/mentors">К списку менторов</Link></div>
      <div className={styles.root__wrap}>
        <WithSkeleton
          isLoading={mentor.mentor.isLoading}
          isEmpty={mentor.mentor.entity === null}
          error={mentor.mentor.error}
        >
        {mentor.mentor.entity !== null &&
          <>
            {breakpoint >= 768 && <div className={styles.root__sidebar}>

              <PageBlock className={styles.root__pageBlock}>
                <Avatar avatar={mentor.mentor.entity.avatar} size="lg"/>
              </PageBlock>

              <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>Стоимость занятий</Typography>
                <PriceBlock type="full" theme={mentor.mentor.entity.theme}/>
              </PageBlock>

            </div>}
            <div className={clsx(breakpoint >= 768 && styles.root__content, breakpoint < 768 && styles.root__content_mobile)}>

              <PageBlock className={styles.root__pageBlock}>
                {breakpoint < 768 && <Avatar avatar={mentor.mentor.entity.avatar} className={styles.root__avatar_mobile} size="lg"/>}
                <MentorBasicInfo mentor={mentor.mentor.entity as IMentor} displayName={true} mode="full" />
              </PageBlock>

              {breakpoint < 768 && <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>Стоимость занятий</Typography>
                <PriceBlock type="full" theme={mentor.mentor.entity.theme}/>
              </PageBlock>}

              <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>С чем могу помочь</Typography>
                <ul className={styles.root__list}>
                  {mentor.mentor.entity.solutions !== undefined && mentor.mentor.entity.solutions.map((item: any) => (
                    <li key={item.id} className={styles.root__listItem}>{item.description}</li>
                  ))}
                </ul>
              </PageBlock>
            
              <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>Резюме</Typography>
                <Job jobs={mentor.mentor.entity.jobs}></Job>
              </PageBlock>

              <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>Образование</Typography>
                <Education education={mentor.mentor.entity.education}> </Education>
              </PageBlock>
            </div>
          </>
        }
        </WithSkeleton>
        
      </div>

    </Page>
  );
};
