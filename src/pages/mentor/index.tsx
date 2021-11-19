import clsx from "clsx";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "../../prebuilt/components/Link";
import { PageBlock } from "../../prebuilt/components/PageBlock";
import { getMentorById } from "../../app/features/mentor/thunks/getMentorById";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { WithSkeleton } from "../../components/WithSkeleton";
import { Page } from "../../prebuilt/components/Page";
import { MentorBasicInfo } from "../../components/MentorBasicInfo";
import { PriceBlock } from "../../components/PriceBlock";
import { Avatar } from "../../components/Avatar";
import { IMentor } from "../../app/interfaces/IMentor";
import { Solutions } from "./partials/Solutions";
import { Job } from "./partials/Job";
import { Education } from "./partials/Education";
import styles from "./mentorPage.module.scss";

export type MentorPageProps = RouteComponentProps<{
  mentorId?: string
}>;

export const MentorPage: React.FC<MentorPageProps> = (props) => {
  const { mentorId } = props.match.params; 
  const dispatch = useAppDispatch();
  const { mentors: mentor } = useAppSelector();

  useEffect(() => {
    if (Number(mentorId)) {
      dispatch(getMentorById(Number(mentorId)));
    }
  }, [dispatch, mentorId]);

  return (
    <Page title="Ментор">
      <div className={styles.root__pageBlock}>
        <Link href="/mentors">К списку менторов</Link>
      </div>
      <div className={styles.root__wrap}>
        <WithSkeleton
          isLoading={mentor.mentor.isLoading}
          isEmpty={mentor.mentor.entity === null}
          error={mentor.mentor.error}
        >
          {mentor.mentor.entity &&
          <>
            <div className={styles.root__sidebar}>
              <PageBlock className={styles.root__pageBlock}>
                <Avatar
                  avatar={mentor.mentor.entity.avatar}
                  className={styles.root__avatar}
                  size="lg"/>
              </PageBlock>

              <PageBlock
                className={styles.root__pageBlock}
                hasHeader
                headerString="Стоимость занятий"
                headerTag="h3">
                <PriceBlock theme={mentor.mentor.entity.theme}/>
              </PageBlock>
            </div>

            <div className={clsx(styles.root__content)}>
              <PageBlock className={styles.root__pageBlock}>
                <Avatar
                  avatar={mentor.mentor.entity.avatar}
                  className={styles.root__avatar_mobile}
                  size="lg"/>
                <MentorBasicInfo
                  mentor={mentor.mentor.entity as IMentor}
                  hasDisplayName
                  mode="full" />
              </PageBlock>

              <PageBlock
                className={clsx(styles.root__pageBlock, styles.root__price_mobile)}
                hasHeader
                headerString="Стоимость занятий"
                headerTag="h3">
                <PriceBlock theme={mentor.mentor.entity.theme}/>
              </PageBlock>

              <PageBlock
                className={styles.root__pageBlock}
                hasHeader
                headerString="С чем могу помочь"
                headerTag="h3">
                <Solutions solutions={mentor.mentor.entity.solutions}/>
              </PageBlock>
            
              <PageBlock
                className={styles.root__pageBlock}
                hasHeader
                headerString="Резюме"
                headerTag="h3">
                <Job jobs={mentor.mentor.entity.jobs}/>
              </PageBlock>
   
              <PageBlock
                className={styles.root__pageBlock}
                hasHeader
                headerString="Образование"
                headerTag="h3">
                <Education education={mentor.mentor.entity.education}/>
              </PageBlock>
            </div>
          </>
          }
        </WithSkeleton>
      </div>
    </Page>
  );
};
