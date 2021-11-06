import { IEntity } from './IEntity';

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
  readonly languages: [];
  readonly lastName: string;
  readonly position: string;
  readonly reviewsCount: number;
  readonly sessionsCount: number;
  readonly studentsCount: number;
  readonly theme: any;
  readonly timezone: string;
  readonly type: string;
  readonly userRating: any;
  readonly username: string;
}
