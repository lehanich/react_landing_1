import { IMentor } from './IMentor';

export interface IMentorFull extends IMentor {
  readonly discounts: any;
  readonly education: [];
	readonly jobs: [];
	readonly posts: [];
  readonly projects: [];
	readonly reviewBoard: boolean;
	readonly solutions: [];
}
