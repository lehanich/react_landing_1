import { IEntity } from './IEntity';
import { IMentorFull } from './IMentorFull';

export interface IMentorPage extends IEntity {
  readonly user: IMentorFull;
}
