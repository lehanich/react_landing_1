import { IEntity } from './IEntity';
import { IMentor } from './IMentor';

export interface IMentors extends IEntity {
  readonly mentors: IMentor[];
  readonly totalMentorsCount: number;
}
