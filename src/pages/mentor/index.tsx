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
    mentors
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
  }, [mentors.mentorPage]);
  
  useBreakpoints((breakpoint) => {
    setBreakpoint(breakpoint);
    console.log(breakpoint);
  });

  return (
    <Page title="Ментор">
      <div className={styles.root__pageBlock}><Link href="/mentors">К списку менторов</Link></div>
      <div className={styles.root__wrap}>
        <WithSkeleton
          isLoading={mentors.isLoading}
          isEmpty={mentors.mentorPage === undefined}
          error={mentors.error}
        >
        {mentors.mentorPage !== undefined &&
          <>
            {breakpoint >= 768 && <div className={styles.root__sidebar}>

              <PageBlock className={styles.root__pageBlock}>
                <Avatar avatar={mentors.mentorPage.avatar} size="lg"/>
              </PageBlock>

              <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>Стоимость занятий</Typography>
                <PriceBlock type="full" theme={mentors.mentorPage.theme}/>
              </PageBlock>

            </div>}
            <div className={clsx(breakpoint >= 768 && styles.root__content, breakpoint < 768 && styles.root__content_mobile)}>

              <PageBlock className={styles.root__pageBlock}>
                {breakpoint < 768 && <Avatar avatar={mentors.mentorPage.avatar} className={styles.root__avatar_mobile} size="lg"/>}
                <MentorBasicInfo mentor={mentors.mentorPage as IMentor} displayName={true} mode="full" />
              </PageBlock>

              {breakpoint < 768 && <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>Стоимость занятий</Typography>
                <PriceBlock type="full" theme={mentors.mentorPage.theme}/>
              </PageBlock>}

              <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>С чем могу помочь</Typography>
                <ul className={styles.root__list}>
                  {mentors.mentorPage.solutions !== undefined && (mentors.mentorPage.solutions as Array<any>).map((item: any) => (
                    <li key={item.id} className={styles.root__listItem}>{item.description}</li>
                  ))}
                </ul>
              </PageBlock>
            
              <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>Резюме</Typography>
                <Job jobs={mentors.mentorPage.jobs}></Job>
              </PageBlock>

              <PageBlock className={styles.root__pageBlock}>
                <Typography tag="h3" className={styles.root__pageHeader}>Образование</Typography>
                <Education education={mentors.mentorPage.education}> </Education>
              </PageBlock>
            </div>
          </>
        }
        </WithSkeleton>
        
      </div>
      {/* <Typography tag="h1" preset="h1">
        Ментор 
        {mentors.mentorPage !== undefined && mentors.mentorPage.firstName}
      </Typography> */}

    </Page>
  );
};
