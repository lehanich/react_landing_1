import { IMentor } from './IMentor';

export type IMentorCard = Pick<IMentor,
  'avatar' |
  'city' |
  'companyName' |
  'compnyWebsite' |
  'country' |
  'description' |
  'discountForFiveSessions' |
  'discountForTenSessions' |
  'firstName' |
  'hasCalendar' |
  'id' |
  'languages' |
  'lastName' |
  'position' |
  'reviewsCount' |
  'sessionsCount' |
  'studentsCount' |
  'theme' |
  'timezone' |
  'type' |
  'userRating' |
  'username'>
