import { MentorServices } from './MentorServices';
import { MentorTag } from './MentorTag';

export type MentorTheme = {
  readonly currency: string;
  readonly id: number;
  readonly mentorServices: MentorServices;
  readonly price: number;
  readonly tags: MentorTag[];
};
  