import { IEntity } from './IEntity';
import {MentorTheme} from './MentorTheme';
import {MentorJob} from './MentorJob';
import {MentorPost} from './MentorPost';
import {MentorEducation} from './MentorEducation';
import {MentorProject} from './MentorProject';
import {MentorSolution} from './MentorSolution';

export interface IMentor extends IEntity {
  readonly avatar: string;
  readonly city: string;
  readonly companyName: string;
  readonly compnyWebsite: string;
  readonly country: string;
  readonly description: string;
  readonly discountForFiveSessions: boolean;
  readonly discountForTenSessions: boolean;
  readonly firstName: string;
  readonly hasCalendar: boolean;
  readonly id: number;
  readonly languages: string[];
  readonly lastName: string;
  readonly position: string;
  readonly reviewsCount: number;
  readonly sessionsCount: number;
  readonly studentsCount: number;
  readonly theme: MentorTheme;
  readonly timezone: string;
  readonly type: string;
  readonly userRating: {
    readonly feedbackCount: number;
    readonly total: number;
  };
  readonly username: string;
  readonly discounts: {
    readonly firstSessionRate: number;
    readonly fiveSessionRate: number;
    readonly tenSessionRate: number;
  };
  readonly education: MentorEducation[];
	readonly jobs: MentorJob[];
	readonly posts: MentorPost[];
  readonly projects: MentorProject[];
	readonly reviewBoard: boolean;
	readonly solutions: MentorSolution[];
  readonly videoPreviewUrl: string;
};
