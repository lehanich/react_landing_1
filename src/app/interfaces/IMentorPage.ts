import { IEntity } from './IEntity';
import { IMentor } from './IMentor';

export interface IMentorPage extends IEntity {
  readonly user: IMentor;
}
