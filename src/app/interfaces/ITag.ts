import { IEntity } from './IEntity';

export interface ITag extends IEntity {
  readonly nameRu?: string;
  readonly nameEn?: string;
  readonly name?: string;
  readonly url?: string;
  readonly isCategory?: number;
  readonly parentId?: number;
}
