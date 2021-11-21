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
import { MentorPriceBlock } from "./partials/MentorPriceBlock";
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
              
              <MentorPriceBlock
                className={styles.root__pageBlock}
                theme={mentor.mentor.entity.theme}/>
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

              <MentorPriceBlock
                className={styles.root__price_mobile}
                theme={mentor.mentor.entity.theme}/>

              <Solutions
                className={styles.root__pageBlock}
                solutions={mentor.mentor.entity.solutions}/>
            
              <Job
                className={styles.root__pageBlock}
                jobs={mentor.mentor.entity.jobs}/>

              <Education
                className={styles.root__pageBlock}
                education={mentor.mentor.entity.education}/>
            </div>
          </>
          }
        </WithSkeleton>
      </div>
    </Page>
  );
};
